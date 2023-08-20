"use client";
import { useQuery, useQueryClient } from "react-query"
import Button from "../../Button";
import { BsDatabaseAdd, BsToggles } from "react-icons/bs";
import DisabledModules from "./DisabledModules";
import AuxdibotSettings from "./AuxdibotSettings";

export default function DashboardSettingsConfig({ serverID }: { serverID: string }) {
    let { data: settings, status } = useQuery(["data_settings", serverID], async () => await fetch(`/api/servers/${serverID}/settings`).then(async (data) => 
    await data.json().then((i) => i.data).catch(() => undefined)).catch(() => undefined))
    
   
    
    return (<main className={"bg-gray-700 flex-grow"}>
        <div className={"animate-fadeIn flex max-md:items-center flex-col py-5 md:px-5 gap-5"}>
        <h1 className={"header text-6xl max-md:text-5xl"}>Settings</h1>
        <span className={"grid grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 grid-flow-row gap-5"}>
            <DisabledModules data={settings}/>
            <AuxdibotSettings data={settings}/>
        </span>
        </div>
        
            
        </main>)
}