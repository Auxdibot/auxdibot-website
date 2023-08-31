"use client"
import DashboardActionContext from "@/context/DashboardActionContext";
import { useContext } from "react";
import { BsTrash } from "react-icons/bs";
import { useQueryClient } from "react-query";

export default function SuggestionsAutoDelete({ server }: { server: { data: { serverID: string, suggestions_auto_delete: boolean } } }) {
    const queryClient = useQueryClient();
    const actionContext = useContext(DashboardActionContext);
    function handleClick() {
        fetch(`/api/v1/servers/${server.data.serverID}/suggestions/auto_delete`, { method: "POST" }).then(async (data) => 
        {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            queryClient.invalidateQueries(["data_suggestions", server.data.serverID])
            if (actionContext)
                json && json['error'] ? actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false }) : json ? actionContext.setAction({ status: json['suggestions_auto_delete'] ? 'Suggestions will now be automatically deleted after a response is sent.' : 'Suggestions will no longer be automatically deleted after a response is sent.', success: true }) : ""
        }).catch(() => undefined);
    }
    return (<div className={"w-16 h-8 border rounded-full relative px-1 bg-gray-700"} ><div onClick={() => handleClick()} className={`cursor-pointer absolute rounded-full top-1/2 bottom-1/2 -translate-y-1/2 h-7 w-7 transition-all bg-gradient-to-l flex items-center justify-center ${!server.data.suggestions_auto_delete ? "from-red-500 to-red-700 -translate-x-0.5" : "translate-x-full from-green-500 to-green-700"}`}><span className={"text-white text-md opacity-60"}><BsTrash/></span></div></div>)
}