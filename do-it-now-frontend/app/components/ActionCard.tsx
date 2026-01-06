import { ActionType, StatusType } from "../types/Action"

interface ActionCardProps {
    id: string,
    type: ActionType,
    receptor: string,
    message: string,
    status: StatusType
}

const handleClick = async (actionId: string) => {
    console.log(`Acción con id ${actionId} ejecutandose`)

    try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/actions/${actionId}/done`, {
            method: "PATCH",
        })

    } catch (error) {

    }
}

export default function ActionCard({
    id,
    type,
    receptor,
    message,
    status
}: ActionCardProps) {

    return (
        <>

            {
                status === StatusType.Ready && (
                    <div className="w-80 flex flex-col bg-orange-200 m-8">
                        <h1>Lista para ejecutar</h1>
                        <span>{type}</span>
                        <span>{receptor}</span>
                        <span>{message}</span>
                        <span>{status}</span>
                        <button onClick={() => handleClick(id)} className="cursor-pointer">Ejecutar acción</button>
                    </div>
                )
            }

            {
                status === StatusType.Pending && (
                    <div className="w-80 flex flex-col bg-red-200 m-8">
                        <h1>Pendiente</h1>
                        <span>{type}</span>
                        <span>{receptor}</span>
                        <span>{message}</span>
                        <span>{status}</span>
                    </div>
                )
            }

            {
                status === StatusType.Done && (
                    <div className="w-80 flex flex-col bg-green-200 m-8">
                        <h1>Pendiente</h1>
                        <span>{type}</span>
                        <span>{receptor}</span>
                        <span>{message}</span>
                        <span>{status}</span>
                    </div>
                )
            }
        </>

    )
}