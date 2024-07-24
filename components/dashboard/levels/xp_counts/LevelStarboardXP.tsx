"use client";

import { BsAward, BsCheckLg } from "react-icons/bs";
import { useState } from 'react'; 
import { useQueryClient } from "react-query";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button/button";
import { useToast } from "@/components/ui/use-toast";
import { LevelPayload } from "../DashboardLevelsConfig";
export default function LevelStarboardXP({ server }: { server: LevelPayload }) {
    const [starboardXP, setStarboardXP] = useState<(number | string)[]>([server.starboard_xp_range[0] ?? 0, server.starboard_xp_range[1] ?? 0]);
    const [success, setSuccess] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function onStarboardXPChange(e: (string | number)[]) {
        if (success) setSuccess(false);

        setStarboardXP(e);
    }
    function setStarboardXPGiven() {
        if (!server) return;
        const body = new URLSearchParams();
        
        body.append("starboard_xp", starboardXP ? starboardXP.join('-') : '');
        fetch(`/bot/v1/servers/${server.serverID}/levels/starboard_xp`, { method: "POST", body }).then(async (data) => {
            const json: {  data: { starboard_xp_range: number[] } } | { error: string } = await data.json().catch(() => undefined);
            if (!json || 'error' in json) {
                toast({ title: "Failed to update starboard XP", description: json['error'] ?? "An error occured", status: "error" })
                return
            }
            
            toast({ title: "Message XP Updated", description: `Successfully updated starboard XP to be ${!json.data.starboard_xp_range[1] ? json.data.starboard_xp_range?.join(' to ') : json.data.starboard_xp_range[0]} XP.`, status: "success" })
            queryClient.invalidateQueries(["data_levels", server.serverID])
            setStarboardXP([server.starboard_xp_range[0] ?? 0, server.starboard_xp_range[1] ?? 0]);
            
        }).catch(() => {     
        });
    }

    return <div className={"flex flex-col gap-1 w-fit mx-auto p-4"}>
    <label className={"text-lg max-md:text-center font-bold flex flex-col"}>Starboard XP</label>
    <span className={"flex flex-row max-xl:flex-col items-center gap-2"}>
        <Input max={2000} value={Number(starboardXP[0]) || 0} className={'w-32'} onChange={(e) => onStarboardXPChange([e.target.value, starboardXP[1]])}/>
        to
        <Input max={2000} value={Number(starboardXP[1]) || 0} className={'w-32'} onChange={(e) => onStarboardXPChange([starboardXP[0], e.target.value])}/> 
        <Button onClick={() => setStarboardXPGiven()} className={`flex flex-row gap-2 items-center max-md:mx-auto w-fit`} variant={'outline'} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsAward/> Update</>) }
        </Button></span>
    </div>
}