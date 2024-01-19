"use client";

import { useQuery } from "react-query";
import Punishment from "./Punishment";
import PunishmentData from "@/lib/types/PunishmentData";

export default function LatestPunishments({ serverID }: { readonly serverID: string }) {
    let { data: punishments } = useQuery<{ data: { punishments: PunishmentData[] } } | undefined>(["data_punishments", serverID], async () => await fetch(`/api/v1/servers/${serverID}/punishments?limit=5`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    return <>
    <div className={"bg-gray-800 shadow-2xl border-2 border-gray-800 rounded-2xl h-fit flex-1 max-md:w-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Latest Punishments</h2>
    {punishments?.data?.punishments?.length ?
    <table cellPadding={5} className={"mx-auto font-open-sans my-2 flex flex-col p-2 max-md:p-8 text-sm"}>
    <tr className={"max-md:hidden flex w-full justify-between px-2"}>

        <th className={"flex-1 font-montserrat font-normal text-xl"}>Punishment</th>
        <th className={"flex-1 font-montserrat font-normal text-xl"}>Moderator</th>
        <th className={"flex-1 font-montserrat font-normal text-xl"}>User</th>
        <th className={"flex-1 font-montserrat font-normal text-xl"}>Date</th>
        <div className={"w-9 opacity-0"}></div>
    </tr>
    {punishments?.data?.punishments && punishments.data.punishments.map((punishment) => <Punishment key={punishment.punishmentID} serverID={serverID} punishment={punishment}/>) }
    </table> : <div className={"h-16 flex items-center justify-center"}><span className={"text-xl text-gray-300 font-open-sans"}>No punishments found.</span></div>}
    </div>
    </>;
}