"use client";

import ReportsChannel from "./ReportsChannel";
import ReportsRole from "./ReportsRole";

export default function ReportsSettings({ server }: { server: { readonly serverID: string, readonly reports_channel: string, readonly report_role: string }}) {
    return <section className={"my-2 flex flex-col justify-center h-full"}>
    <span className={"text-sm text-gray-400 italic font-open-sans block text-center"}>When a user runs the /report command, all reports will be directed to the channel you specified and the reports role you have set will be pinged.</span>
    <div className={"flex max-md:flex-col h-full w-full md:px-10 mx-auto my-2 justify-center"}>
    { server && <ReportsChannel server={server}/>}

    { server && <ReportsRole server={server}/>}
    </div>
    </section>;
}