"use client";

import MuteRole from "./MuteRole";

export default function ModerationSettings({ server }: { server: { id: string }}) {
    return <>
    <div className={"bg-gray-800 shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Moderation Settings</h2>
    { server ? <MuteRole server={server}/> : "" }
    </div>
    </>;
}