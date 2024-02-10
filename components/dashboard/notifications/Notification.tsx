import DashboardActionContext from "@/context/DashboardActionContext";
import NotificationType from "@/lib/types/NotificationType";
import Link from "next/link";
import { useContext } from 'react'; 
import { BsHash, BsRss, BsTrash, BsTwitch, BsYoutube } from "react-icons/bs";
import { useQuery, useQueryClient } from "react-query";

const NotificationTypes = {
    "TWITCH": <><BsTwitch/> Twitch</>,
    "YOUTUBE": <><BsYoutube/> YouTube</>,
    "RSS": <><BsRss/> RSS Feed</>

}
export default function Notification({ serverID, notification }: { serverID: string, notification: NotificationType }) {
    const actionContext = useContext(DashboardActionContext);
    const queryClient = useQueryClient();
    const { data: channels } = useQuery(['data_channels', serverID], async () => await fetch(`/api/v1/servers/${serverID}/channels`).then(async (data) => await data.json().catch(() => undefined)).catch(() => undefined));
    function deletePermission() {
        fetch(`/api/v1/servers/${serverID}/notifications/${notification.index}`, { method: "DELETE" }).then(async (data) => 
        {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            queryClient.invalidateQueries(["data_notifications", serverID])
            if (json && json['error']) {
                if (actionContext)
                    actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false });
                return;
            }
            if (actionContext)
                    actionContext.setAction({ status: `Successfully deleted notification #${notification.index+1}`, success: true })
        })
    }
    return <span className={"flex gap-2"}>
    <tr className={"border w-full max-md:w-full flex justify-between items-center px-2 max-md:flex-col group"}>

    <td className="flex-1 flex items-center gap-2"><span className={"font-bold"}>#{notification.index+1}</span> {NotificationTypes[notification.type]}</td> 
    <td className="flex-1 text-center flex items-center gap-1 justify-center"><BsHash/> {channels?.find((i: { id: string, name: string }) => i.id == notification.channelID)?.name ?? 'Not Found'}</td>
    <td className="flex-1 justify-center flex items-center gap-1 text-blue-500 underline">{notification.type != 'TWITCH' ? <Link href={notification.topicURL}>View Output</Link> : <Link href={`https://twitch.tv/${notification.topicURL}`}>{notification.topicURL}</Link>}</td>
    </tr>
    <span className={"secondary text-xl text-gray-300 flex flex-row items-center gap-2"}>
        <button className={"border text-white rounded-2xl w-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-xl"} onClick={() => deletePermission()}><BsTrash/></button>
        </span></span>;
}