import { Action, ActionType } from "../entities/Action";
import { NotificationPayload } from "../entities/NotificationPayload";


export class ActionExecutor {

    execute(action: Action): NotificationPayload {
        switch (action.type) {
            case ActionType.Email:
                return {
                    title: "📧 Email pendiente",
                    body: action.message ?? "Tienes un email que enviar",
                    link: `/actions/${action.id}`
                }

            case ActionType.WhatsApp:
                return {
                    title: "WhatsApp pendiente",
                    body: action.message ?? "Tienes un WhatsApp que enviar",
                    link: `https://wa.me/${action.phone}?text=${encodeURIComponent(action.message ?? "")}`
                }

            case ActionType.Personal:
                return {
                    title: "Acción personal",
                    body: action.message ?? "Tienes una acción pendiente",
                    link: `/actions/${action.id}`
                }

            default:
                throw new Error(`Unsupported action type: ${action.type}`)
        }
    }




}