"use client";

import SuggestionsChannel from "./SuggestionsChannel";
import { Suspense } from 'react';
import SuggestionsUpdateChannel from "./SuggestionsUpdateChannel";
import SuggestionsAutoDelete from "./SuggestionsAutoDelete";
import SuggestionsDiscussionThreads from "./SuggestionsDiscussionThreads";
import { Separator } from "@/components/ui/separator";

export default function SuggestionsSettings({ server }: { server: { 
    serverID: string, 
    suggestions_channel: string,
    suggestions_updates_channel: string,
    suggestions_reactions: string[],
    suggestions_auto_delete: boolean,
    suggestions_discussion_threads: boolean,
}}) {

    return <>
    <div className={"shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Suggestions Settings</h2>
    <div className={"flex flex-col gap-4"}>
    <Suspense fallback={null}>
        { server ? <>
            <SuggestionsChannel server={server}/>
            <Separator className={'my-4 max-w-xs mx-auto'}/>
            <SuggestionsUpdateChannel server={server}/>
            <div className={"flex flex-row max-xl:flex-col xl:justify-between w-fit mx-auto p-4 gap-10 text"}>
            <span className={"flex flex-row gap-2 items-center text-xl"}><SuggestionsAutoDelete server={server} /> Auto Delete</span>
            <span className={"flex flex-row gap-2 items-center text-xl"}><SuggestionsDiscussionThreads server={server} /> Discussion Threads</span>
            </div>
            
        </> : "" }

    </Suspense>
    
    </div>
    </div>
    </>;
}