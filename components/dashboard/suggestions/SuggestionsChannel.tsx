"use client";

import { BsCheckLg, BsQuestionCircle } from "react-icons/bs";
import { useState } from 'react'; 
import { useQuery, useQueryClient } from "react-query";
import Channels from "@/components/ui/select/channels";
import { Button } from "@/components/ui/button/button";
import { useToast } from "@/components/ui/use-toast";
export default function SuggestionsChannel({ server }: { server: { serverID: string, suggestions_channel: string }}) {
    let { data: channels } = useQuery(["data_channels", server.serverID], async () => await fetch(`/bot/v1/servers/${server.serverID}/channels`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    const [channel, setChannel] = useState<string | undefined>(server?.suggestions_channel ?? undefined);
    const [success, setSuccess] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function onSuggestionsChannelChange(e: { channel: string | undefined }) {
        if (success) setSuccess(false);

        setChannel(e.channel);
    }
    function setSuggestionsChannel() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append("suggestions_channel", channel || '');
        fetch(`/bot/v1/servers/${server.serverID}/suggestions/channel`, { method: "POST", body }).then(() => {
            toast({ title: "Suggestions Channel Updated", description: channel ? `Successfully updated suggestions channel to: #${channels.find((c: { id: string }) => channel == c.id)?.name ?? "Unknown"}` : 'Successfully disabled suggestions for this server.  ', status: "success" });
            queryClient.invalidateQueries(["data_suggestions", server.serverID])
            setSuccess(true)
            setChannel("");

        }).catch(() => {     
        });
    }
    if (!channels) return <></>;

    return <div className={"flex flex-col gap-3 w-fit mx-auto"}>
    <span className={"secondary text-xl text-center flex flex-col"}>Set Suggestions Channel</span>
    
    <span className={"flex flex-row max-xl:flex-col items-center gap-2"}>
        <Channels serverID={server.serverID} value={channel} onChange={onSuggestionsChannelChange}/>
        <Button onClick={() => setSuggestionsChannel()} className={`flex flex-row gap-2 items-center max-md:mx-auto w-fit`} variant={'outline'} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsQuestionCircle/> Update</>) }
        </Button></span>
    </div>
}