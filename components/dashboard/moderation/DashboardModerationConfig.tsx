"use client";
import { useQuery } from "react-query"
import { Suspense } from 'react';
import LatestPunishments from "./LatestPunishments";
import ModerationSettings from "./ModerationSettings";
import WarnThreshold from "./WarnsThreshold";
import RoleExceptions from "./RoleExceptions";
import BlacklistedPhrases from "./BlacklistedPhrases";
import ReportsSettings from "./ReportsSettings";

export default function DashboardModerationConfig({ id }: { id: string }) {
    let { data: moderation } = useQuery(["data_moderation", id], async () => await fetch(`/api/v1/servers/${id}/moderation`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));

    return (<main className={"bg-gray-950 flex-grow"}>
        <div className={"animate-fadeIn flex max-md:items-center flex-col py-5 md:px-5 gap-5"}>
        <h1 className={"header text-6xl max-md:text-5xl"}>moderation</h1>
        <span className={"flex max-md:flex-col gap-5 w-full"}>
            
            <Suspense fallback={null}>
                <LatestPunishments serverID={id} />
                {moderation?.data && <ModerationSettings server={moderation?.data}/>}
            </Suspense>
        </span>
        <span className={"flex max-md:flex-col gap-5"}>
        {moderation?.data && <WarnThreshold server={moderation?.data}/>}
                {moderation?.data && <RoleExceptions server={moderation?.data}/>}
        </span>
        <span className={"flex max-md:flex-col gap-5"}>
        {moderation?.data && <BlacklistedPhrases server={moderation?.data}/>}
                {moderation?.data && <ReportsSettings server={moderation?.data}/>}
        </span>
        </div>
        
            
        </main>)
}