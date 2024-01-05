"use client";

import StarboardChannel from "./StarboardChannel";
import { Suspense } from 'react';
import StarboardReaction from "./StarboardReaction";
import StarboardReactionCount from "./StarboardReactionCount";

export default function StarboardSettings({ server }: { server: { 
    data: {
        serverID: string, 
        starboard_channel: string,
        starboard_reaction: string,
        starboard_reaction_count: number,
    } 
}}) {

    
    return <>
    <div className={"bg-gray-800 shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Starboard Settings</h2>
    <div className={"flex flex-col gap-4"}>
    <Suspense fallback={null}>
        { server ? <>
            <StarboardChannel server={server.data}/>
            <StarboardReaction server={server.data}/>
            <StarboardReactionCount server={server.data} />
        </> : "" }

    </Suspense>
    
    </div>
    </div>
    </>;
}