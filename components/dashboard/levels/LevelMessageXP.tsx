"use client";

import { BsAward, BsCheckLg, BsPlusLg } from "react-icons/bs";
import { useContext, useState } from 'react'; 
import { useQueryClient } from "react-query";
import DashboardActionContext from "@/context/DashboardActionContext";
export default function LevelMessageXP({ server }: { server: { id: string }}) {
    const [messageXP, setMessageXP] = useState("");
    const [success, setSuccess] = useState(false);
    const actionContext = useContext(DashboardActionContext);
    const queryClient = useQueryClient();
    function onMessageXPChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (success) setSuccess(false);
        if (e.currentTarget.value == "null") return;

        setMessageXP(e.currentTarget.value);
    }
    function setMessageXPGiven() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append("message_xp", messageXP);
        fetch(`/api/v1/servers/${server.id}/levels/message_xp`, { method: "POST", body }).then(async (data) => {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            queryClient.invalidateQueries(["data_levels", server.id])
            if (!json['error'])
                setSuccess(true);
            if (actionContext)
            json && json['error'] ? actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false }) : json ? actionContext.setAction({ status: `Successfully updated starboard reaction count to: ${messageXP}`, success: true }) : "";
            setMessageXP("");
            
        }).catch(() => {     
        });
    }

    return <div className={"flex flex-col gap-3 w-fit mx-auto p-4 border-b border-gray-700"}>
    <span className={"secondary text-xl text-center flex flex-col"}>Set Message XP</span>
    <span className={"flex flex-row max-md:flex-col gap-2"}>
        <input className={"rounded-md font-roboto text-center text-lg"} type="number" onChange={(e) => onMessageXPChange(e)} value={messageXP} />
        <button onClick={() => setMessageXPGiven()} className={`secondary text-md max-md:mx-auto ${success ? "bg-gradient-to-l from-green-400 to-green-600 text-black border-black" : "hover-gradient border-white"} hover:text-black hover:border-black transition-all border rounded-xl p-1 flex flex-row gap-2 items-center`} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsAward/> Change Message XP</>) }
        </button></span>
    </div>
}