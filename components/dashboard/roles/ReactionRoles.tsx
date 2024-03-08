"use client";

import Twemoji from "@/components/ui/emojis/twemoji";
import { useToast } from "@/components/ui/use-toast";

import { emojis } from "@/lib/constants/emojis";
import ServerEmojiBody from "@/lib/types/ServerEmojis";
import Image from "next/image";
import { Suspense } from 'react';
import { BsX } from "react-icons/bs";
import { useQuery, useQueryClient } from "react-query";

export function ReactionRole({ reactionRole, index, serverID }: { reactionRole: { reactions: { emoji: string }[], messageID: string }, index: number, serverID: string }) {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    let { data: serverEmojis } = useQuery<ServerEmojiBody | undefined>(["data_emojis", serverID], async () => serverID && await fetch(`/api/v1/servers/${serverID}/emojis`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined)); 
    function deleteReward() {
        if (!serverID) return;
        const body = new URLSearchParams();
        body.append("index", index.toString());
        fetch(`/api/v1/servers/${serverID}/reaction_roles`, { method: "DELETE", body }).then(async (data) => {
            const json = await data.json().catch(() => undefined);
            
            if (!json || json['error']) {
                toast({ title: `Failed to delete reaction role`, description: json['error'] ? json['error'] : `An error occurred while deleting the reaction role.`, status: 'error' });
            }
            toast({ title: `Reaction Role Deleted`, description: `The reaction role has been deleted successfully.`, status: 'success' });
            queryClient.invalidateQueries(["data_reaction_roles", serverID]);
        }).catch(() => {     
        });
    }
    return (<span className={"flex flex-row gap-2 text-lg items-center font-roboto"}>{index+1}) <span className={"italic"}>{reactionRole.messageID}</span> - {reactionRole.reactions.map((i: { emoji: string }) => {
        const serverEmojiValue = serverEmojis?.emojis.find((i2) => i2.id == i.emoji);
        const emojiValue = emojis.find((i2) => i2.emojis.find((emoji) => emoji.emoji == i.emoji))?.emojis.find((emoji) => emoji.emoji == i.emoji);
        return serverEmojiValue ? <Image width={24} height={24} alt={serverEmojiValue.name} draggable="false" loading="lazy" src={serverEmojiValue.image}/> : <Twemoji>{emojiValue?.hexcode.toLowerCase() ?? ''}</Twemoji>;
    
    })}<span className={"border text-white rounded-2xl w-fit h-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-lg cursor-pointer"} onClick={() => deleteReward()}><BsX/></span></span>);
}

export default function ReactionRoles({ server }: { server: { 
    serverID: string, 
    reaction_roles: { reactions: { emoji: string }[], messageID: string }[], 
}}) {
    return <div className={"bg-gray-800 shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Reaction Roles</h2>
    <ul className={"flex flex-col gap-4 my-4 items-center"}>
    <Suspense fallback={null}>
        {server?.reaction_roles?.map((i, index) => <li key={index}><ReactionRole reactionRole={i} index={index} serverID={server.serverID} /></li>)}

    </Suspense>
    </ul>
    </div>;
}