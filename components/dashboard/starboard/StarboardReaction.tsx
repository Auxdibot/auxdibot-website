"use client";

import { BsCheckLg, BsStar, BsStarFill, BsStars } from "react-icons/bs";
import { useContext, useState } from 'react'; 
import { useQueryClient } from "react-query";
import DashboardActionContext from "@/context/DashboardActionContext";
import TextBox from "@/components/input/TextBox";
export default function StarboardReaction({ server }: { server: { serverID: string }}) {
    const [reaction, setReaction] = useState("");
    const [success, setSuccess] = useState(false);
    const actionContext = useContext(DashboardActionContext);
    const queryClient = useQueryClient();
    function onStarboardReactionChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (success) setSuccess(false);
        if (e.currentTarget.value == "null") return;

        setReaction(e.currentTarget.value);
    }
    function setStarboardReaction() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append("starboard_reaction", reaction);
        fetch(`/api/v1/servers/${server.serverID}/starboard/reaction`, { method: "POST", body }).then(async (data) => {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            queryClient.invalidateQueries(["data_starboard", server.serverID])
            
            if (!json['error'])
                setSuccess(true);
            if (actionContext)
            json && json['error'] ? actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false }) : json ? actionContext.setAction({ status: `Successfully updated starboard reaction to: "${reaction}"`, success: true }) : "";
            setReaction("");
            
        }).catch(() => {     
        });
    }

    return <div className={"flex flex-col gap-3 w-fit mx-auto border-b p-4 border-gray-700"}>
    <span className={"secondary text-xl text-center flex flex-col"}>Set Starboard Reaction</span>
    <span className={"text-gray-400 text-center mx-auto italic font-open-sans"}>Must be a valid emoji or Discord emoji ID.</span>
    <span className={"flex flex-row max-xl:flex-col items-center gap-2"}>
    <TextBox Icon={BsStarFill} value={reaction} onChange={onStarboardReactionChange}/> 
        <button onClick={() => setStarboardReaction()} className={`secondary text-md max-md:mx-auto ${success ? "bg-gradient-to-l from-green-400 to-green-600 text-black border-black" : "hover-gradient border-white"} hover:text-black hover:border-black transition-all border rounded-xl p-1 flex flex-row gap-2 items-center`} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsStarFill/> Change Reaction</>) }
        </button></span>
    </div>
}