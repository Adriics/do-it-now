"use client"

import { useEffect, useState } from "react"
import { Action } from "../types/Action"
import ActionCard from "./ActionCard"



export default function ScheduledActionsPanel() {

    const [actions, setActions] = useState<Action[]>([])

    const getActions = async () => {

        const res = await fetch(`${process.env.DO_IT_NOW_API}/v1/do-it-now/actions`)

        const data = await res.json()

        console.log("Actions recibidas: ", data.data)

        setActions(data.data || [])
    }
    useEffect(() => {
        getActions()
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
                    />
                ))
            }
        </div>
    )
}