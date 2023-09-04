"use client";
import { useQuery } from "react-query"
import { Suspense } from 'react';
import LatestPunishments from "./Schedules";
import Schedules from "./Schedules";
import CreateSchedule from "./CreateSchedule";

export default function DashboardSchedulesConfig({ id }: { id: string }) {
    let { data: schedules } = useQuery(["data_schedules", id], async () => await fetch(`/api/v1/servers/${id}/schedules`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));

    return (<main className={"bg-gray-700 flex-grow"}>
        <div className={"animate-fadeIn flex max-lg:items-center flex-col py-5 md:px-5 gap-5"}>
        <h1 className={"header text-6xl max-lg:text-5xl"}>Schedules</h1>
        <span className={"flex flex-row max-lg:flex-col gap-10"}>
            <Suspense fallback={null}>
                <Schedules serverID={id} schedules={schedules?.data?.scheduled_messages}/>
                <CreateSchedule serverID={id} />
            </Suspense>
        </span>
        </div>
        
            
        </main>)
}