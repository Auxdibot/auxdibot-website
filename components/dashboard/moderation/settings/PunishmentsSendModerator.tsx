"use client"
import { useToast } from "@/components/ui/use-toast";
import { BsPerson } from "react-icons/bs";
import { useQueryClient } from "react-query";

export default function PunishmentsSendModerator({ server }: { server: { serverID: string, punishment_send_moderator: boolean } }) {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    function handleClick() {
        fetch(`/bot/v1/servers/${server.serverID}/moderation/send_moderator`, { method: "POST" }).then(async (data) => 
        {
            const json = await data.json().catch(() => undefined);
            if (!json || json['error']) {
                toast({ title: "Failed to update punishments", description: json['error'] ?? "An error occured", status: "error" })
                return;
            }
            toast({
                title: "Punishment Settings Updated",
                description: json['data']?.punishment_send_moderator ? 
                'Auxdibot will send the punishment to the moderator when a punishment is issued.' : 
                'Auxdibot will no longer send the punishment to the moderator when a punishment is issued.', 
                status: "success",
            
            })
            queryClient.invalidateQueries(["data_moderation", server.serverID])
        }).catch(() => undefined);
    }
    return (<div className={"w-16 h-8 border border-gray-700 rounded-full relative px-1"} ><div onClick={() => handleClick()} className={`cursor-pointer absolute rounded-full top-1/2 bottom-1/2 -translate-y-1/2 h-7 w-7 transition-all bg-gradient-to-l flex items-center justify-center ${!server.punishment_send_moderator ? "from-red-500 to-red-700 -translate-x-0.5" : "translate-x-full from-green-500 to-green-700"}`}><span className={"text-white text-md opacity-60"}><BsPerson/></span></div></div>)
}