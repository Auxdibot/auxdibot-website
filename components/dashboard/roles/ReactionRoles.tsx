"use client";

import DashboardActionContext from "@/context/DashboardActionContext";
import DiscordGuild from "@/lib/types/DiscordGuild";
import { Suspense, useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { BsAward, BsCheckLg, BsPlus, BsX } from "react-icons/bs";
import { useQuery, useQueryClient } from "react-query";

export function ReactionRole({ reactionRole, index, serverID }: { reactionRole: { reactions: { emoji: string }[], messageID: string }, index: number, serverID: string }) {
    const actionContext = useContext(DashboardActionContext);
    const queryClient = useQueryClient();
    function deleteReward() {
        if (!serverID) return;
        const body = new URLSearchParams();
        body.append("index", index.toString());
        fetch(`/api/v1/servers/${serverID}/reaction_roles`, { method: "DELETE", body }).then(async (data) => {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            queryClient.invalidateQueries(["data_reaction_roles", serverID])
            
            if (actionContext)
            json && json['error'] ? actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false }) : json ? actionContext.setAction({ status: `Removed Reaction Role #${index+1}.`, success: true }) : "";
            
        }).catch(() => {     
        });
    }
    return (<span className={"flex flex-row gap-2 text-lg items-center font-roboto"}>{index+1}) <span className={"italic"}>{reactionRole.messageID}</span> - {reactionRole.reactions.map((i: { emoji: string }) => i.emoji).join(", ")}<span className={"border text-white rounded-2xl w-fit h-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-lg cursor-pointer"} onClick={() => deleteReward()}><BsX/></span></span>);
}

export default function ReactionRoles({ server }: { server: DiscordGuild & { 
    data: {
        serverID: string, 
        reaction_roles: { reactions: { emoji: string }[], messageID: string }[],
    } 
}}) {
    let { data: roles } = useQuery(["data_roles", server.id], async () => await fetch(`/api/v1/servers/${server.id}/roles`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    if (!roles) return <></>;
    return <div className={"bg-gray-800 shadow-2xl border-2 border-gray-800 rounded-2xl h-full max-md:h-fit w-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Reaction Roles</h2>
    <ul className={"flex flex-col gap-4 my-4 items-center"}>
    <Suspense fallback={null}>
        {server?.data?.reaction_roles?.map((i, index) => <li key={index}><ReactionRole reactionRole={i} index={index} serverID={server.data.serverID} /></li>)}

    </Suspense>
    </ul>
    </div>;
}