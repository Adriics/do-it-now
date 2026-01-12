import { PushSubscription } from "../entities/PushSubscription";
import { PushSubscriptionHelper } from "../helpers/PushSubscriptionHelper";


export class PushSubscriptionService {

    constructor(private readonly helper: PushSubscriptionHelper) { }

    async create(endpoint: string, p256dh: string, auth: string) {
        const pushSubscription = PushSubscription.create(endpoint, p256dh, auth)
        await this.helper.create(pushSubscription)
    }

    async findByEndpoint(endpoint: string): Promise<PushSubscription | null> {
        return this.helper.findByEndpoint(endpoint)
    }
}