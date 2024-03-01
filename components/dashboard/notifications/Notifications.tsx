"use client";

import NotificationType from "@/lib/types/NotificationType";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./table/column";

export default function Notifications({ notifications, serverID }: { serverID: string, notifications?: NotificationType[] }) {

    return <>
    <div className={"flex-1 flex-grow shadow-2xl border-2 border-gray-800 rounded-2xl max-md:w-full h-full max-md:mx-auto"}>
    <h2 className={"secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Your Notification Feeds</h2>
    <div className={"p-2 max-md:max-w-[98vw] self-stretch"}>
    {notifications && notifications?.length > 0 ? <DataTable columns={columns(serverID)} data={notifications} /> : <h2 className={"text-xl font-open-sans text-gray-400 text-center"}>No notifications found.</h2>}
    </div>
    </div>
    </>;
}