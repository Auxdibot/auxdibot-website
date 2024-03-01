"use client";

import { BsCheckLg, BsDownload } from "react-icons/bs";
import { useContext, useState } from 'react'; 
import { useQuery, useQueryClient } from "react-query";
import DashboardActionContext from "@/context/DashboardActionContext";
import Channels from "@/components/ui/channels";
export default function SuggestionsUpdateChannel({ server }: { server: { serverID: string }}) {
    let { data: channels } = useQuery(["data_channels", server.serverID], async () => await fetch(`/api/v1/servers/${server.serverID}/channels`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    const [channel, setChannel] = useState<string | null>("");
    const [success, setSuccess] = useState(false);
    const actionContext = useContext(DashboardActionContext);
    const queryClient = useQueryClient();
    function onSuggestionsUpdateChannelChange(e: { channel: string | null }) {
        if (success) setSuccess(false);

        setChannel(e.channel);
    }
    function setSuggestionsUpdateChannel() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append("suggestions_update_channel", channel || '');
        fetch(`/api/v1/servers/${server.serverID}/suggestions/updates_channel`, { method: "POST", body }).then(() => {
            queryClient.invalidateQueries(["data_suggestions", server.serverID])
            setSuccess(true)
            setChannel("");
            if (actionContext)
                actionContext.setAction({ status: `Successfully updated suggestions updates channel to: ${channels.find((c: { id: string }) => channel == c.id)?.name || "None. Suggestion updates will not be broadcast."}`, success: true });
        }).catch(() => {     
        });
    }
    if (!channels) return <></>;

    return <div className={"flex flex-col gap-3 w-fit mx-auto border-b p-4 border-gray-700"}>
    <span className={"secondary text-xl text-center flex flex-col"}>Set Suggestions Update Channel</span>
    
    <span className={"flex flex-row max-xl:flex-col items-center gap-2"}>
        <Channels serverID={server.serverID} value={channel} onChange={onSuggestionsUpdateChannelChange}/>
        <button onClick={() => setSuggestionsUpdateChannel()} className={`secondary text-md max-md:mx-auto ${success ? "bg-gradient-to-l from-green-400 to-green-600 text-black border-black" : "hover-gradient border-white"} hover:text-black hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsDownload/> Change Update Channel</>) }
        </button></span>
    </div>
}