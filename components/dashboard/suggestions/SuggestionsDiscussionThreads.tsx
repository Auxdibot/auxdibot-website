"use client"
import { useToast } from "@/components/ui/use-toast";

import { BsChatDots } from "react-icons/bs";
import { useQueryClient } from "react-query";

export default function SuggestionsDiscussionThreads({ server }: { server: {  serverID: string, suggestions_discussion_threads: boolean } }) {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    function handleClick() {
        fetch(`/bot/v1/servers/${server.serverID}/suggestions/discussion_threads`, { method: "POST" }).then(async (data) => 
        {
            const json = await data.json().then((data) => data?.data).catch(() => undefined);
            toast({
                title: "Discussion Threads Updated",
                description: json ? json['suggestions_discussion_threads'] ? 'Suggestions will now automatically be created with a discussion thread for users to discuss the suggestion in.' : 'Suggestions will no longer be created with a discussion thread.' : 'An error occurred. Please try again.',
                status: !json || json['error'] ? "error" : "success"
            
            })
            queryClient.invalidateQueries(["data_suggestions", server.serverID])

        }).catch(() => undefined);
    }
    return (<div className={"w-16 h-8 rounded-full relative px-1 border border-gray-700"} ><div onClick={() => handleClick()} className={`cursor-pointer absolute rounded-full top-1/2 bottom-1/2 -translate-y-1/2 h-7 w-7 transition-all bg-gradient-to-l flex items-center justify-center ${!server.suggestions_discussion_threads ? "from-red-500 to-red-700 -translate-x-0.5" : "translate-x-full from-green-500 to-green-700"}`}><span className={"text-white text-md opacity-60"}><BsChatDots/></span></div></div>)
}