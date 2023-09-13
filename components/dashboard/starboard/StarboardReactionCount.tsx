"use client";

import { BsCheckLg, BsPlusLg } from "react-icons/bs";
import { useContext, useState } from 'react'; 
import { useQueryClient } from "react-query";
import DashboardActionContext from "@/context/DashboardActionContext";
export default function StarboardReactionCount({ server }: { server: { serverID: string }}) {
    const [reactionCount, setReactionCount] = useState("");
    const [success, setSuccess] = useState(false);
    const actionContext = useContext(DashboardActionContext);
    const queryClient = useQueryClient();
    function onStarboardReactionCountChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (success) setSuccess(false);
        if (e.currentTarget.value == "null") return;

        setReactionCount(e.currentTarget.value);
    }
    function setStarboardReactionCount() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append("reaction_count", reactionCount);
        fetch(`/api/v1/servers/${server.serverID}/starboard/reaction_count`, { method: "POST", body }).then(async (data) => {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            queryClient.invalidateQueries(["data_starboard", server.serverID])
            if (!json['error'])
                setSuccess(true);
            if (actionContext)
            json && json['error'] ? actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false }) : json ? actionContext.setAction({ status: `Successfully updated starboard reaction count to: ${reactionCount}`, success: true }) : "";
            setReactionCount("");
            
        }).catch(() => {     
        });
    }

    return <div className={"flex flex-col gap-3 w-fit mx-auto p-4"}>
    <span className={"secondary text-xl text-center flex flex-col"}>Set Starboard Reaction Count</span>
    <span className={"flex flex-row max-xl:flex-col items-center gap-2"}>
        <input className={"rounded-md font-roboto text-center text-lg"} type="number" onChange={(e) => onStarboardReactionCountChange(e)} value={reactionCount} />
        <button onClick={() => setStarboardReactionCount()} className={`secondary text-md max-md:mx-auto ${success ? "bg-gradient-to-l from-green-400 to-green-600 text-black border-black" : "hover-gradient border-white"} hover:text-black hover:border-black transition-all border rounded-xl p-1 flex flex-row gap-2 items-center`} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsPlusLg/> Change Reaction Count</>) }
        </button></span>
    </div>
}