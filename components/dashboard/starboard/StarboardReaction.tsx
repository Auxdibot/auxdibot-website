"use client";

import { BsCheckLg, BsStarFill } from "react-icons/bs";
import { useState } from 'react'; 
import { useQueryClient } from "react-query";
import EmojiPicker from "@/components/ui/emojis/emoji-picker";
import { Button } from "@/components/ui/button/button";
import { useToast } from "@/components/ui/use-toast";
export default function StarboardReaction({ server }: { server: { serverID: string, starboard_reaction: string }}) {
    const [reaction, setReaction] = useState(server?.starboard_reaction ?? "");
    const [success, setSuccess] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function onStarboardReactionChange(e: { emoji: string | null }) {
        if (success) setSuccess(false);

        setReaction(e.emoji ?? '');
    }
    function setStarboardReaction() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append("starboard_reaction", reaction);
        fetch(`/api/v1/servers/${server.serverID}/starboard/reaction`, { method: "POST", body }).then(async (data) => {
            const json = await data.json().catch(() => undefined);
            
            if (!json || json['error']) {
                toast({ title: "Failed to update starboard", description: json['error'] ?? "An error occured", status: "error" })
                return
            }
            toast({ title: "Starboard Updated", description: `Starboard reaction has been updated to ${reaction}.`, status: "success" })
            setSuccess(true);
            queryClient.invalidateQueries(["data_starboard", server.serverID])
        }).catch(() => {     
        });
    }

    return <div className={"flex flex-col gap-3 w-fit mx-auto border-b p-4 border-gray-700"}>
    <span className={"secondary text-xl text-center flex flex-col"}>Set Starboard Reaction</span>
    <span className={"flex flex-row max-xl:flex-col justify-center items-center gap-2"}>
    <EmojiPicker serverID={server?.serverID} value={reaction} onChange={onStarboardReactionChange} />
        <Button onClick={() => setStarboardReaction()} className={`flex flex-row gap-2 items-center w-fit max-xl:mx-auto`} variant={'outline'} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsStarFill/> Change Reaction</>) }
        </Button></span>
    </div>
}