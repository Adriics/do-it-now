import { Action, ActionType } from "../entities/Action";
import { ActionHelper } from "../helpers/ActionHelper";



export class ActionService {

    constructor(private readonly helper: ActionHelper) { }

    async create(id: string, type: ActionType, receptor: string, executeAt: Date, message?: string) {
        const action = Action.create(id, type, receptor, executeAt, message)

        await this.helper.create(action)
    }

}