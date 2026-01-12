import { EntitySchema } from "typeorm";
import { PushSubscription } from "../entities/PushSubscription";


export const pushSubscriptionModel = new EntitySchema<PushSubscription>({
    name: "PushSubscriptions",
    tableName: "pushSubscriptions",
    target: PushSubscription,
    columns: {
        id: {
            type: "uuid",
            primary: true,
            generated: "uuid"
        },
        endpoint: {
            type: "varchar",
            unique: true
        },
        auth: {
            type: "varchar"
        },
        p256dh: {
            type: "varchar"
        },
        createdAt: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP"
        }
    }
})