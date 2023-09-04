"use client";

import { BsCheckLg, BsQuestionCircle } from "react-icons/bs";
import { useContext, useState } from 'react'; 
import { useQuery, useQueryClient } from "react-query";
import DashboardActionContext from "@/context/DashboardActionContext";
export default function SuggestionsChannel({ server }: { server: { id: string }}) {
    let { data: channels } = useQuery(["data_channels", server.id], async () => await fetch(`/api/v1/servers/${server.id}/channels`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    const [channel, setChannel] = useState("");
    const [success, setSuccess] = useState(false);
    const actionContext = useContext(DashboardActionContext);
    const queryClient = useQueryClient();
    function onSuggestionsChannelChange(e: React.ChangeEvent<HTMLSelectElement>) {
        if (success) setSuccess(false);
        if (e.currentTarget.value == "null") return;

        setChannel(e.currentTarget.value);
    }
    function setSuggestionsChannel() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append("suggestions_channel", channel);
        fetch(`/api/v1/servers/${server.id}/suggestions/channel`, { method: "POST", body }).then(() => {
            queryClient.invalidateQueries(["data_suggestions", server.id])
            setSuccess(true)
            setChannel("");
            if (actionContext)
                actionContext.setAction({ status: `Successfully updated suggestions channel to: ${channels.find((c: { id: string }) => channel == c.id)?.name || "None. Suggestions are disabled."}`, success: true });
        }).catch(() => {     
        });
    }
    if (!channels) return <></>;

    return <div className={"flex flex-col gap-3 w-fit mx-auto border-b p-4 border-gray-700"}>
    <span className={"secondary text-xl text-center flex flex-col"}>Set Suggestions Channel</span>
    
    <span className={"flex flex-row max-xl:flex-col items-center gap-2"}>
        <select onChange={(e) => onSuggestionsChannelChange(e)} value={channel} className={"font-roboto w-fit mx-auto rounded-md p-1 text-md"}>
            <option value={"null"}>Select a channel...</option>
            {channels.map((i: { id: string, name: string }) => <option key={i.id} value={i.id}>{i.name}</option>)}
        </select> 
        <button onClick={() => setSuggestionsChannel()} className={`secondary text-md max-md:mx-auto ${success ? "bg-gradient-to-l from-green-400 to-green-600 text-black border-black" : "hover-gradient border-white"} hover:text-black hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsQuestionCircle/> Change Channel</>) }
        </button></span>
    </div>
}