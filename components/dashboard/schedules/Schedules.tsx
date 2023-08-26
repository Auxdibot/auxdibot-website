"use client";

import ScheduleType from "@/lib/types/ScheduleType";
import Schedule from "./Schedule";

export default function Schedules({ schedules, serverID }: { serverID: string, schedules?: ScheduleType[] }) {

    return <>
    <div className={"bg-gray-800 flex-1 flex-grow shadow-2xl border-2 border-gray-800 rounded-2xl h-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Your Schedules</h2>
    <div className={"flex flex-col gap-2 text-md font-lato mx-auto rounded-xl m-5 p-5"}> 
    {schedules ? schedules.map((schedule) => <Schedule key={schedule.index} serverID={serverID} schedule={schedule}/>) : ""}
    </div>
    </div>
    </>;
}