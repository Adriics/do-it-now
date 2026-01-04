import { ActionRepository } from "../repository/ActionRepository";
import { ActionExecutor } from "../service/ActionExecutor";


export class ActionWorker {
    private readonly intervalMS = 30_000 // 30 segundos

    constructor(private readonly repo: ActionRepository, private readonly executor: ActionExecutor) { }
    start() {
        console.log("Action worker started")

        setInterval(async () => {
            try {
                console.log("⏱ tick worker");
                await this.checkPendingActions()
            } catch (error) {

                console.error("Worker error: ", error)

            }
        }, this.intervalMS);
    }

    private async checkPendingActions() {
        const now = new Date()

        const pendingActions =
            await this.repo.findPendingBefore(now)

        if (pendingActions.length === 0) return;

        const actionIds = pendingActions.map(action => action.id)

        await this.repo.markAsReady(actionIds)

        await Promise.all(pendingActions.map(action => this.executor.preparePayload(action)))

        console.log(`${actionIds.length} action(s) marked as READY`)

    }
}