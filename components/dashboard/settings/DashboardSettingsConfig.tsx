"use client";
import { useQuery } from "react-query"
import DisabledModules from "./bot/DisabledModules";
import AuxdibotSettings from "./bot/AuxdibotSettings";
import ServerSettings from "./server/ServerSettings";

export default function DashboardSettingsConfig({ id }: { id: string }) {
    let { data: settings } = useQuery(["data_settings", id], async () => await fetch(`/api/v1/servers/${id}/modules`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined))
    
    return (<main className={"bg-gray-950 flex-grow"}>
        <div className={"animate-fadeIn flex max-md:items-center flex-col py-5 md:px-5 gap-5"}>
        <h1 className={"header text-6xl max-md:text-5xl"}>settings</h1>
        <span className={"grid grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 grid-flow-row gap-5"}>
            <DisabledModules server={settings}/>
            <AuxdibotSettings server={settings}/>
            <ServerSettings />
        </span>
        </div>
        
            
        </main>)
}