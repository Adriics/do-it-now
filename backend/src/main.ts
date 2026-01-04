import "dotenv/config"
import { Server } from "./server"

(async () => {
    await new Server().init(4000)
})()