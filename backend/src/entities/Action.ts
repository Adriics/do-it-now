import { Entity } from "./Entity";

// Tipos posibles de acción
export enum ActionType {
    WhatsApp = "WhatsApp",
    Email = "Email",
    URL = "URL",
    Personal = "Personal"
}

// Estados de la acción
export enum StatusType {
    Pending = "pending",
    Ready = "ready",
    Done = "done"
}

export class Action implements Entity {
    readonly id: string
    readonly type: ActionType
    readonly receptor: string
    readonly phone: string
    readonly message?: string
    readonly executeAt: Date
    status: StatusType

    constructor(
        id: string,
        type: ActionType,
        receptor: string,
        phone: string,
        executeAt: Date,
        message?: string,
        status: StatusType = StatusType.Pending
    ) {
        this.id = id
        this.type = type
        this.receptor = receptor
        this.phone = phone
        this.executeAt = executeAt
        this.message = message
        this.status = status
    }

    static create(id: string, type: ActionType, receptor: string, phone: string, executeAt: Date, message?: string): Action {
        return new Action(id, type, receptor, phone, executeAt, message)
    }
}
