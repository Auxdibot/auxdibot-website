"use client"
import DashboardActionContext from "@/context/DashboardActionContext";
import { useContext } from "react";
import { BsChatDots, BsTrash } from "react-icons/bs";
import { useQueryClient } from "react-query";

export default function SuggestionsDiscussionThreads({ server }: { server: { data: { serverID: string, suggestions_discussion_threads: boolean } } }) {
    const queryClient = useQueryClient();
    const actionContext = useContext(DashboardActionContext);
    function handleClick() {
        fetch(`/api/v1/servers/${server.data.serverID}/suggestions/discussion_threads`, { method: "POST" }).then(async (data) => 
        {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            queryClient.invalidateQueries(["data_suggestions", server.data.serverID])
            if (actionContext)
                json && json['error'] ? actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false }) : json ? actionContext.setAction({ status: json['suggestions_discussion_threads'] ? 'Suggestions will now automatically be created with a discussion thread for users to discuss the suggestion in.' : 'Suggestions will no longer be created with a discussion thread.', success: true }) : ""
        }).catch(() => undefined);
    }
    return (<div className={"w-16 h-8 border rounded-full relative px-1 bg-gray-700"} ><div onClick={() => handleClick()} className={`cursor-pointer absolute rounded-full top-1/2 bottom-1/2 -translate-y-1/2 h-7 w-7 transition-all bg-gradient-to-l flex items-center justify-center ${!server.data.suggestions_discussion_threads ? "from-red-500 to-red-700 -translate-x-0.5" : "translate-x-full from-green-500 to-green-700"}`}><span className={"text-white text-md opacity-60"}><BsChatDots/></span></div></div>)
}