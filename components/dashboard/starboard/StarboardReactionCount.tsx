"use client";

import { BsCheckLg, BsStars } from "react-icons/bs";
import { ChangeEvent, useState } from 'react'; 
import { useQueryClient } from "react-query";

import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button/button";
export default function StarboardReactionCount({ server }: { server: { serverID: string, starboard_reaction_count?: number }}) {
    const [reactionCount, setReactionCount] = useState<number | string | undefined>(server?.starboard_reaction_count ?? 0);
    const [success, setSuccess] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function onStarboardReactionCountChange(e: ChangeEvent<HTMLInputElement>) {
        if (success) setSuccess(false);

        setReactionCount(Number(e.target.value) ?? '');
    }
    function setStarboardReactionCount() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append("reaction_count", reactionCount ? reactionCount.toString() : "");
        fetch(`/api/v1/servers/${server.serverID}/starboard/reaction_count`, { method: "POST", body }).then(async (data) => {
            const json = await data.json().catch(() => undefined);
            
            if (!json || json['error']) {
                toast({ title: "Failed to update starboard", description: json['error'] ?? "An error occured", status: "error" })
                return
            }
            toast({ title: "Starboard Updated", description: `Starboard reaction count has been updated to ${reactionCount?.toLocaleString()}.`, status: "success" })
            queryClient.invalidateQueries(["data_starboard", server.serverID])
            setSuccess(true);

        }).catch(() => {     
        });
    }

    return <div className={"flex flex-col gap-3 w-fit mx-auto p-4"}>
    <span className={"secondary text-xl text-center flex flex-col"}>Set Starboard Reaction Count</span>
    <span className={"flex flex-row max-xl:flex-col items-center gap-2 justify-center"}>
        <Input className={'w-16'} type={'number'}  max={100} value={Number(reactionCount) || 0} onChange={onStarboardReactionCountChange}/> 
        <Button onClick={() => setStarboardReactionCount()} className={`flex flex-row gap-2 items-center w-fit max-md:mx-auto`} variant={'outline'} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsStars/> Update</>) }
        </Button></span>
    </div>
}