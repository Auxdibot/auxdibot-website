"use client";



import DashboardActionContext from "@/context/DashboardActionContext";

import Link from "next/link";
import { Suspense, useContext, useState } from 'react';
import { BsCheckLg, BsPlus, BsX } from "react-icons/bs";
import { useQuery, useQueryClient } from "react-query";
import { LogCombobox } from "./combobox/LogCombobox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

function LogFilter({ filtered, serverID }: { filtered: string, index: number, serverID: string }) {

    const { toast } = useToast();
    const queryClient = useQueryClient();
    function deleteReaction() {
        if (!serverID) return;
        const body = new URLSearchParams();
        body.append("log", filtered);
        fetch(`/api/v1/servers/${serverID}/log/filter`, { method: "POST", body }).then(async (data) => {
            const json = await data.json().catch(() => undefined);
            if (!json || json['error']) {
                toast({ title: "Failed to remove filtered log", description: json['error'] ? json['error'] : 'An error occured.', status: "error" });
                return;
            }
            queryClient.invalidateQueries(["data_logging", serverID])
            toast({ title: "Filtered Log Removed", description: `Successfully removed "${filtered.split('_').map((i) => i[0] + i.slice(1).toLowerCase()).join(' ')}" as a filtered log.`, status: "success" })
        }).catch(() => {     
        });
    }
    return (<span className={"flex flex-row w-full justify-center gap-2 text-base items-center"}>{filtered.split('_').map((i) => i[0] + i.slice(1).toLowerCase()).join(' ')} <span className={"border text-white rounded-2xl w-fit h-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-sm cursor-pointer"} onClick={() => deleteReaction()}><BsX/></span></span>);
}

export default function FilteredLogs({ server }: { server: { 
    serverID: string, 
    filtered_logs: string[],    
}}) {
    const { data: actions } = useQuery<string[] | undefined>(["data_actions", server.serverID], async () => await fetch(`/api/v1/servers/${server.serverID}/log/actions`).then(async (data) => await data.json().then((data) => data?.data?.log_actions).catch(() => undefined)).catch(() => undefined));

    const [success, setSuccess] = useState(false);
    const [filter, setFiltered] = useState("")
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function addFilteredLog() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append("log", filter);
        fetch(`/api/v1/servers/${server.serverID}/log/filter`, { method: "POST", body }).then(async (data) => {
            const json = await data.json().catch(undefined);
            if (!json || json['error']) {
                toast({ title: "Failed to add filtered log", description: json['error'] ? json['error'] : 'An error occured.', status: "error" });
                return;
            }
            toast({ title: "Filtered Log Added", description: `Successfully ${json.data ? "added" : "removed"} "${filter.split('_').map((i) => i[0] + i.slice(1).toLowerCase()).join(' ')}" as a filtered log.`, status: "success" })
            queryClient.invalidateQueries(["data_actions", server.serverID]);
            queryClient.invalidateQueries(["data_logging", server.serverID]);
            setSuccess(true);
            setFiltered("");
            
        }).catch(() => {     
        });
    }
    return <section className={"flex flex-col py-2"}>
    <h3 className={"secondary text-2xl text-center"}>Filter Log Actions</h3>
    <Link href={'/docs/logging'} className={"text-center text-gray-400 font-open-sans h-fit"}>Click me to view all log actions that Auxdibot uses.</Link>
    <ul className={"grid max-md:grid-cols-1 max-lg:grid-cols-2 grid-cols-3 max-md:grid-cols-flow-dense grid-rows-flow-dense px-2 gap-4 my-4 font-open-sans"}>
    <Suspense fallback={null}>
        {server?.filtered_logs?.map((i, index) => <li key={index}><LogFilter filtered={i} index={index} serverID={server.serverID} /></li>)}
    </Suspense>
    
    </ul>
    <div className={"flex flex-col gap-2 w-fit mx-auto"}>
    <LogCombobox actions={actions} onChange={(str) => {
        console.log(str); setFiltered(str)}} value={filter} />    
    </div>
    <Button onClick={() => addFilteredLog()} className={"flex gap-1 my-2 items-center w-fit mx-auto"} variant={"outline"} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsPlus/> Add Filtered Log</>) }
        </Button>
    </section>;
}