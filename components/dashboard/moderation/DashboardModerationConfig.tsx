"use client";
import { useQuery } from "react-query"
import { Suspense } from 'react';
import LatestPunishments from "./LatestPunishments";
import ModerationSettings from "./ModerationSettings";
import RoleExceptions from "./exceptions/RoleExceptions";
import BlacklistedPhrases from "./blacklist/BlacklistedPhrases";
import SpamSettings from "./spam/SpamSettings";
import AttachmentsSettings from "./attachments/AttachmentsSettings";
import InvitesSettings from "./invites/InvitesSettings";

export default function DashboardModerationConfig({ id }: { id: string }) {
    let { data: moderation } = useQuery(["data_moderation", id], async () => await fetch(`/api/v1/servers/${id}/moderation`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));

    return (<main className={"bg-gray-950 flex-grow"}>
        <div className={"animate-fadeIn flex max-md:items-center flex-col py-5 md:px-5 gap-5"}>
        <h1 className={"header text-6xl max-md:text-5xl"}>moderation</h1>
        <span className={"flex max-xl:flex-col gap-5 w-full"}>
            
            <Suspense fallback={null}>
                <LatestPunishments serverID={id} />
                {moderation?.data && <ModerationSettings server={moderation?.data}/>}
            </Suspense>
        </span>

        <span className={"flex max-xl:flex-col gap-5"}>
        {moderation?.data && <SpamSettings server={moderation?.data}/>}
        {moderation?.data && <AttachmentsSettings server={moderation?.data}/>}
        {moderation?.data && <InvitesSettings server={moderation?.data}/>}
        </span>
        <span className={"flex max-xl:flex-col gap-5"}>
        {moderation?.data && <BlacklistedPhrases server={moderation?.data}/>}
        {moderation?.data && <RoleExceptions server={moderation?.data}/>}
        </span>
        
        </div>
        
            
        </main>)
}