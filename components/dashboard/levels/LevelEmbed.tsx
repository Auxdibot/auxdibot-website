"use client"
import DashboardActionContext from "@/context/DashboardActionContext";
import { useContext } from "react";
import { BsChevronBarUp } from "react-icons/bs";
import { useQueryClient } from "react-query";

export default function LevelEmbed({ server }: { server: { serverID: string, level_embed: boolean } }) {
    const queryClient = useQueryClient();
    const actionContext = useContext(DashboardActionContext);
    function handleClick() {
        fetch(`/api/v1/servers/${server.serverID}/levels/embed`, { method: "POST" }).then(async (data) => 
        {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            queryClient.invalidateQueries(["data_levels", server.serverID])
            if (actionContext)
                json && json['error'] ? actionContext
            .setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false }) : json 
            ? actionContext.setAction({ status: json['level_embed'] ? 
            'Auxdibot will post a level up embed when a member levels up.' : 
            'Auxdibot will no longer post a level up embed when a member levels up.', success: true }) : ""
        }).catch(() => undefined);
    }
    return (<div className={"w-16 h-8 border rounded-full relative px-1 bg-gray-700"} ><div onClick={() => handleClick()} className={`cursor-pointer absolute rounded-full top-1/2 bottom-1/2 -translate-y-1/2 h-7 w-7 transition-all bg-gradient-to-l flex items-center justify-center ${!server.level_embed ? "from-red-500 to-red-700 -translate-x-0.5" : "translate-x-full from-green-500 to-green-700"}`}><span className={"text-white text-md opacity-60"}><BsChevronBarUp/></span></div></div>)
}