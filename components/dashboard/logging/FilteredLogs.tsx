"use client";

import Button from "@/components/Button";
import DashboardActionContext from "@/context/DashboardActionContext";
import DiscordGuild from "@/lib/types/DiscordGuild";
import Link from "next/link";
import { Suspense, useContext, useState } from 'react';
import { BsBook, BsCheckLg, BsPlus, BsX } from "react-icons/bs";
import { useQueryClient } from "react-query";

export function LogFilter({ filtered, index, serverID }: { filtered: string, index: number, serverID: string }) {
    const actionContext = useContext(DashboardActionContext);
    const queryClient = useQueryClient();
    function deleteReaction() {
        if (!serverID) return;
        const body = new URLSearchParams();
        body.append("log", filtered);
        fetch(`/api/v1/servers/${serverID}/logs/filter`, { method: "POST", body }).then(async (data) => {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            queryClient.invalidateQueries(["data_logging", serverID])
            if (actionContext)
            json && json['error'] ? actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false }) : json ? actionContext.setAction({ status: `Removed "${filtered}" from the filtered log actions.`, success: true }) : "";
            
        }).catch(() => {     
        });
    }
    return (<span className={"flex flex-row gap-2 text-2xl items-center"}>{filtered} <span className={"border text-white rounded-2xl w-fit h-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-lg cursor-pointer"} onClick={() => deleteReaction()}><BsX/></span></span>);
}

export default function FilteredLogs({ server }: { server: { 
    serverID: string, 
    filtered_logs: string[],    
}}) {
    const [success, setSuccess] = useState(false);
    const [reaction, setReaction] = useState("");
    const actionContext = useContext(DashboardActionContext);
    const queryClient = useQueryClient();
    function addFilteredLog() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append("log", reaction);
        fetch(`/api/v1/servers/${server.serverID}/log/filter`, { method: "POST", body }).then(async (data) => {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            queryClient.invalidateQueries(["data_logging", server.serverID])
            
            if (!json['error'])
                setSuccess(true);
            if (actionContext)
            json && json['error'] ? actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false }) : json ? actionContext.setAction({ status: `Added "${reaction}" as a filtered log.`, success: true }) : "";
            setReaction("");
            
        }).catch(() => {     
        });
    }
    return <section className={"flex flex-col py-2"}>
    <h3 className={"secondary text-2xl text-center"}>Filter Log Actions</h3>
    <ul className={"flex flex-col gap-4 my-4 items-center"}>
    <Suspense fallback={null}>
        {server?.filtered_logs?.map((i, index) => <li key={index}><LogFilter filtered={i} index={index} serverID={server.serverID} /></li>)}
    </Suspense>
    
    <input type="text" value={reaction} onChange={(e) => setReaction(e.currentTarget.value) } placeholder="Log Type (See Log Docs)" className={"placeholder:text-gray-500 px-1 rounded-md font-roboto text-md w-fit mx-auto"}/>
    <button onClick={() => addFilteredLog()} className={`secondary text-md max-md:mx-auto ${success ? "bg-gradient-to-l from-green-400 to-green-600 text-black border-black" : "hover-gradient border-white"} hover:text-black hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsPlus/> Add Filtered Log</>) }
        </button>
    </ul>
    </section>;
}