import { Action, ActionType } from "../entities/Action";


export class ActionExecutor {

    async preparePayload(action: Action) {

        if (action.type === ActionType.Email) {
            const email = action.receptor
            const subject = encodeURIComponent(action.message ?? "")
            const body = encodeURIComponent(action.message ?? "")
            return `mailto:${email}?subject=${subject}&body=${body}`
        }

        if (action.type === ActionType.WhatsApp) {
            const phone = action.receptor
            const text = encodeURIComponent(action.message ?? "")
            return `https://wa.me/${phone}?text=${text}`
        }

        if (action.type === ActionType.Personal) {
            return action.message
        }
    }



}