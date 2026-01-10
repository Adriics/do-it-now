"use client"

import { useState } from "react"


export default function CreateActionForm() {

    const [type, setType] = useState("WhatsApp")
    const [receptor, setReceptor] = useState("")
    const [message, setMessage] = useState("")
    const [actionDate, setActionDate] = useState<string | number>("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log({
            type,
            receptor,
            message,
        })

        try {
            await fetch(`${process.env.NEXT_PUBLIC_DO_IT_NOW_API}/v1/do-it-now/actions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    type,
                    receptor,
                    message,
                    executeAt: actionDate ? new Date(actionDate).toISOString() : null
                })
            })
        } catch (error) {
            console.error(error)
        }

    }

    return (

        <form onSubmit={handleSubmit}>
            <label htmlFor="selector">Tipo de acción:</label>
            <select name="selector" id="selector" className="text-black" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Email">Email</option>
                <option value="Personal">Personal</option>
            </select>

            <label htmlFor="receptor">Receptor:</label>
            <input type="text" name="receptor" id="receptor" value={receptor} onChange={(e) => setReceptor(e.target.value)} />

            <label htmlFor="message">Mensaje:</label>
            <textarea name="message" id="message" value={message} onChange={(e) => setMessage(e.target.value)} title="Mensaje:"></textarea>

            <label htmlFor="date">Fecha:</label>
            <input type="datetime-local" name="date" id="date" value={actionDate} onChange={(e) => setActionDate(e.target.value)} />

            <button type="submit">Crear acción</button>
        </form>

    )
}