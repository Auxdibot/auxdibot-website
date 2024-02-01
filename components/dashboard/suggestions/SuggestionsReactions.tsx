"use client";

import EmojiPicker from "@/components/input/EmojiPicker";
import Twemoji from "@/components/input/Twemoji";
import DashboardActionContext from "@/context/DashboardActionContext";
import { emojis } from "@/lib/constants/emojis";
import ServerEmojiBody from "@/lib/types/ServerEmojis";
import Image from "next/image";
import { Suspense, useContext, useState } from 'react';
import { BsCheckLg, BsPlus, BsX } from "react-icons/bs";
import { useQuery, useQueryClient } from "react-query";

export function Reaction({ reaction, index, serverID }: { reaction: string, index: number, serverID: string }) {
    const actionContext = useContext(DashboardActionContext);
    const queryClient = useQueryClient();
    let { data: serverEmojis } = useQuery<ServerEmojiBody | undefined>(["data_emojis", serverID], async () => serverID && await fetch(`/api/v1/servers/${serverID}/emojis`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined)); 
    function deleteReaction() {
        if (!serverID) return;
        const body = new URLSearchParams();
        body.append("index", index.toString());
        fetch(`/api/v1/servers/${serverID}/suggestions/reactions`, { method: "DELETE", body }).then(async (data) => {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            queryClient.invalidateQueries(["data_suggestions", serverID])
            
            if (actionContext)
            json && json['error'] ? actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false }) : json ? actionContext.setAction({ status: `Removed "${reaction}" from the suggestions reactions.`, success: true }) : "";
            
        }).catch(() => {     
        });
    }
    const serverEmojiValue = serverEmojis?.emojis.find((i2) => i2.id == reaction);
    const emojiValue = !serverEmojiValue ? emojis.find((i2) => i2.emojis.find((emoji) => emoji.emoji == reaction))?.emojis.find((emoji) => emoji.emoji == reaction) : undefined;
    return (<span className={"flex flex-row gap-2 text-2xl items-center"}>{serverEmojiValue ? <Image width={24} height={24} alt={serverEmojiValue.name} draggable="false" loading="lazy" src={serverEmojiValue.image}/> : <Twemoji>{emojiValue?.hexcode.toLowerCase() ?? ''}</Twemoji>} <span className={"border text-white rounded-2xl w-fit h-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-lg cursor-pointer"} onClick={() => deleteReaction()}><BsX/></span></span>);
}

export default function SuggestionsReactions({ server }: { server: { 
    serverID: string, 
    suggestions_reactions: string[],    
}}) {
    const [success, setSuccess] = useState(false);
    const [reaction, setReaction] = useState("");
    const actionContext = useContext(DashboardActionContext);
    const queryClient = useQueryClient();
    function addSuggestionReaction() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append("suggestion_reaction", reaction);
        fetch(`/api/v1/servers/${server.serverID}/suggestions/reactions`, { method: "PATCH", body }).then(async (data) => {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            queryClient.invalidateQueries(["data_suggestions", server.serverID])
            
            if (!json['error'])
                setSuccess(true);
            if (actionContext)
            json && json['error'] ? actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false }) : json ? actionContext.setAction({ status: `Added "${reaction}" as a suggestions reaction.`, success: true }) : "";
            setReaction("");
            
        }).catch(() => {     
        });
    }
    return <div className={"bg-gray-800 flex flex-col shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Suggestions Reactions</h2>
    <span className={"text-gray-400 text-center mx-auto italic font-open-sans"}>Must be a valid emoji or Discord emoji ID.</span>
    <ul className={"flex flex-col gap-4 my-4 items-center"}>
    <Suspense fallback={null}>
        {server?.suggestions_reactions?.map((i, index) => <li key={index}><Reaction reaction={i} index={index} serverID={server.serverID} /></li>)}

    </Suspense>
    <EmojiPicker serverID={server?.serverID} value={reaction} onChange={(e) => setReaction(e.emoji ?? '')} />
    <button onClick={() => addSuggestionReaction()} className={`secondary text-md max-md:mx-auto ${success ? "bg-gradient-to-l from-green-400 to-green-600 text-black border-black" : "hover-gradient border-white"} hover:text-black hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsPlus/> Add Suggestion Reaction</>) }
        </button>
    </ul>
    </div>;
}