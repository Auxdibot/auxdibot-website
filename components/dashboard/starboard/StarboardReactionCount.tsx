"use client";

import { BsCheckLg, BsStars } from "react-icons/bs";
import { useContext, useState } from 'react'; 
import { useQueryClient } from "react-query";
import DashboardActionContext from "@/context/DashboardActionContext";
import NumberBox from "@/components/input/NumberBox";
export default function StarboardReactionCount({ server }: { server: { serverID: string }}) {
    const [reactionCount, setReactionCount] = useState<number | string | undefined>(undefined);
    const [success, setSuccess] = useState(false);
    const actionContext = useContext(DashboardActionContext);
    const queryClient = useQueryClient();
    function onStarboardReactionCountChange(e: string | number) {
        if (success) setSuccess(false);

        setReactionCount(Number(e) || '');
    }
    function setStarboardReactionCount() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append("reaction_count", reactionCount ? reactionCount.toString() : "");
        fetch(`/api/v1/servers/${server.serverID}/starboard/reaction_count`, { method: "POST", body }).then(async (data) => {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            queryClient.invalidateQueries(["data_starboard", server.serverID])
            if (!json['error'])
                setSuccess(true);
            if (actionContext)
            json && json['error'] ? actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false }) : json ? actionContext.setAction({ status: `Successfully updated starboard reaction count to: ${reactionCount}`, success: true }) : "";
            setReactionCount(undefined);
            
        }).catch(() => {     
        });
    }

    return <div className={"flex flex-col gap-3 w-fit mx-auto p-4"}>
    <span className={"secondary text-xl text-center flex flex-col"}>Set Starboard Reaction Count</span>
    <span className={"flex flex-row max-xl:flex-col items-center gap-2"}>
        <NumberBox Icon={BsStars} max={100} value={Number(reactionCount) || 0} onChange={onStarboardReactionCountChange}/> 
        <button onClick={() => setStarboardReactionCount()} className={`secondary text-md max-md:mx-auto ${success ? "bg-gradient-to-l from-green-400 to-green-600 text-black border-black" : "hover-gradient border-white"} hover:text-black hover:border-black transition-all border rounded-xl p-1 flex flex-row gap-2 items-center`} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsStars/> Change Reaction Count</>) }
        </button></span>
    </div>
}