import db from "./dataSourceConnection"
import cors from "cors"
import express, { Express } from "express"
import { registerRoutes } from "./routes"
import { ActionWorker } from "./worker/actionWorker"
import { ActionExecutor } from "./service/ActionExecutor"
import { PushService } from "./service/PushService"
import { PushSubscriptionHelper } from "./helpers/PushSubscriptionHelper"
import { TypeOrmActionRepository } from "./repository/TypeOrmActionRepository"

export class Server {
  private app: Express = express()

  async init(port: number) {
    this.registerMiddlewares()
    this.registerRoutes()

    await db

    const ds = await db

    console.log("Entidades registradas:", ds.entityMetadatas.map(e => e.name))


    this.app.listen(port, () => {
      console.log(`Listening port ${port}`)
    })

    const actionRepository = new TypeOrmActionRepository()
    const executor = new ActionExecutor()
    const pushService = new PushService()
    const subscriptionHelper = new PushSubscriptionHelper()
    const worker = new ActionWorker(
      actionRepository,
      executor,
      pushService,
      subscriptionHelper,
    )
    worker.start()
  }

  private registerRoutes() {
    this.app.use(registerRoutes())
  }

  private registerMiddlewares() {
    this.app.use(cors())
    this.app.use(express.json({ limit: "20mb" }))
    this.app.use(express.urlencoded({ extended: true, limit: "20mb" }))
  }
}
