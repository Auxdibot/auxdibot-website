import MockEmbed from "@/components/MockEmbed";
import ScheduleType from "@/lib/types/ScheduleType";
import Image from "next/image";
import { BsCalendar, BsCardList, BsClock, BsDashCircle, BsExclamationTriangle, BsHammer, BsHourglass, BsHourglassTop, BsMicMute, BsPlay, BsRepeat, BsTrash } from "react-icons/bs";
import { useQuery, useQueryClient } from "react-query";

export default function Schedule({ serverID, schedule }: { serverID: string, schedule: ScheduleType }) {
    const queryClient = useQueryClient();

    function deleteSchedule() {
        fetch(`/api/v1/servers/${serverID}/schedules/${schedule.index}`, { method: "DELETE" }).then(() => queryClient.invalidateQueries(["data_schedules", serverID]))
    }
    return <div className={"bg-gray-700 rounded-xl p-1 flex flex-col gap-2"}>
    <code className={"text-md flex flex-row justify-between max-md:flex-col gap-1"}>
        <span className={"bg-gray-600 rounded-xl px-2 w-fit flex flex-row gap-2 items-center"}><BsCardList/> #{schedule.index+1}</span> 
        <span className={"bg-gray-600 rounded-xl px-2 w-fit flex flex-row gap-2 items-center"}><BsClock/>Next Run {new Date(schedule.last_run_unix + schedule.interval_unix).toLocaleString().replaceAll(/, /g, " ")}</span>
    </code>
    <span className={"flex flex-row gap-2 items-center text-lg"}><BsPlay/> Times run: {schedule.times_run}</span>
    <span className={"flex flex-row gap-2 items-center text-lg"}><BsRepeat/> Times to run: {schedule.times_to_run || "Always run"}</span>
    
    <h3 className={"font-lato text-xl"}>Content:</h3>
    <span className={"bg-gray-600 rounded-lg p-1 text-lg w-fit"}>{schedule.message}</span>
    <span><MockEmbed embed={schedule.embed}/></span>
    <span className={"secondary text-xl text-gray-300 flex flex-row items-center gap-2"}><button className={"border text-white rounded-2xl w-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-xl"} onClick={() => deleteSchedule()}><BsTrash/></button> Delete</span>
    </div>;
}