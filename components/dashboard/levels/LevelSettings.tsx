"use client";

import DiscordGuild from "@/lib/types/DiscordGuild";
import { Suspense } from 'react';
import LevelMessageXP from "./LevelMessageXP";
import LevelEmbed from "./LevelEmbed";
import LevelChannel from "./LevelChannel";

export default function LevelSettings({ server }: { server: { 
        serverID: string, 
        level_channel: string,
        level_embed: boolean,
        message_xp: number,
        level_rewards: { level: number, roleID: string }[], 
}}) {

    
    return <>
    <div className={"bg-gray-800 shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Levels Settings</h2>
    <div className={"flex flex-col gap-4"}>
    <Suspense fallback={null}>
        { server ? <>
            <LevelChannel server={server}/>
            <LevelMessageXP server={server}/>
            <div className={"flex flex-row max-md:flex-col md:justify-between w-fit mx-auto p-4 gap-10 text"}>
            <span className={"flex flex-row gap-2 items-center text-xl"}><LevelEmbed server={server} /> Level Embed</span>
            </div>
            
        </> : "" }

    </Suspense>
    
    </div>
    </div>
    </>;
}