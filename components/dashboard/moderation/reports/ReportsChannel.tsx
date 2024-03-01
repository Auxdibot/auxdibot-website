"use client";

import { BsCheckLg, BsHash } from "react-icons/bs";
import { useState } from 'react'; 
import Channels from "@/components/ui/channels";
import { useQuery } from "react-query";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
export default function ReportsChannel({ server }: { server: { readonly serverID: string, readonly reports_channel: string }}) {
    let { data: channels } = useQuery(["data_channels", server.serverID], async () => await fetch(`/api/v1/servers/${server.serverID}/channels`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    const [channel, setChannel] = useState<string | undefined>(server.reports_channel ?? undefined);
    const { toast } = useToast();
    const [success, setSuccess] = useState(false);
    function onReportsChannelChange(e: { channel?: string }) {
        if (success) setSuccess(false);
        if (e.channel == 'null') return setChannel(undefined)
        setChannel(e.channel ?? undefined);
    }
    function setReportsChannel() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append("reports_channel", channel || '');
        fetch(`/api/v1/servers/${server.serverID}/moderation/reports/channel`, { method: "POST", body }).then(async (data) => {
            
            const json = await data.json().catch(() => undefined);
            if (!json || json['error']) {
                toast({
                    title: "Failed to set reports channel",
                    description: json['error'] || "Couldn't find error.",
                    status: "error",
                })
                return;
            }       
            setSuccess(true);
            toast({
                title: "Reports Channel Updated",
                description: channel ? `The reports channel has been updated to #${channels?.find((i: { id: string }) => i.id === channel)?.name ?? "Unknown"}.` : "Reports channel is now disabled for this server. Reports are disabled.",
                status: "success",
            })
        }).catch(() => {});
    }

    return <div className={"flex flex-col gap-3 md:w-fit flex-1 flex-shrink-0 p-4 md:items-start"}>
    <h3 className={"text-xl mx-auto font-open-sans text-gray-300 text-center flex flex-col"}>Reports Channel</h3>
    
    <span className={"flex flex-col justify-center items-center mx-auto max-md:flex-col gap-2"}>
        <span className={"mx-auto"}><Channels serverID={server.serverID} onChange={onReportsChannelChange} value={channel}/></span>
        <Button onClick={setReportsChannel} className={`flex items-center gap-2 mx-auto w-fit`} variant={'outline'} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsHash/> Update</>) }
        </Button></span>
    </div>
}