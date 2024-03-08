"use client";

import { BsAward, BsCheckLg } from "react-icons/bs";
import { useState } from 'react'; 
import { useQueryClient } from "react-query";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
export default function LevelMessageXP({ server }: { server: { serverID: string }}) {
    const [messageXP, setMessageXP] = useState<number | string | undefined>("");
    const [success, setSuccess] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function onMessageXPChange(e: string | number) {
        if (success) setSuccess(false);

        setMessageXP(Number(e) || '');
    }
    function setMessageXPGiven() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append("message_xp", messageXP ? messageXP.toString() : '');
        fetch(`/api/v1/servers/${server.serverID}/levels/message_xp`, { method: "POST", body }).then(async (data) => {
            const json = await data.json().catch(() => undefined);
            if (!json || json['error']) {
                toast({ title: "Failed to update message XP", description: json['error'] ?? "An error occured", status: "error" })
                return
            }
            toast({ title: "Message XP Updated", description: `Successfully updated message XP to ${messageXP}.`, status: "success" })
            queryClient.invalidateQueries(["data_levels", server.serverID])
            setMessageXP("");
            
        }).catch(() => {     
        });
    }

    return <div className={"flex flex-col gap-3 w-fit mx-auto p-4 border-b border-gray-700"}>
    <span className={"secondary text-xl text-center flex flex-col"}>Set Message XP</span>
    <span className={"flex flex-row max-xl:flex-col items-center gap-2"}>
        <Input max={2000} value={Number(messageXP) || 0} className={'w-32'} onChange={(e) => onMessageXPChange(e.target.value)}/> 
        <Button onClick={() => setMessageXPGiven()} className={`flex flex-row gap-2 items-center max-md:mx-auto w-fit`} variant={'outline'} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsAward/> Update</>) }
        </Button></span>
    </div>
}