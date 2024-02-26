"use client";

import LogChannel from "./LogChannel";
import FilteredLogs from "./FilteredLogs";

export default function LogSettings({ server }: { server: {serverID: string, log_channel: string, filtered_logs: string[] } }) {

    return <>
    <div className={" shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Logs Settings</h2>
    { server ? <LogChannel server={server}/> : "" }
    { server ? <FilteredLogs server={server} /> : ""}
    </div>
    </>;
}