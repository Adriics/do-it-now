"use client"


import ScheduledActionsPanel from "./components/ScheduledActionsPanel";
import CreateActionForm from "./components/CreateActionForm";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').then(registration => {
        console.log(`Service worker registrado: `, { registration })
      }).catch(err => console.error(`Error registrando SW: `, err))

      navigator.serviceWorker.ready.then(registration => {
        return registration.pushManager.subscribe({
          applicationServerKey: "",
          userVisibleOnly: true
        })
      })
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-black text-white font-sans">
      <h1 className="text-4xl font-bold">Bienvenido a tu secretario digital!</h1>
      <main className="flex min-h-screen w-full max-w-3xl flex-row  py-32 px-16 sm:items-start text-white">

        <CreateActionForm />
        <ScheduledActionsPanel />

      </main>
    </div>
  );
}
