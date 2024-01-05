"use client";

import TextBox from "@/components/input/TextBox";
import DashboardActionContext from "@/context/DashboardActionContext";
import Link from "next/link";
import { Suspense, useContext, useState } from 'react';
import { BsCheckLg, BsFilter, BsPlus, BsX } from "react-icons/bs";
import { useQueryClient } from "react-query";

export function LogFilter({ filtered, serverID }: { filtered: string, index: number, serverID: string }) {
    const actionContext = useContext(DashboardActionContext);
    const queryClient = useQueryClient();
    function deleteReaction() {
        if (!serverID) return;
        const body = new URLSearchParams();
        body.append("log", filtered);
        fetch(`/api/v1/servers/${serverID}/log/filter`, { method: "POST", body }).then(async (data) => {
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
    const [filter, setFiltered] = useState("");
    const actionContext = useContext(DashboardActionContext);
    const queryClient = useQueryClient();
    function addFilteredLog() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append("log", filter);
        fetch(`/api/v1/servers/${server.serverID}/log/filter`, { method: "POST", body }).then(async (data) => {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            queryClient.invalidateQueries(["data_logging", server.serverID])
            
            if (!json['error'])
                setSuccess(true);
            if (actionContext)
            json && json['error'] ? actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false }) : json ? actionContext.setAction({ status: `Added "${filter}" as a filtered log.`, success: true }) : "";
            setFiltered("");
            
        }).catch(() => {     
        });
    }
    return <section className={"flex flex-col py-2"}>
    <h3 className={"secondary text-2xl text-center"}>Filter Log Actions</h3>
    <Link href={'/docs/logging'} className={"text-center text-gray-400 font-open-sans h-fit"}>Click me to view all log actions that Auxdibot uses.</Link>
    <ul className={"flex flex-col gap-4 my-4 items-center font-open-sans"}>
    <Suspense fallback={null}>
        {server?.filtered_logs?.map((i, index) => <li key={index}><LogFilter filtered={i} index={index} serverID={server.serverID} /></li>)}
    </Suspense>
    
    <TextBox Icon={BsFilter} value={filter} onChange={(e) => setFiltered(e.currentTarget.value) }  className={"placeholder:text-gray-500 px-1 rounded-md font-roboto text-md w-fit mx-auto"}/>
    <button onClick={() => addFilteredLog()} className={`secondary text-md max-md:mx-auto ${success ? "bg-gradient-to-l from-green-400 to-green-600 text-black border-black" : "hover-gradient border-white"} hover:text-black hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsPlus/> Add Filtered Log</>) }
        </button>
    </ul>
    </section>;
}