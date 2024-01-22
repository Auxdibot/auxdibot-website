"use client";


import ReportsChannel from "./ReportsChannel";
import ReportsRole from "./ReportsRole";

export default function ReportsSettings({ server }: { server: { readonly serverID: string, readonly reports_channel: string, readonly report_role: string }}) {
    return <>
    <div className={"bg-gray-800 shadow-2xl border-2 border-gray-800 rounded-2xl self-stretch w-full flex flex-col max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Reports Settings</h2>
    <div className={"flex flex-col h-full justify-center"}>
    { server && <ReportsChannel server={server}/>}
    { server && <ReportsRole server={server}/>}
    </div>
    
    </div>
    </>;
}