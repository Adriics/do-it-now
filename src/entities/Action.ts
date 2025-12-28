import { Entity } from "./Entity";

// Tipos posibles de acción
export enum ActionType {
    WhatsApp = "WhatsApp",
    Email = "Email",
    URL = "URL"
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
    readonly message?: string
    readonly executeAt: Date
    status: StatusType

    constructor(
        id: string,
        type: ActionType,
        receptor: string,
        executeAt: Date,
        message?: string,
        status: StatusType = StatusType.Pending
    ) {
        this.id = id
        this.type = type
        this.receptor = receptor
        this.executeAt = executeAt
        this.message = message
        this.status = status
    }
}
