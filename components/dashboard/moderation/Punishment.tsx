import DashboardActionContext from "@/context/DashboardActionContext";
import useMousePosition from "@/hooks/useMousePosition";
import PunishmentType from "@/lib/types/PunishmentType";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { BsCalendar, BsClock, BsDashCircle, BsExclamationTriangle, BsHammer, BsHourglass, BsHourglassTop, BsMicMute, BsTrash } from "react-icons/bs";
import { useQuery, useQueryClient } from "react-query";


let iconClass = "text-red-600";
const PunishmentIcons = {
    "WARN": <BsExclamationTriangle className={iconClass}/>,
    "KICK": <BsDashCircle className={iconClass}/>,
    "MUTE": <BsMicMute className={iconClass}/>,
    "BAN": <BsHammer className={iconClass}/>
}
export default function Punishment({ serverID, punishment }: { serverID: string, punishment: PunishmentType }) {
    const { data: user } = useQuery(["user", punishment.userID], async () => await fetch(`/api/v1/user?id=${punishment.userID}`).then(async (res) => await res.json()).catch(() => undefined));
    const { data: moderator } = useQuery(["user", punishment.moderatorID], async () => await fetch(`/api/v1/user?id=${punishment.moderatorID}`).then(async (res) => await res.json()).catch(() => undefined));
    const queryClient = useQueryClient();
    const actionContext = useContext(DashboardActionContext);
    const [hovered, setHovered] = useState(false);
    const { x, y } = useMousePosition(); 
    const tooltipRef = useRef<HTMLSpanElement | null>(null)
    useEffect(() => {
        if (hovered && tooltipRef && tooltipRef.current) {
            tooltipRef.current.setAttribute('style', `top: ${y ? y - 20 : 0}px; left: ${x ? x + 20 : 0}px;`)
        }
    }, [hovered, x, y])
    function deletePunishment() {
        fetch(`/api/v1/servers/${serverID}/punishments/${punishment.punishmentID}`, { method: "DELETE" }).then(async (data) => {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            queryClient.invalidateQueries(["data_punishments", serverID])

            if (actionContext)
                json && json['error'] ? actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false }) : json ? actionContext.setAction({ status: `Successfully deleted punishment #${punishment.punishmentID}`, success: true }) : ""
        })
    }
    return <span className={"flex gap-2"}><tr onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className={"border w-full max-md:w-full flex justify-between items-center px-2 max-md:flex-col group"}>
        <span className={"absolute group-hover:scale-100 scale-0 origin-center font-open-sans p-2 rounded-2xl border border-gray-600 bg-gray-800 max-w-xs italic"} ref={tooltipRef}> 
            Reason: {punishment.reason}{punishment.expires_date_unix ? <><br/><br/>Expires: {new Date(punishment.date_unix).toUTCString()}</> : ''}</span>
        <td className="flex-1 flex items-center gap-2">{PunishmentIcons[punishment.type]}{punishment.type}</td> 
        <td className="flex-1 justify-center flex items-center gap-1">
        { moderator?.avatar ? <Image
            src={`https://cdn.discordapp.com/avatars/${moderator.id}/${moderator.avatar}.png`}
            alt={"Discord profile icon"}
            className={"inline-block align-middle rounded-full"}
            width={24}
            height={24}
            quality="100"
            priority
            /> : ""}
            {moderator?.username || 'No Moderator'}</td>
            <td className="flex-1 justify-center flex items-center gap-1">
        { user?.avatar ? <Image
            src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
            alt={"Discord profile icon"}
            className={"inline-block align-middle rounded-full"}
            width={24}
            height={24}
            quality="100"
            priority
            /> : ""}
            {user?.username}</td>
        <td className="flex-1 text-center">{new Date(punishment.date_unix).toLocaleDateString()}</td>
        </tr><span className={"secondary text-xl text-gray-300 flex flex-row items-center gap-2"}><button className={"border text-white rounded-2xl w-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-xl"} onClick={() => deletePunishment()}><BsTrash/></button></span></span>;
}