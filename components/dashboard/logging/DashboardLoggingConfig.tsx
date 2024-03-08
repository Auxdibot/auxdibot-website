"use client";
import { useQuery } from "react-query"
import Logs from "./Logs";
import LogSettings from "./LogSettings";

export default function DashboardLoggingConfig({ id }: { id: string }) {
    let { data: logging } = useQuery(["data_logging", id], async () => await fetch(`/api/v1/servers/${id}/log`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined))

    return (<main className={"bg-gray-950 flex-grow"}>
        <div className={"animate-fadeIn flex max-md:items-center flex-col py-5 md:px-5 gap-5"}>
        <h1 className={"header text-6xl max-md:text-5xl"}>logging</h1>
        <span className={"flex max-md:flex-col max-w-[100vw] w-full gap-5 max-md:px-2"}>
            <LogSettings server={logging?.data}/>
            <Logs logs={logging?.data?.logs}/> 
        </span>
        </div>
        
            
        </main>)
}