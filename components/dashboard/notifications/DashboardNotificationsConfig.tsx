"use client";
import { useQuery } from "react-query"
import { Suspense } from 'react';
import CreateNotification from "./CreateNotification";
import Notifications from "./Notifications";

export default function DashboardNotificationsConfig({ id }: { id: string }) {
    let { data: notifications } = useQuery(["data_notifications", id], async () => await fetch(`/api/v1/servers/${id}/notifications`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));

    return (<main className={"bg-gray-950 flex-grow"}>
        <div className={"animate-fadeIn flex max-md:items-center flex-col py-5 md:px-5 gap-5"}>
        <h1 className={"header text-6xl max-md:text-5xl"}>notifications</h1>
        <span className={"flex flex-row max-xl:flex-col gap-10"}>
            <Suspense fallback={null}>
                <CreateNotification serverID={id} />
                <Notifications serverID={id} notifications={notifications?.data?.notifications}/>
            </Suspense>
        </span>
        </div>
        
            
        </main>)
}