import cors from "cors"
import express, { Express } from "express"
import { registerRoutes } from "./routes"
import { ActionWorker } from "./worker/actionWorker"
import { TypeOrmActionRepository } from "./repository/TypeOrmActionRepository"

export class Server {
    private app: Express = express()


    init(port: number) {
        this.registerMiddlewares()
        this.registerRoutes()

        this.app.listen(port, () => {
            console.log(`Listening port ${port}`)
        })

        const actionRepository = new TypeOrmActionRepository()
        const worker = new ActionWorker(actionRepository)
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