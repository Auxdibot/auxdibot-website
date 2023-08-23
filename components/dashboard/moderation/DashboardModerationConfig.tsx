"use client";
import { useQuery } from "react-query"
import { Suspense } from 'react';
import LatestPunishments from "./LatestPunishments";
import ModerationSettings from "./ModerationSettings";

export default function DashboardModerationConfig({ id }: { id: string }) {
    let { data: punishments } = useQuery(["data_punishments", id], async () => await fetch(`/api/v1/servers/${id}/punishments?limit=5`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));

    return (<main className={"bg-gray-700 flex-grow"}>
        <div className={"animate-fadeIn flex max-md:items-center flex-col py-5 md:px-5 gap-5"}>
        <h1 className={"header text-6xl max-md:text-5xl"}>Moderation</h1>
        <span className={"grid grid-cols-2 grid-rows-2 max-lg:grid-cols-1 grid-flow-row gap-5"}>
            
            <Suspense fallback={null}>
                <LatestPunishments serverID={id} punishments={punishments?.data?.punishments}/>
                <ModerationSettings server={punishments}/>
            </Suspense>
        </span>
        </div>
        
            
        </main>)
}