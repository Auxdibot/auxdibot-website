"use client";

import { BsCheckLg, BsPersonBadge } from "react-icons/bs";
import { useState } from 'react'; 
import DiscordGuild from "@/lib/types/DiscordGuild";
import { useQueryClient } from "react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
export default function NicknameChange({ server }: { server: DiscordGuild & { data: {serverID: string, disabled_modules: string[]} } }) {
    const [nick, setNick] = useState("");
    const [success, setSuccess] = useState(false);
    const queryClient = useQueryClient();
    const { toast } = useToast();

    function onNickChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (success) setSuccess(false);
        setNick(e.currentTarget.value);
    }
    function setNickname() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append("new_nickname", nick);
        fetch(`/api/v1/servers/${server.id}/nick`, { method: "POST", body }).then(async (data) => {
            const json = await data.json().catch(() => undefined);
            queryClient.invalidateQueries(["data_settings", server.id]);
            if (!json || json['error']) {
            toast({
                title: `Error`,
                description: `An error occurred while updating nickname!`,
                status: 'error',
                duration: 5000,
            });
            } else {
            setSuccess(true)
            toast({
                title: `Updated Nickname`,
                description: `Updated nickname to ${nick || 'Auxdibot'}!`,
                status: 'success',
                duration: 5000,
            
            });
            }
            setNick("");
        }).catch(() => {});
    }
    return <div className={"flex flex-col gap-3 w-fit mx-auto border-b p-4 border-gray-700"}>
    <span className={"secondary text-xl text-center flex flex-col"}>Update Bot Nickname</span>
    
    <span className={"flex flex-col gap-2 w-fit mx-auto items-center"}><Input maxLength={32} value={nick} placeholder={"Bot name here..."} onChange={(e) => onNickChange(e)}/> 
        <Button onClick={() => setNickname()} className={`font-open-sans gap-1`} variant={'outline'} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsPersonBadge/> Update Nickname</>) }
        </Button></span>
    </div>
}