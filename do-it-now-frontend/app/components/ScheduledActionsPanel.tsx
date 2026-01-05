"use client"

import { useEffect, useState } from "react"
import { Action } from "../types/Action"
import ActionCard from "./ActionCard"



export default function ScheduledActionsPanel() {

    const [actions, setActions] = useState<Action[]>([])

    const getActions = async () => {

        const res = await fetch(`${process.env.NEXT_PUBLIC_DO_IT_NOW_API}/v1/do-it-now/actions`)

        const data = await res.json()

        console.log("Actions recibidas: ", data.data)

        setActions(data.data || [])
    }

    useEffect(() => {
        getActions()

        // Polling cada 10s si la pestaña está visible
        const interval = setInterval(() => {
            if (document.visibilityState === "visible") {
                getActions()
            }
        }, 10_000)

        // Refrescar inmediatamente al volver a la pestaña
        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                getActions()
            }
        }
        document.addEventListener("visibilitychange", handleVisibilityChange)

        // Cleanup al desmontar
        return () => {
            clearInterval(interval)
            document.removeEventListener("visibilitychange", handleVisibilityChange)
        }
    }, [])

    return (

        <div>
            {
                actions.map((action) => (
                    <ActionCard
                        key={action.id}
                        id={action.id ?? ""}
                        message={action.message ?? ""}
                        receptor={action.receptor ?? ""}
                        type={action.type ?? ""}
                        status={action.status}
                    />
                ))
            }
        </div>
    )
}