import MockEmbed from "@/components/MockEmbed";
import DashboardActionContext from "@/context/DashboardActionContext";
import ScheduleType from "@/lib/types/ScheduleType";
import timestampToDuration from "@/lib/timestampToDuration";
import { useContext, useState } from 'react'; 
import { BsCardList, BsChatLeftDots, BsClock, BsMegaphone, BsPlay, BsRepeat, BsTrash } from "react-icons/bs";
import { useQuery, useQueryClient } from "react-query";

export default function Schedule({ serverID, schedule }: { serverID: string, schedule: ScheduleType }) {
    let { data: channel } = useQuery(["data_channel", schedule.channelID], async () => await fetch(`/api/v1/servers/${serverID}/channels/${schedule.channelID}`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    const [expanded, setExpanded] = useState(false);
    const actionContext = useContext(DashboardActionContext);
    const queryClient = useQueryClient();

    function deleteSchedule() {
        fetch(`/api/v1/servers/${serverID}/schedules/${schedule.index}`, { method: "DELETE" }).then(async (data) => 
        {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            queryClient.invalidateQueries(["data_schedules", serverID])
            if (json && json['error']) {
                if (actionContext)
                    actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false });
                return;
            }
            if (actionContext)
                    actionContext.setAction({ status: `Successfully deleted schedule #${schedule.index+1}`, success: true })
        })
    }
    return <div className={"bg-gray-700 rounded-xl p-1 flex flex-col gap-2"}>
    <code className={"text-md flex flex-row justify-between max-md:flex-col gap-1 mb-4"}>
        <span className={"bg-gray-600 rounded-xl px-2 w-fit flex flex-row gap-2 items-center"}><BsCardList/> #{schedule.index+1}</span> 
        {/*schedule.last_run returns iso string here but unix timestamp from server? what the heck?*/}
        <span className={"bg-gray-600 rounded-xl px-2 w-fit flex flex-row gap-2 items-center"}><BsClock/>Next Run: {new Date(new Date(schedule.last_run).valueOf() + Number(timestampToDuration(schedule.interval_timestamp))).toLocaleString().replaceAll(/, /g, " ")}</span>
    </code>
    <span className={"flex flex-row gap-2 items-center text-lg"}><BsMegaphone/> Channel: #{channel?.name || ""}</span>
    <span className={"flex flex-row gap-2 items-center text-lg"}><BsPlay/> Times run: {schedule.times_run}</span>
    <span className={"flex flex-row gap-2 items-center text-lg"}><BsRepeat/> Times to run: {schedule.times_to_run || "Always run"}</span>
    
    <h3 className={"font-lato text-xl"}>Content:</h3>
    <span className={"bg-gray-600 rounded-lg p-1 text-lg w-fit"}>{schedule.message}</span>
    {schedule.embed ? <><span className={"secondary text-xl text-gray-300 flex flex-row items-center gap-2"}><button className={"border text-white rounded-2xl w-fit p-2 hover-gradient transition-all hover:text-black hover:border-black text-xl"} onClick={() => setExpanded(!expanded)}><BsChatLeftDots/></button> View Embed</span>
    <span className={expanded ? "" : "hidden"}><MockEmbed embed={schedule.embed}/></span></> : ""}
    <span className={"secondary text-xl text-gray-300 flex flex-row items-center gap-2"}><button className={"border text-white rounded-2xl w-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-xl"} onClick={() => deleteSchedule()}><BsTrash/></button> Delete</span>
    </div>;
}