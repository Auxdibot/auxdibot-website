"use client";

import { BsCheck, BsCheckLg, BsPersonBadge } from "react-icons/bs";
import { useState } from 'react'; 
import DiscordGuild from "@/lib/types/DiscordGuild";
import { useQuery, useQueryClient } from "react-query";
export default function LogChannel({ server }: { server: { id: string, data: {log_channel: string} }}) {
    let { data: channels } = useQuery(["data_channels", server.id], async () => await fetch(`/api/v1/servers/${server.id}/channels`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    const [channel, setChannel] = useState("");
    const [success, setSuccess] = useState(false);
    const queryClient = useQueryClient();
    function onLogChannelChange(e: React.ChangeEvent<HTMLSelectElement>) {
        if (success) setSuccess(false);
        if (e.currentTarget.value == "null") return;

        setChannel(e.currentTarget.value);
    }
    function setLogChannel() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append("new_log_channel", channel);
        fetch(`/api/v1/servers/${server.id}/log_channel`, { method: "POST", body }).then(() => {
            queryClient.invalidateQueries(["data_logging", server.id])
            setSuccess(true)
            setChannel("");
        }).catch(() => {});
    }
    if (!channels) return <></>;

    return <div className={"flex flex-col gap-3 w-fit mx-auto border-b p-4 border-gray-700"}>
    <span className={"secondary text-xl text-center flex flex-col"}>Set Log Channel</span>
    
    <span className={"flex flex-row max-md:flex-col gap-2"}>
        <select onChange={(e) => onLogChannelChange(e)} value={channel} className={"font-roboto w-fit mx-auto rounded-md p-1 text-md"}>
            <option value={"null"}>Select a channel...</option>
            {channels.map((i: { id: string, name: string }) => <option key={i.id} value={i.id}>{i.name}</option>)}
        </select> 
        <button onClick={() => setLogChannel()} className={`secondary text-md max-md:mx-auto ${success ? "bg-gradient-to-l from-green-400 to-green-600 text-black border-black" : "hover-gradient border-white"} hover:text-black hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsPersonBadge/> Change Log Channel</>) }
        </button></span>
    </div>
}