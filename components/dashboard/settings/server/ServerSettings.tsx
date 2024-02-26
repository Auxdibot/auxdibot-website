"use client";

import DiscordGuild from "@/lib/types/DiscordGuild";
import { PremiumSlider } from "./PremiumSlider";
import { ServerGroups } from "./ServerGroups";

export default function ServerSettings({ server }: { server: DiscordGuild & { data: {serverID: string, disabled_modules: string[]} } }) {

    
    
    return <>
    <div className={"shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Server Settings</h2>
    <div className={"flex flex-col items-center gap-4 py-2 relative px-2"}>
    <ServerGroups/>
    <span className={"flex flex-row gap-2 items-center text-xl font-open-sans"}>
        <PremiumSlider/>
        Enable Premium
    </span>
    </div>
    </div>
    </>;
}

