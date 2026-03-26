import { PushSubscriptionHelper } from "../helpers/PushSubscriptionHelper"
import { ActionRepository } from "../repository/ActionRepository"
import { ActionExecutor } from "../service/ActionExecutor"
import { PushService } from "../service/PushService"

export class ActionWorker {
  private readonly intervalMS = 30_000 // 30 segundos

  constructor(
    private readonly actionRepo: ActionRepository,
    private readonly executor: ActionExecutor,
    private readonly pushService: PushService,
    private readonly subscriptionHelper: PushSubscriptionHelper,
  ) {}

  start() {
    console.log("Action worker started")

    setInterval(async () => {
      try {
        console.log("⏱ tick worker")
        await this.checkPendingActions()
      } catch (error) {
        console.error("Worker error: ", error)
      }
    }, this.intervalMS)
  }

  async checkPendingActions() {
    const now = new Date()

    const actions = await this.actionRepo.findPendingBefore(now)

    if (actions.length === 0) return

    const subscriptions = await this.subscriptionHelper.findAll()

    for (const action of actions) {
      const payload = this.executor.execute(action)

      await Promise.all(
        subscriptions.map((s) =>
          this.pushService.send(
            {
              endpoint: s.endpoint,
              keys: {
                p256dh: s.p256dh,
                auth: s.auth,
              },
            },
            payload,
          ),
        ),
      )
    }

    await this.actionRepo.markAsDone(actions.map((a) => a.id))
  }
}
