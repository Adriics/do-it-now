import { ActionType } from "../types/Action"

interface ActionCardProps {
    id: string,
    type: ActionType,
    receptor: string,
    message: string
}

const handleClick = () => { }

export default function ActionCard({
    id,
    type,
    receptor,
    message
}: ActionCardProps) {

    return (

        <div>
            <span>{type}</span>
            <span>{receptor}</span>
            <span>{message}</span>
            <button onClick={handleClick}>Ejecutar acción</button>
        </div>

    )
}