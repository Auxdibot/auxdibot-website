"use client";

import EmojiPicker from "@/components/ui/emojis/emoji-picker";
import Twemoji from "@/components/ui/emojis/twemoji";
import { Button } from "@/components/ui/button/button";
import { useToast } from "@/components/ui/use-toast";
import { emojis } from "@/lib/constants/emojis";
import ServerEmojiBody from "@/lib/types/ServerEmojis";
import Image from "next/image";
import { Suspense, useState } from 'react';
import { BsCheckLg, BsPlus, BsX } from "react-icons/bs";
import { useQuery, useQueryClient } from "react-query";

export function Reaction({ reaction, index, serverID }: { reaction: string, index: number, serverID: string }) {

    const queryClient = useQueryClient();
    let { data: serverEmojis } = useQuery<ServerEmojiBody | undefined>(["data_emojis", serverID], async () => serverID && await fetch(`/api/v1/servers/${serverID}/emojis`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined)); 
    const { toast } = useToast();
    function deleteReaction() {
        if (!serverID) return;
        const body = new URLSearchParams();
        body.append("index", index.toString());
        fetch(`/api/v1/servers/${serverID}/suggestions/reactions`, { method: "DELETE", body }).then(async (data) => {
            const json = await data.json().then((data) => data?.data).catch(() => undefined);
            queryClient.invalidateQueries(["data_suggestions", serverID])
            toast({
                title: "Reaction Deleted",
                description: json && !json['error'] ? `Successfully deleted reaction: ${reaction}` : 'An error occurred. Please try again.',
                status: !json || json['error'] ? "error" : "success"
            
            })

        }).catch(() => {     
        });
    }
    const serverEmojiValue = serverEmojis?.emojis.find((i2) => i2.id == reaction);
    const emojiValue = !serverEmojiValue ? emojis.find((i2) => i2.emojis.find((emoji) => emoji.emoji == reaction))?.emojis.find((emoji) => emoji.emoji == reaction) : undefined;
    return (<span className={"flex flex-row gap-2 text-2xl items-center"}>{serverEmojiValue ? <Image width={24} height={24} alt={serverEmojiValue.name} draggable="false" loading="lazy" src={serverEmojiValue.image}/> : <Twemoji>{emojiValue?.hexcode.toLowerCase() ?? ''}</Twemoji>} <span className={"border text-gray-700 border-gray-700 rounded-2xl w-fit h-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-lg cursor-pointer"} onClick={() => deleteReaction()}><BsX/></span></span>);
}

export default function SuggestionsReactions({ server }: { server: { 
    serverID: string, 
    suggestions_reactions: string[],    
}}) {
    const [success, setSuccess] = useState(false);
    const [reaction, setReaction] = useState("");
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function addSuggestionReaction() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append("suggestion_reaction", reaction);
        fetch(`/api/v1/servers/${server.serverID}/suggestions/reactions`, { method: "PATCH", body }).then(async (data) => {
            const json = await data.json().catch(() => undefined);
            queryClient.invalidateQueries(["data_suggestions", server.serverID])
            toast({
                title: "Reaction Added",
                description: json && !json['error'] ? `Successfully added reaction: ${reaction}` : 'An error occurred. Please try again.',
                status: !json || json['error'] ? "error" : "success"
            
            })
            setSuccess(true)
            setReaction("");
        }).catch(() => {     
        });
    }
    return <div className={"flex flex-col shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Suggestions Reactions</h2>
    <ul className={"grid grid-cols-3 max-md:grid-cols-2 max-w-sm mx-auto gap-4 my-4 items-center"}>
    <Suspense fallback={null}>
        {server?.suggestions_reactions?.map((i, index) => <li key={index}><Reaction reaction={i} index={index} serverID={server.serverID} /></li>)}

    </Suspense>
    
    </ul>
    <div className={'flex max-md:flex-col gap-2 mx-auto my-5'}>
        <EmojiPicker serverID={server?.serverID} value={reaction} onChange={(e) => setReaction(e.emoji ?? '')} />
        <Button onClick={() => addSuggestionReaction()} className={`flex flex-row gap-2 items-center max-md:mx-auto w-fit`} variant={'outline'} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsPlus/> Add</>) }
        </Button>
    </div>
    
    </div>;
}