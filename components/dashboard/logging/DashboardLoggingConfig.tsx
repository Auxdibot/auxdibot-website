"use client";
import { useQuery } from "react-query"
import LatestLog from "./LatestLog";
import LogSettings from "./LogSettings";
import { Suspense } from 'react';

export default function DashboardLoggingConfig({ id }: { id: string }) {
    let { data: logging } = useQuery(["data_logging", id], async () => await fetch(`/api/v1/servers/${id}/log`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined))

    return (<main className={"bg-gray-700 flex-grow"}>
        <div className={"animate-fadeIn flex max-md:items-center flex-col py-5 md:px-5 gap-5"}>
        <h1 className={"header text-6xl max-md:text-5xl"}>Logging</h1>
        <span className={"grid grid-cols-2 grid-rows-2 max-lg:grid-cols-1 grid-flow-row gap-5"}>
            
            <Suspense fallback={null}>
                <LatestLog log={logging?.data?.latest_log}/>
            </Suspense>
            <Suspense fallback={null}>
            <LogSettings server={logging}/>
            </Suspense>
            
        </span>
        </div>
        
            
        </main>)
}