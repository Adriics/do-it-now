import ScheduledActionsPanel from "./components/ScheduledActionsPanel";
import CreateActionForm from "./components/CreateActionForm";

export default function Home() {

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
