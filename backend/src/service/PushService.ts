import * as webpush from "web-push"

interface NotificationPayload {
    title: string,
    body: string,
    link: string
}
export class PushService {

    constructor() {
        webpush.setVapidDetails("mailto:admin@doitnow.dev", process.env.VAPID_PUBLIC_KEY!,
            process.env.VAPID_PRIVATE_KEY!)
    }

    async send(subscription: webpush.PushSubscription, payload: NotificationPayload) {

        const data = JSON.stringify(payload)

        await webpush.sendNotification(subscription, data)
    }

}