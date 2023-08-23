import Image from "next/image";
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

    function deletePunishment() {
        fetch(`/api/v1/servers/${serverID}/punishments/${punishment.punishmentID}`, { method: "DELETE" }).then(() => queryClient.invalidateQueries(["data_punishments", serverID]))
    }
    return <div className={"bg-gray-700 rounded-xl p-1 flex flex-col gap-2"}>
    <code className={"text-md flex flex-row justify-between max-md:flex-col gap-1"}>
        <span className={"bg-gray-600 rounded-xl px-2 w-fit flex flex-row gap-2 items-center"}><BsCalendar/> {new Date(punishment.date_unix).toLocaleString().replaceAll(/, /g, " ")}</span> 
        <span className={"bg-gray-600 rounded-xl px-2 w-fit flex flex-row gap-2 items-center"}>{punishment.expired ? <><BsHourglass/> Expired</> : punishment.expires_date_unix ? <><BsHourglassTop/> Expires {new Date(punishment.date_unix).toLocaleString().replaceAll(/, /g, " ") }</> : <><BsClock/> Permanent</>}</span>
    </code>
    <span className={"flex flex-row gap-2 items-center text-lg"}><span className={"flex flex-row gap-2 items-center text-lg"}>{PunishmentIcons[punishment.type]} {punishment.type}</span> • <span className={"flex flex-row gap-2 items-center text-lg"}>{ user?.avatar ? <Image
            src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
            alt={"Discord profile icon"}
            className={"inline-block align-middle rounded-full"}
            width={32}
            height={32}
            quality="100"
            priority
            /> : ""} {user?.username || ""}</span> </span>
    <span className={"flex flex-row gap-2 items-center text-lg"}>Moderator: { moderator?.avatar ? <Image
            src={`https://cdn.discordapp.com/avatars/${moderator.id}/${moderator.avatar}.png`}
            alt={"Discord profile icon"}
            className={"inline-block align-middle rounded-full"}
            width={32}
            height={32}
            quality="100"
            priority
            /> : ""} {moderator?.username || "No moderator."}</span>
    <h3 className={"font-lato text-xl"}>Reason</h3>
    <span className={"bg-gray-600 rounded-2xl p-1 text-lg w-fit"}>{punishment.reason}</span>
    <span className={"secondary text-xl text-gray-300 flex flex-row items-center gap-2"}><button className={"border text-white rounded-2xl w-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-xl"} onClick={() => deletePunishment()}><BsTrash/></button> Delete</span>
    </div>;
}