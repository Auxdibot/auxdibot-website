"use client";

import { BsAward, BsCheckLg } from "react-icons/bs";
import { useContext, useState } from 'react'; 
import { useQueryClient } from "react-query";
import DashboardActionContext from "@/context/DashboardActionContext";
import NumberBox from "@/components/input/NumberBox";
export default function LevelMessageXP({ server }: { server: { serverID: string }}) {
    const [messageXP, setMessageXP] = useState<number | string | undefined>("");
    const [success, setSuccess] = useState(false);
    const actionContext = useContext(DashboardActionContext);
    const queryClient = useQueryClient();
    function onMessageXPChange(e: string | number) {
        if (success) setSuccess(false);

        setMessageXP(Number(e) || '');
    }
    function setMessageXPGiven() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append("message_xp", messageXP ? messageXP.toString() : '');
        fetch(`/api/v1/servers/${server.serverID}/levels/message_xp`, { method: "POST", body }).then(async (data) => {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            queryClient.invalidateQueries(["data_levels", server.serverID])
            if (!json['error'])
                setSuccess(true);
            if (actionContext)
            json && json['error'] ? actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false }) : json ? actionContext.setAction({ status: `Successfully updated server Message XP to: ${messageXP}`, success: true }) : "";
            setMessageXP("");
            
        }).catch(() => {     
        });
    }

    return <div className={"flex flex-col gap-3 w-fit mx-auto p-4 border-b border-gray-700"}>
    <span className={"secondary text-xl text-center flex flex-col"}>Set Message XP</span>
    <span className={"flex flex-row max-xl:flex-col items-center gap-2"}>
        <NumberBox Icon={BsAward} max={2000} value={Number(messageXP) || 0} onChange={onMessageXPChange}/> 
        <button onClick={() => setMessageXPGiven()} className={`secondary text-md max-md:mx-auto ${success ? "bg-gradient-to-l from-green-400 to-green-600 text-black border-black" : "hover-gradient border-white"} hover:text-black hover:border-black transition-all border rounded-xl p-1 flex flex-row gap-2 items-center`} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsAward/> Change Message XP</>) }
        </button></span>
    </div>
}