"use client";

import Image from "next/image";
import { useQuery } from "react-query";

export default function LatestLog({ log }: { log?: { type: string, userID: string, date_unix: number, description: string }}) {
    const { data: user } = useQuery(["user", log?.userID], async () => await fetch(`/api/v1/user?id=${log?.userID}`).then(async (res) => await res.json()).catch(() => undefined));
    return <>
    <div className={"bg-gray-800 shadow-2xl border-2 border-gray-800 rounded-2xl h-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Latest Log</h2>
    {log ? <div className={"flex flex-col gap-2 text-md font-lato bg-gray-700 w-fit mx-auto rounded-xl m-5 p-5"}> 
    <code className={"text-md flex flex-col gap-1"}><span>{new Date(log.date_unix).toUTCString()}</span> <span className={"float-right"}>{log.type}</span></code>
    <span className={"flex flex-row gap-2 items-center text-lg"}>{ user?.avatar ? <Image
            src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
            alt={"Discord profile icon"}
            className={"inline-block align-middle rounded-full"}
            width={32}
            height={32}
            quality="100"
            priority
            /> : ""} {user?.username || ""}</span>
    <span>{log.description}</span></div> : ""}
    </div>
    </>;
}