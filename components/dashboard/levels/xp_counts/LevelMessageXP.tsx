"use client";

import { BsAward, BsCheckLg } from "react-icons/bs";
import { useState } from 'react'; 
import { useQueryClient } from "react-query";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button/button";
import { useToast } from "@/components/ui/use-toast";
import { LevelPayload } from "../DashboardLevelsConfig";
export default function LevelMessageXP({ server }: { server: LevelPayload }) {
    const [messageXP, setMessageXP] = useState<(number | string)[]>([server.message_xp_range[0] ?? 0, server.message_xp_range[1] ?? 0]);
    const [success, setSuccess] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function onMessageXPChange(e: (string | number)[]) {
        if (success) setSuccess(false);

        setMessageXP(e);
    }
    function setMessageXPGiven() {
        if (!server) return;
        const body = new URLSearchParams();
        
        body.append("message_xp", messageXP ? messageXP.join('-') : '');
        fetch(`/bot/v1/servers/${server.serverID}/levels/message_xp`, { method: "POST", body }).then(async (data) => {
            const json: {  data: { message_xp_range: number[] } } | { error: string } = await data.json().catch(() => undefined);
            if (!json || 'error' in json) {
                toast({ title: "Failed to update message XP", description: json['error'] ?? "An error occured", status: "error" })
                return
            }
            
            toast({ title: "Message XP Updated", description: `Successfully updated message XP to be ${!json.data.message_xp_range[1] ? json.data.message_xp_range?.join(' to ') : json.data.message_xp_range[0]} XP.`, status: "success" })
            queryClient.invalidateQueries(["data_levels", server.serverID])
            setMessageXP([server.message_xp_range[0] ?? 0, server.message_xp_range[1] ?? 0]);
            
        }).catch(() => {     
        });
    }

    return <div className={"flex flex-col gap-1 w-fit mx-auto p-4"}>
    <label className={"text-lg max-md:text-center font-bold flex flex-col"}>Message XP</label>
    <span className={"flex flex-row max-xl:flex-col items-center gap-2"}>
    <div className={"flex flex-row justify-center items-center font-open-sans text-lg max-sm:text-base bg-gray-900/70 mx-2 rounded-2xl"}>
        <span className={'bg-gray-950 rounded-l-xl border border-gray-800 w-24 self-stretch flex'}>
        <Input value={Number(messageXP[0]) || 0} className={'rounded-r-none border-0'}  onChange={(e) => onMessageXPChange([e.target.value, messageXP[1]])}/>
            </span>
            <span className={"border-y border-gray-800 text-sm px-2 self-stretch flex items-center whitespace-nowrap max-sm:hidden"}>to</span>
            <span className={"border-y border-gray-800 text-sm px-2 self-stretch flex items-center whitespace-nowrap sm:hidden"}>-</span>
            <span className={'flex bg-gray-950 rounded-r-xl border border-gray-800 w-24'}>
            <Input value={Number(messageXP[1]) || 0} className={"rounded-none border-0"}  onChange={(e) => onMessageXPChange([messageXP[0], e.target.value])}/> 
            </span>
    </div>
        <Button onClick={() => setMessageXPGiven()} className={`flex flex-row gap-2 items-center max-md:mx-auto w-fit`} variant={'outline'} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsAward/> Update</>) }
        </Button></span>
    </div>
}