import { ActionType, StatusType } from "../types/Action"

interface ActionCardProps {
    id: string,
    type: ActionType,
    receptor: string,
    message: string,
    status: StatusType
}

const handleClick = async (actionId: string, type: ActionType, receptor: string, message: string) => {
    console.log(`Acción con id ${actionId} ejecutandose`)

    try {

        if (!receptor) return

        let url = ""

        if (type === ActionType.WhatsApp) {
            url = `https://wa.me/${receptor}?text=${encodeURIComponent(message)}`
        }

        if (type === ActionType.Email) {
            url = `mailto:${receptor}?subject=Recordatorio&body=${encodeURIComponent(message)}`
        }

        if (url) {
            window.open(url, "_blank")
        }

        await fetch(
            `${process.env.NEXT_PUBLIC_DO_IT_NOW_API}/v1/do-it-now/actions/${actionId}/done`,
            { method: "PATCH" }
        )

    } catch (error) {

        console.log("EERRRROOOORRRR", error)

    }
}

const handleDelete = async (actionId: string) => {

    console.log(`Action con id ${actionId} eliminandose`)

    try {

        if (!actionId) return

        await fetch(`${process.env.NEXT_PUBLIC_DO_IT_NOW_API}/v1/do-it-now/actions/${actionId}`, {
            method: "DELETE"
        })

    } catch (error) {
        console.error(error)
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
                        <button onClick={() => handleClick(id, type, receptor, message)} className="cursor-pointer border border-black m-2 rounded-lg hover:bg-green-200 transition-all">Ejecutar acción</button>
                        <button onClick={() => handleDelete(id)} className="cursor-pointer border border-black m-2 rounded-lg hover:bg-red-500 transition-all">Eliminar</button>
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
                        <button onClick={() => handleDelete(id)} className="cursor-pointer border border-black m-2 rounded-lg hover:bg-red-500 transition-all">Eliminar</button>
                    </div>
                )
            }

            {
                status === StatusType.Done && (
                    <div className="w-80 flex flex-col bg-green-200 m-8">
                        <h1>Ejecutadas</h1>
                        <span>{type}</span>
                        <span>{receptor}</span>
                        <span>{message}</span>
                        <span>{status}</span>
                        <button onClick={() => handleDelete(id)} className="cursor-pointer border border-black m-2 rounded-lg hover:bg-red-500 transition-all">Eliminar</button>
                    </div>
                )
            }
        </>

    )
}