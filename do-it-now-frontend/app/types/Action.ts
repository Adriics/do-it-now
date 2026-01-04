export enum ActionType {
    WhatsApp = "WhatsApp",
    Email = "Email",
    URL = "URL",
    Personal = "Personal"
}


export type Action = {
    id: string,
    type: ActionType,
    receptor: string,
    message?: string,
}