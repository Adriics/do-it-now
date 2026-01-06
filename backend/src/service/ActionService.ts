import { Action, ActionType } from "../entities/Action";
import { ActionNotFound } from "../errors/action/ActionNotFound";
import { ActionHelper } from "../helpers/ActionHelper";



export class ActionService {

    constructor(private readonly helper: ActionHelper) { }

    async create(id: string, type: ActionType, receptor: string, executeAt: Date, message?: string) {
        const action = Action.create(id, type, receptor, new Date(executeAt), message)

        await this.helper.create(action)
    }

    async getAll() {
        return this.helper.getAll()
    }

    async getById(id: string) {
        return this.helper.getById(id)
    }

    async deleteAction(id: string) {
        const action = await this.helper.getById(id)
        if (!action) throw new ActionNotFound("Action not found")
        return this.helper.delete(id)
    }


    async patchActionStatus(actionId: string) {
        const exists = await this.helper.getById(actionId)

        if (!exists) throw new ActionNotFound("Action not found")

        return this.helper.patchActionStatus(actionId)
    }

}