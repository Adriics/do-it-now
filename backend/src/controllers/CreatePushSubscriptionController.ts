import { Request, Response } from "express";
import { PushSubscriptionService } from "../service/PushSubscriptionService";
import { v4 } from "uuid"


export class CreatePushSubscriptionController {

    constructor(readonly service: PushSubscriptionService) { }

    async run(req: Request, res: Response) {
        try {

            const { endpoint, keys } = req.body

            const p256dh = keys?.p256dh
            const auth = keys?.auth

            if (!endpoint || !p256dh || !auth) return res.status(400).json({ message: "Invalid subscription payload" })

            const existing = await this.service.findByEndpoint(endpoint)

            if (existing) {
                return res.status(200).json({ ok: true, alreadySubscribed: true })
            }
            await this.service.create(endpoint, p256dh, auth)

            return res.status(201).json({ ok: true })

        } catch (error) {

            console.error(error)
            return res.status(500).json({ message: "Internal server error" })

        }
    }
}