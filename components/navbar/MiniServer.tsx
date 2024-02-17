"use client";

import Image from "next/image";
import { BsArrowDownShort, BsDatabase, BsThreeDots } from "react-icons/bs";
import { useEffect, useRef, useState } from 'react';
import useSession from "@/lib/hooks/useSession";
import Link from "next/link";
import { useQuery } from "react-query";
import DiscordGuild from "@/lib/types/DiscordGuild";

export function Server({ server }: { server: DiscordGuild }) {
    
    const { data } = useQuery(["server_info", server.id], async () => await fetch(`/api/v1/servers/${server.id}`).then(async (i) => await i.json().catch(() => undefined)).catch(() => undefined));
    const acronym = server?.name?.split(/[\s()]+/).filter(Boolean).map(i => i.replace(/\W/g, '')[0]).join('');
    if (!data) return <></>;
    return (<Link href={`/dashboard/${server.id}`} className={"group flex items-center gap-2 font-open-sans"}>
        <div className={"relative"}>
            <div 
            className="absolute group-hover:opacity-50 -inset-0.5 rounded-lg primary-gradient opacity-0 blur transition-all"
            />
{server.icon ? <Image
         src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png?size=32`}
         alt={server.name + " icon"}
         width={48}
         height={48}
         quality="100"
         className={`rounded-[5rem] flex bg-discord-bg group-hover:rounded-2xl transition-all cursor-pointer duration-300 relative z-10`}
        />: <span className={`h-12 flex-shrink-0 w-12 font-roboto text-gray-100 text-sm items-center flex justify-center relative z-10 bg-discord-bg rounded-[5rem] group-hover:rounded-2xl hover:bg-discord-primary transition-all cursor-pointer duration-300`}>{acronym}</span>}
        </div>
        
        {server?.name}
        </Link>)
}

export default function MiniServer(props: React.ComponentProps<any>) {
    const { data: server } = useQuery(["server_info", props.serverID], async () => await fetch(`/api/v1/servers/${props.serverID}`).then(async (i) => await i.json().catch(() => undefined)).catch(() => undefined));
    const acronym = server?.name?.split(/[\s()]+/).filter(Boolean).map((i: string) => i.replace(/\W/g, '')[0]).join('');
    const [expanded, setExpanded] = useState(false);
    const { user, status } = useSession();

    const ref = useRef<HTMLDivElement | null>();
    useEffect(() => {
        const clickedOutside = (e: globalThis.MouseEvent) => {
          if (expanded && ref.current && !ref.current.contains(e.target as Node)) setExpanded(false)
          
        }
        document.addEventListener("mousedown", clickedOutside)
        return () => document.removeEventListener("mousedown", clickedOutside);
      }, [expanded])
    function expand() {
        setExpanded(!expanded)
    }

    if (status == "loading") return (<div {...props}>
        <BsThreeDots className={"animate-spin text-3xl text-white"}/>
    </div>)

    return (<div ref={ref} {...props}>
        <span className={"text-primary-300"}></span>
        <span className={`flex flex-row gap-2`}>
       
        <span className={"flex items-center gap-2"}>
        {status == "authenticated" && server?.icon && server?.id ? <Image
            src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png?size=128`}
            alt={"Discord profile icon"}
            className={"inline-block align-middle border rounded-xl"}
            width={36}
            height={36}
            quality="100"
            priority
            /> : <span className={`h-[36px] flex-shrink-0 w-[36px] font-roboto border text-gray-100 text-xs overflow-hidden items-center flex justify-center relative z-10 bg-discord-bg rounded-xl hover:bg-discord-primary transition-all cursor-pointer duration-300`}>{acronym}</span>}
        
        <span className={"flex group flex-row gap-2 items-center text-gray-200 font-montserrat tracking-wide text-lg cursor-pointer"} onClick={() => expand()}>
        <span className={"max-md:hidden select-none text-sm"}>{server?.name}</span>
        
        <BsArrowDownShort className={"group-hover:translate-y-1 transition-transform"}/>
        </span>
        </span>
        </span>
        <div className={`absolute flex justify-center items-center flex-col ${expanded ? "scale-100" : "scale-0"} transition-all origin-top w-full select-none top-12 left-full -translate-x-full z-10 ${user && 'translate-x-6' } max-md:-translate-x-8 bg-background-300 bg-opacity-70 border border-gray-800 rounded-xl`}>
            <h1 className={"secondary p-4 rounded-t-xl flex text-lg flex-row gap-2 items-center justify-center border-b border-background-200 bg-black bg-auxdibot-gradient w-full"}><BsDatabase/> Servers</h1>
            <ul className={"flex flex-col gap-3 h-48 overflow-y-scroll scrollbar p-4"}>
            {user.guilds.map((i: DiscordGuild) => {
       return <Server key={i.id} server={i}/>
    })}
            </ul>
        </div>
    </div>)
}