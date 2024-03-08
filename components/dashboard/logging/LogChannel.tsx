"use client";

import { BsCheckLg, BsJournal } from "react-icons/bs";
import { useState } from 'react'; 
import { useQuery, useQueryClient } from "react-query";
import Channels from "@/components/ui/select/channels";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
export default function LogChannel({ server }: { server: { serverID: string, log_channel: string }}) {
    let { data: channels } = useQuery(["data_channels", server.serverID], async () => await fetch(`/api/v1/servers/${server.serverID}/channels`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    const [channel, setChannel] = useState<string | undefined>("");
    const [success, setSuccess] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function onLogChannelChange(e: { channel: string | undefined}) {
        if (success) setSuccess(false);

        setChannel(e.channel ?? undefined);
    }
    function setLogChannel() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append("new_log_channel", channel ?? '');
        fetch(`/api/v1/servers/${server.serverID}/log_channel`, { method: "POST", body }).then(async (data) => {
            let json = await data.json();
            if (data.ok == false) {
                toast({ title: "Failed to update log channel", description: json['error'] ? json['error'] : 'An error occured.', status: "error" });
                return;
            }
            queryClient.invalidateQueries(["data_logging", server.serverID])
            setSuccess(true)
            setChannel("");
            toast({ title: "Log Channel Updated", description: channel ? `Successfully updated log channel to: #${channels.find((c: { id: string }) => channel == c.id)?.name}` : 'Successfully disabled the log channel for this server. Logs will no longer be output.', status: "success" });
        });
    }
    if (!channels) return <></>;

    return <div className={"flex flex-col gap-3 w-fit mx-auto border-b p-4 border-gray-700"}>
    <span className={"secondary text-xl text-center flex flex-col"}>Set Log Channel</span>
    
    <span className={"flex flex-row max-md:flex-col gap-2"}>
        <span className={"flex-1 max-md:mx-auto"}><Channels value={channel} serverID={server.serverID} onChange={(e) => onLogChannelChange(e)}/> </span>
        <Button onClick={() => setLogChannel()} variant={'outline'} className={"flex gap-1 items-center"} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsJournal/> Set Log Channel</>) }
        </Button></span>
    </div>
}