import { EntitySchema } from "typeorm";
import { Action } from "../entities/Action";
import { Helper } from "./helper";
import { actionModel } from "../model/ActionModel";



export class ActionHelper extends Helper<Action> {

    getEntitySchema(): EntitySchema<Action> {
        return actionModel
    }

}