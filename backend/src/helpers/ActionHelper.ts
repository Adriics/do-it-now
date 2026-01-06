import { EntitySchema, Equal, LessThanOrEqual } from "typeorm";
import { Action, StatusType } from "../entities/Action";
import { actionModel } from "../model/ActionModel";
import { Helper } from "./Helper";



export class ActionHelper extends Helper<Action> {

    getEntitySchema(): EntitySchema<Action> {
        return actionModel
    }

    async create(action: Action): Promise<Action> {
        return (await this.getRepository()).save(action)
    }

    async getAll(): Promise<Action[]> {
        return (await this.getRepository()).find()
    }

    async getById(id: string): Promise<Action | null> {
        return (await this.getRepository()).findOneBy({ id })
    }

    async delete(id: string) {
        return (await this.getRepository()).delete(id)
    }

    async patchActionStatus(actionId: string) {
        return (await this.getRepository()).update(
            { id: actionId },
            { status: StatusType.Done }
        )
    }
}