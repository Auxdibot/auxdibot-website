"use client";

import Link from "next/link";
import { Suspense, useState } from 'react';
import { BsCheckLg, BsPlus } from "react-icons/bs";
import { useQuery, useQueryClient } from "react-query";
import { LogCombobox } from "./combobox/LogCombobox";
import { Button } from "@/components/ui/button/button";
import { useToast } from "@/components/ui/use-toast";
import { LogFilter } from "./LogFilter";

export default function FilteredLogs({ server }: { server: { 
    serverID: string, 
    filtered_logs: string[],    
}}) {
    const { data: actions } = useQuery<string[] | undefined>(["data_actions", server.serverID], async () => await fetch(`/bot/v1/servers/${server.serverID}/log/actions`).then(async (data) => await data.json().then((data) => data?.data?.log_actions).catch(() => undefined)).catch(() => undefined));

    const [success, setSuccess] = useState(false);
    const [filter, setFiltered] = useState("")
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function addFilteredLog() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append("log", filter);
        fetch(`/bot/v1/servers/${server.serverID}/log/filter`, { method: "POST", body }).then(async (data) => {
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
    <LogCombobox actions={actions} onChange={(str) => setFiltered(str)} value={filter} />    
    </div>
    <Button onClick={() => addFilteredLog()} className={"flex gap-1 my-2 items-center w-fit mx-auto"} variant={"outline"} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsPlus/> Add Filtered Log</>) }
        </Button>
    </section>;
}