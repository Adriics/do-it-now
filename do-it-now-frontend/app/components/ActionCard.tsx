import { ActionType, StatusType } from "../types/Action"

interface ActionCardProps {
    id: string,
    type: ActionType,
    receptor: string,
    message: string,
    status: StatusType
}

const handleClick = () => { }

export default function ActionCard({
    id,
    type,
    receptor,
    message,
    status
}: ActionCardProps) {

    return (

        <div>
            <span>{type}</span>
            <span>{receptor}</span>
            <span>{message}</span>
            <span>{status}</span>
            <button onClick={handleClick}>Ejecutar acción</button>
        </div>

    )
}