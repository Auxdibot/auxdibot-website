"use client";

import { BsCheckLg, BsMegaphone } from "react-icons/bs";
import { useContext, useState } from 'react'; 
import DashboardActionContext from "@/context/DashboardActionContext";
import Channels from "@/components/input/Channels";
import { useQuery } from "react-query";
export default function ReportsChannel({ server }: { server: { readonly serverID: string, readonly reports_channel: string }}) {
    let { data: channels } = useQuery(["data_channels", server.serverID], async () => await fetch(`/api/v1/servers/${server.serverID}/channels`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    const [channel, setChannel] = useState<string | null>(server.reports_channel);
    const actionContext = useContext(DashboardActionContext);
    const [success, setSuccess] = useState(false);
    function onReportsChannelChange(e: { channel: string | null }) {
        if (success) setSuccess(false);

        setChannel(e.channel || null);
    }
    function setReportsChannel() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append("reports_channel", channel || '');
        fetch(`/api/v1/servers/${server.serverID}/moderation/reports/channel`, { method: "POST", body }).then(async (data) => {
            
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            if (json && !json['error']) {
                setSuccess(true)
                if (actionContext)
                    actionContext.setAction({ status: `Successfully updated reports channel to:  ${channel ? channels?.find((i: { id: string }) => i.id == channel)?.name :  "None. Reports are now disabled on this server."}`, success: true });
            } else {
                setChannel('');
                if (actionContext)
                    actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false });
            }
    
        }).catch(() => {});
    }

    return <div className={"flex flex-col gap-3 w-fit mx-auto border-b p-4 border-gray-700"}>
    <h3 className={"text-2xl font-open-sans text-gray-300 text-center flex flex-col"}>Set Reports Channel</h3>
    
    <span className={"flex flex-row max-md:flex-col gap-2"}>
        <span className={"mx-auto"}><Channels serverID={server.serverID} onChange={(e) => onReportsChannelChange(e)} value={channel}/></span>
        <button onClick={() => setReportsChannel()} className={`secondary text-md max-md:mx-auto ${success ? "bg-gradient-to-l from-green-400 to-green-600 text-black border-black" : "hover-gradient border-white"} hover:text-black hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsMegaphone/> Change Reports Channel</>) }
        </button></span>
    </div>
}