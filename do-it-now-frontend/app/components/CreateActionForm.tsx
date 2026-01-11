"use client"

import { useState } from "react"


export default function CreateActionForm() {

    const [type, setType] = useState("WhatsApp")
    const [receptor, setReceptor] = useState("")
    const [message, setMessage] = useState("")
    const [actionDate, setActionDate] = useState<string | number>("")
    const [permission, setPermission] = useState<NotificationPermission>("default")

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

            if (Notification.permission === "default") {
                const permission = Notification.requestPermission()
            }

            if (Notification.permission === "granted") {
                const registration = await navigator.serviceWorker.ready

                const existingSubscription = await registration.pushManager.getSubscription()

                if (!existingSubscription) {
                    const newSubscription = await registration.pushManager.subscribe({
                        applicationServerKey: "...",
                        userVisibleOnly: true
                    })

                    await fetch(`${process.env.NEXT_PUBLIC_DO_IT_NOW_API}/v1/push/subscribe`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            subscription: newSubscription
                        })
                    })

                    console.log("Nueva suscripcion creada: ", newSubscription)
                } else {
                    console.log("Ya estaba suscrito: ", existingSubscription)
                }
            }


        } catch (error) {
            console.error(error)
        }

    }

    return (

        <div className="bg-gray-900 p-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
                <label htmlFor="selector">Tipo de acción:</label>
                <select name="selector" id="selector" className="text-white" value={type} onChange={(e) => setType(e.target.value)}>
                    <option className="text-black transition-all" value="WhatsApp">WhatsApp</option>
                    <option className="text-black transition-all" value="Email">Email</option>
                    <option className="text-black transition-all" value="Personal">Personal</option>
                </select>

                <label htmlFor="receptor" className="flex flex-col">Receptor:</label>
                <input type="text" name="receptor" id="receptor" value={receptor} onChange={(e) => setReceptor(e.target.value)} className="border border-white rounded-lg p-2" />

                <label htmlFor="message">Mensaje:</label>
                <textarea name="message" id="message" value={message} onChange={(e) => setMessage(e.target.value)} title="Mensaje:" className="border border-white rounded-lg p-2"></textarea>

                <label htmlFor="date">Fecha programada:</label>
                <input type="datetime-local" name="date" id="date" value={actionDate} onChange={(e) => setActionDate(e.target.value)} className="border border-white rounded-lg p-2" />

                <button type="submit" className="bg-blue-700 p-4 rounded-lg cursor-pointer hover:bg-blue-800 transition-all">Crear acción</button>
            </form>
        </div>

    )
}