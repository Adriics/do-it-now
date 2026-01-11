import * as webpush from "web-push"

interface NotificationPayload {
    title: string,
    body: string,
    link: string
}
export class PushService {

    async preparePayloadNotification(subscription: webpush.PushSubscription, { title, body, link }: NotificationPayload) {

        const payload = JSON.stringify({
            title,
            body,
            link
        })

        await webpush.sendNotification(subscription, payload)
    }

}