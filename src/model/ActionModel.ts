import { EntitySchema } from "typeorm";
import { Action } from "../entities/Action";


export const actionModel = new EntitySchema<Action>({
    name: "Action",
    tableName: "actions",
    target: Action,
    columns: {
        id: {
            type: "uuid",
            primary: true,
            generated: "uuid"
        },
        type: {
            type: "varchar",
        },
        receptor: {
            type: "text"
        },
        message: {
            type: "text"
        },
        status: {
            type: "varchar"
        },
        executeAt: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP"
        }
    }
})