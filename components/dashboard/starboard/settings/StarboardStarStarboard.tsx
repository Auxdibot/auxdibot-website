"use client"
import { useToast } from "@/components/ui/use-toast";
import { Stars } from "lucide-react";
import { useQueryClient } from "react-query";

export default function StarboardStarStarboard({ server }: { server: { data: { serverID: string, starboard_star: boolean } } }) {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    function handleClick() {
        fetch(`/api/v1/servers/${server.data.serverID}/starboard/starboard_star`, { method: "POST" }).then(async (data) => 
        {
            const json = await data.json().then((data) => data?.data).catch(() => undefined);
            toast({
                title: "Starboard Starring Updated",
                description: json ? json['starboard_star'] ? 'Users can star messages through the starboard.' : 'Users can no longer star messages through the starboard.' : 'An error occurred. Please try again.',
                status: !json || json['error'] ? "error" : "success"
            
            })
            queryClient.invalidateQueries(["data_starboard", server.data.serverID])

        }).catch(() => undefined);
    }
    return (<div className={"w-16 h-8 rounded-full relative px-1 border border-gray-700"} ><div onClick={() => handleClick()} className={`cursor-pointer absolute rounded-full top-1/2 bottom-1/2 -translate-y-1/2 h-7 w-7 transition-all bg-gradient-to-l flex items-center justify-center ${!server.data.starboard_star ? "from-red-500 to-red-700 -translate-x-0.5" : "translate-x-full from-green-500 to-green-700"}`}><span className={"text-white text-md opacity-60"}><Stars/></span></div></div>)
}