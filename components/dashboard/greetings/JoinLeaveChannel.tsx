"use client";

import { BsCheckLg } from "react-icons/bs";
import { PiHandWavingLight } from "react-icons/pi";
import { useState } from 'react'; 
import { useQuery } from "react-query";
import Channels from "@/components/ui/select/channels";
import { useToast } from "@/components/ui/use-toast";
export default function JoinLeaveChannel({ serverID }: { serverID: string }) {
    let { data: channels } = useQuery(["data_channels", serverID], async () => await fetch(`/api/v1/servers/${serverID}/channels`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    const [channel, setChannel] = useState<string | undefined>("");
    const [success, setSuccess] = useState(false);
    const { toast } = useToast();
    function onJoinLeaveChannelChange(e: { channel: string | undefined }) {
        if (success) setSuccess(false);

        setChannel(e.channel);
    }
    function setJoinLeaveChannel() {
        if (!serverID) return;
        const body = new URLSearchParams();
        body.append("channel", channel || '');
        fetch(`/api/v1/servers/${serverID}/greetings/channel`, { method: "POST", body }).then(async (data) => {
            const json = await data.json().catch(() => undefined);
            if (!json || json['error']) {
                toast({ title: `Failed to update Join/Leave channel`, description: json['error'] ? json['error'] : `An error occurred while updating the Join/Leave channel.`, status: 'error' })
                return;
            }
            toast({ title: `Join/Leave Channel Updated`, description: `Successfully updated the Join/Leave channel.`, status: 'success' })
            setSuccess(true)
            setChannel(undefined);
        }).catch(() => {     
        });
    }
    if (!channels) return <></>;

    return <div className={"flex flex-col gap-3 w-fit mx-auto border-b p-4 border-gray-700"}>
    <span className={"secondary text-xl text-center flex flex-col"}>Set Join/Leave Channel</span>
    
    <span className={"flex items-center flex-col gap-2"}>
        <Channels serverID={serverID} value={channel} onChange={onJoinLeaveChannelChange}/>
        <button onClick={() => setJoinLeaveChannel()} className={`secondary text-md max-md:mx-auto ${success ? "bg-gradient-to-l from-green-400 to-green-600 text-black border-black" : "hover-gradient border-white"} hover:text-black hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><PiHandWavingLight/> Change Join/Leave Channel</>) }
        </button></span>
    </div>
}