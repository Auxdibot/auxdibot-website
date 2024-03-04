"use client";

import ScheduleType from "@/lib/types/ScheduleType";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./table/column";

export default function Schedules({ schedules, serverID }: { serverID: string, schedules?: ScheduleType[] }) {

    return <>
    <div className={"flex-1 flex-grow shadow-2xl border-2 border-gray-800 rounded-2xl h-full w-full max-md:mx-auto"}>
    <h2 className={"secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Your Schedules</h2>
    <div className={"p-2 max-md:max-w-[98vw] self-stretch"}>
    {schedules && schedules?.length > 0 ? <DataTable columns={columns(serverID)} data={schedules} /> : <h2 className={"text-xl font-open-sans text-gray-400 text-center"}>No schedules found.</h2>}
    </div>
    </div>
    </>;
}