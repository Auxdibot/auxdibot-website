"use client";

import PunishmentType from "@/lib/types/PunishmentType";
import Punishment from "./Punishment";

export default function LatestPunishments({ punishments, serverID }: { serverID: string, punishments?: PunishmentType[] }) {

    return <>
    <div className={"bg-gray-800 shadow-2xl border-2 border-gray-800 rounded-2xl h-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Latest Punishments</h2>
    <div className={"flex flex-col gap-2 text-md font-lato mx-auto rounded-xl m-5 p-5"}> 
    {punishments ? punishments.map((punishment) => <Punishment key={punishment.punishmentID} serverID={serverID} punishment={punishment}/>) : ""}
    </div>
    </div>
    </>;
}