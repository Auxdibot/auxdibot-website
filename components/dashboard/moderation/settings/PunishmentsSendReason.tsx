"use client"
import DashboardActionContext from "@/context/DashboardActionContext";
import { useContext } from "react";
import { BsChatDots } from "react-icons/bs";
import { useQueryClient } from "react-query";

export default function PunishmentsSendReason({ server }: { server: { serverID: string, punishment_send_reason: boolean } }) {
    const queryClient = useQueryClient();
    const actionContext = useContext(DashboardActionContext);
    function handleClick() {
        fetch(`/api/v1/servers/${server.serverID}/moderation/send_reason`, { method: "POST" }).then(async (data) => 
        {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            queryClient.invalidateQueries(["data_moderation", server.serverID])
            if (actionContext)
                json && json['error'] ? actionContext
            .setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false }) : json 
            ? actionContext.setAction({ status: json['data']?.punishment_send_reason ? 
            'Auxdibot will send the punishment reason when notifying a member of their punishment.' : 
            'Auxdibot will no longer send the punishment reason when notifying a member of their punishment', success: true }) : ""
        }).catch(() => undefined);
    }
    return (<div className={"w-16 h-8 border rounded-full relative px-1 bg-gray-700"} ><div onClick={() => handleClick()} className={`cursor-pointer absolute rounded-full top-1/2 bottom-1/2 -translate-y-1/2 h-7 w-7 transition-all bg-gradient-to-l flex items-center justify-center ${!server.punishment_send_reason ? "from-red-500 to-red-700 -translate-x-0.5" : "translate-x-full from-green-500 to-green-700"}`}><span className={"text-white text-md opacity-60"}><BsChatDots/></span></div></div>)
}