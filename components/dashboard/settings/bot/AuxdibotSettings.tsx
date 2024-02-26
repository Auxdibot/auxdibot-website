"use client";

import DiscordGuild from "@/lib/types/DiscordGuild";
import NicknameChange from "./NicknameChange";
import { ResetDialog } from "./ResetDialog";

export default function AuxdibotSettings({ server }: { server: DiscordGuild & { data: {serverID: string, disabled_modules: string[]} } }) {

    
    
    return <>
    <div className={"shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Bot Settings</h2>
    <div className={"flex flex-col gap-4 py-2 relative"}>
    <NicknameChange server={server}/>
    <ResetDialog serverID={server?.id} />
    </div>
    </div>
    </>;
}

