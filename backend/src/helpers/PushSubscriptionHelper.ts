import { EntitySchema, Equal } from "typeorm";
import { PushSubscription } from "../entities/PushSubscription";
import { Helper } from "./Helper";
import { pushSubscriptionModel } from "../model/PushSubscriptionModel";


export class PushSubscriptionHelper extends Helper<PushSubscription> {

    getEntitySchema(): EntitySchema<PushSubscription> {
        return pushSubscriptionModel
    }

    async create(pushSubscription: PushSubscription): Promise<PushSubscription> {
        return (await this.getRepository()).save(pushSubscription)
    }


    async findByEndpoint(endpoint: string): Promise<PushSubscription | null> {
        return (await this.getRepository()).findOneBy({ endpoint })
    }

    async findAll(): Promise<PushSubscription[]> {
        return (await this.getRepository()).find()
    }
}