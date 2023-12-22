"use client";

import Image from "next/image";
import { useQuery } from "react-query";

export default function Log({ log }: { log: { type: string, userID: string, date_unix: number, description: string }}) {
    const { data: user } = useQuery(["user", log?.userID], async () => await fetch(`/api/v1/user?id=${log?.userID}`).then(async (res) => await res.json()).catch(() => undefined));
    return <tr className={"border w-full max-md:w-full flex justify-between items-center max-md:flex-col"}>
        <td className="flex-1">{log.type}</td> 
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
        <td className="flex-1 text-center">{new Date(log.date_unix).toLocaleDateString()}</td>
        </tr>;
}