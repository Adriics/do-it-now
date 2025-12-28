import cors from "cors"
import express, { Express } from "express"
import { registerRoutes } from "./routes"


export class Server {
    private app: Express = express()
    init(port: number) {
        this.registerMiddlewares()
        this.registerRoutes()

        this.app.listen(port, () => {
            console.log(`Listening port ${port}`)
        })

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