"use client";

import { BsCheckLg, BsStar } from "react-icons/bs";
import { useState } from 'react'; 
import { useQuery, useQueryClient } from "react-query";
import Channels from "@/components/ui/channels";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
export default function StarboardChannel({ server }: { server: { serverID: string, starboard_channel?: string  }}) {
    let { data: channels } = useQuery(["data_channels", server.serverID], async () => await fetch(`/api/v1/servers/${server.serverID}/channels`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    const [channel, setChannel] = useState(server?.starboard_channel ?? "");
    const [success, setSuccess] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function onStarboardChannelChange(e: { channel: string | undefined }) {
        if (success) setSuccess(false);
        setChannel(e.channel || '');
    }
    function setStarboardChannel() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append("starboard_channel", channel || '');
        fetch(`/api/v1/servers/${server.serverID}/starboard/channel`, { method: "POST", body }).then(async (res) => {
            
            const json = await res.json().catch(() => undefined);
            if (!json || json['error']) {
                toast({ title: "Failed to update starboard", description: json['error'] ?? "An error occured", status: "error" })
                return
            }
            toast({ title: "Starboard Updated", description: `Starboard channel has been updated to #${channels.find((i: { id: string, name: string }) => i.id == channel)?.name ?? 'Unknown'}.`, status: "success" })
            setSuccess(true)
            queryClient.invalidateQueries(["data_starboard", server.serverID])
        }).catch(() => {     
        });
    }
    if (!channels) return <></>;

    return <div className={"flex flex-col gap-3 w-fit mx-auto border-b p-4 border-gray-700"}>
    <span className={"secondary text-xl text-center flex flex-col"}>Set Starboard Channel</span>
    
    <span className={"flex flex-row max-xl:flex-col items-center gap-2"}>
        <Channels serverID={server.serverID} value={channel} onChange={onStarboardChannelChange}/>
        <Button onClick={() => setStarboardChannel()} className={`flex flex-row gap-2 items-center w-fit max-xl:mx-auto`} variant={'outline'} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsStar/> Change Channel</>) }
        </Button></span>
    </div>
}