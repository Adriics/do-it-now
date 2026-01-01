import { EntitySchema } from "typeorm";
import { Action } from "../entities/Action";
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

}