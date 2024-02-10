"use client";

import NotificationType from "@/lib/types/NotificationType";
import Notification from "./Notification";

export default function Notifications({ notifications, serverID }: { serverID: string, notifications?: NotificationType[] }) {

    return <>
    <div className={"bg-gray-800 flex-1 flex-grow shadow-2xl border-2 border-gray-800 rounded-2xl max-md:w-full h-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Your Notification Feeds</h2>
    {notifications?.length ? 
    <table cellPadding={5} className={"mx-auto font-open-sans my-2 flex flex-col p-2 max-md:p-8 text-sm"}>
    <tr className={"max-md:hidden flex w-full justify-between px-2"}>
        <th className={"flex-1 font-montserrat font-normal text-xl"}>Type</th>
        <th className={"flex-1 font-montserrat font-normal text-xl"}>Channel</th>
        <th className={"flex-1 font-montserrat font-normal text-xl"}>Topic/URL</th>
        <div className={"w-9 opacity-0"}></div>
    </tr>
    {notifications ? notifications.map((notification) => <Notification key={notification.index} serverID={serverID} notification={notification}/>) : ""}
    </table> : ''}

    </div>
    </>;
}