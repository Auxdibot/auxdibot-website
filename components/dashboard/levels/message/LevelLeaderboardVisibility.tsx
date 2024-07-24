"use client"
import { useToast } from "@/components/ui/use-toast";
import { BsTrophy } from "react-icons/bs";
import { useQueryClient } from "react-query";

export default function LevelLeaderboardVisibility({ server }: { server: { serverID: string, publicize_leaderboard: boolean } }) {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    function handleClick() {
        fetch(`/bot/v1/servers/${server.serverID}/levels/leaderboard_visibility`, { method: "POST" }).then(async (res) => 
        {
            const json = await res.json().catch(() => undefined);
            if (!json || json['error']) {
                toast({ title: "Failed to update leaderboard visibility", description: json['error'] ?? "An error occured", status: "error" })
                return
            }
            toast({ title: "Level Embed Updated", description: json['publicize_leaderboard'] ? "The leaderboard will now be publicly accessible on Auxdibot's website." : 
            "The leaderboard will no longer be publicly accessible on Auxdibot's website.", status: "success" })
            queryClient.invalidateQueries(["data_levels", server.serverID])
            
        }).catch(() => undefined);
    }
    return (<div className={"w-16 h-8 border rounded-full relative px-1 border-gray-700"} ><div onClick={() => handleClick()} className={`cursor-pointer absolute rounded-full top-1/2 bottom-1/2 -translate-y-1/2 h-7 w-7 transition-all bg-gradient-to-l flex items-center justify-center ${!server.publicize_leaderboard ? "from-red-500 to-red-700 -translate-x-0.5" : "translate-x-full from-green-500 to-green-700"}`}><span className={"text-white text-md opacity-60"}><BsTrophy/></span></div></div>)
}