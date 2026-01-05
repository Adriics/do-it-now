export enum ActionType {
    WhatsApp = "WhatsApp",
    Email = "Email",
    URL = "URL",
    Personal = "Personal"
}

export enum StatusType {
    Pending = "pending",
    Ready = "ready",
    Done = "done"
}


export type Action = {
    id: string,
    type: ActionType,
    receptor: string,
    message?: string,
    status: StatusType
}