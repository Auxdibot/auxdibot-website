"use client";

import useMousePosition from "@/hooks/useMousePosition";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";

export default function Log({ log }: { log: { type: string, userID: string, date_unix: number, description: string }}) {
    const { data: user } = useQuery(["user", log?.userID], async () => await fetch(`/api/v1/user?id=${log?.userID}`).then(async (res) => await res.json()).catch(() => undefined));
    const [hovered, setHovered] = useState(false);
    const { x, y } = useMousePosition(); 
    useEffect(() => {
        if (hovered && tooltipRef && tooltipRef.current) {
            tooltipRef.current.setAttribute('style', `top: ${y ? y - 20 : 0}px; left: ${x ? x + 20 : 0}px;`)
        }
    }, [hovered, x, y])
    const tooltipRef = useRef<HTMLSpanElement | null>(null);
    return <tr onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className={"border w-full max-md:w-full flex justify-between items-center max-md:flex-col group"}>
        <span className={"absolute group-hover:scale-100 scale-0 origin-center font-open-sans p-2 rounded-2xl border border-gray-600 bg-gray-800 max-w-xs italic"} ref={tooltipRef}>
            
            {log.description}</span>
        <td className="flex-1 flex-shrink-0 text-ellipsis">{log.type}</td> 
        <td className="flex-1 flex-shrink-0 justify-center flex items-center gap-1 text-ellipsis">
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
        <td className="flex-1 flex-shrink-0 text-center text-ellipsis">{new Date(log.date_unix).toLocaleDateString()}</td>
        </tr>;
}