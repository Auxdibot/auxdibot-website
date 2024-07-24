"use client";

import { BsAward, BsCheckLg } from "react-icons/bs";
import { useState } from 'react'; 
import { useQueryClient } from "react-query";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button/button";
import { useToast } from "@/components/ui/use-toast";
import { LevelPayload } from "../DashboardLevelsConfig";
export default function LevelVoiceXP({ server }: { server: LevelPayload }) {
    const [voiceXP, setVoiceXP] = useState<(number | string)[]>([server.voice_xp_range[0] ?? 0, server.voice_xp_range[1] ?? 0]);
    const [success, setSuccess] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function onVoiceXPChange(e: (string | number)[]) {
        if (success) setSuccess(false);

        setVoiceXP(e);
    }
    function setVoiceXPGiven() {
        if (!server) return;
        const body = new URLSearchParams();
        
        body.append("voice_xp", voiceXP ? voiceXP.join('-') : '');
        fetch(`/bot/v1/servers/${server.serverID}/levels/voice_xp`, { method: "POST", body }).then(async (data) => {
            const json: {  data: { voice_xp_range: number[] } } | { error: string } = await data.json().catch(() => undefined);
            if (!json || 'error' in json) {
                toast({ title: "Failed to update voice XP", description: json['error'] ?? "An error occured", status: "error" })
                return
            }
            
            toast({ title: "Message XP Updated", description: `Successfully updated voice XP to be ${!json.data.voice_xp_range[1] ? json.data.voice_xp_range?.join(' to ') : json.data.voice_xp_range[0]} XP.`, status: "success" })
            queryClient.invalidateQueries(["data_levels", server.serverID])
            setVoiceXP([server.voice_xp_range[0] ?? 0, server.voice_xp_range[1] ?? 0]);
            
        }).catch(() => {     
        });
    }

    return <div className={"flex flex-col gap-1 w-fit mx-auto p-4"}>
    <label className={"text-lg max-md:text-center font-bold flex flex-col"}>Voice XP</label>
    <span className={"flex flex-row max-xl:flex-col items-center gap-2"}>
        <Input max={2000} value={Number(voiceXP[0]) || 0} className={'w-32'} onChange={(e) => onVoiceXPChange([e.target.value, voiceXP[1]])}/>
        to
        <Input max={2000} value={Number(voiceXP[1]) || 0} className={'w-32'} onChange={(e) => onVoiceXPChange([voiceXP[0], e.target.value])}/> 
        <Button onClick={() => setVoiceXPGiven()} className={`flex flex-row gap-2 items-center max-md:mx-auto w-fit`} variant={'outline'} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsAward/> Update</>) }
        </Button></span>
    </div>
}