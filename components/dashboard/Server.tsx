"use client";
import { useQuery } from "react-query";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/button/primary-button";
import { BsArrowUp, BsGear } from "react-icons/bs";
import { ServerProps } from "./Servers";

export function Server({ server }: ServerProps) {

    const { data } = useQuery(["server_info", server.id], async () => await fetch(`/bot/v1/servers/${server.id}`).then(async (i) => await i.json().catch(() => undefined)).catch(() => undefined));
    const acronym = server?.name?.split(/[\s()]+/).filter(Boolean).map(i => i.replace(/\W/g, '')[0]).join('');
    return (<span className="relative min-w-[300px] group">
        <div
            className="absolute group-hover:opacity-50 -inset-0.5 rounded-lg bg-gradient-to-tl from-orange-400 to-red-500 opacity-0 blur transition-all"
        ></div>
        <div className={"flex bg-gray-950 flex-col text-center justify-between pb-5 rounded-xl h-full border border-gray-800 w-full max-w-xs gap-2 relative z-10"}>
            <div className={"h-32 w-full relative bg-contain bg-no-repeat rounded-t-xl"} style={{ backgroundImage: `url("https://cdn.discordapp.com/icons/${server.id}/${server.banner}.png")` }}>
                {server.banner ? '' : <span className={`object-cover h-full absolute top-0 w-full text-3xl font-roboto text-gray-100 items-center flex justify-center bg-discord-bg transition-all cursor-pointer rounded-t-xl duration-300 ${!data ? "grayscale" : ""}`}>{acronym}</span>}
            </div>
            <div className={"flex flex-row items-center justify-between w-full flex-1 px-2"}>
                <div className={"relative"}>
                    <span className={`absolute -top-14 w-20 h-20 overflow-visible flex items-center`}>
                        <div className={`rounded-[5rem] group-hover:rounded-2xl transition-all p-0.5 bg-gradient-to-l ${data ? "from-orange-400 to-red-500" : "bg-gradient-to-l from-gray-600 to-gray-800   "}`}>
                            <Link href={data ? "/dashboard/" + server.id : `${process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK}&guild_id=${server.id}`} target={data ? undefined : "_blank"}>
                                {server.icon ? <Image
                                    src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png?size=128`}
                                    alt={server.name + " icon"}
                                    width={80}
                                    height={80}
                                    quality="100"
                                    className={`rounded-[5rem] h-20 w-20 flex bg-discord-bg group-hover:rounded-2xl transition-all cursor-pointer duration-300 ${!data ? "grayscale" : ""}`} /> : <span className={`h-20 font-roboto text-gray-100 w-20 items-center flex justify-center bg-discord-bg rounded-[5rem] group-hover:rounded-2xl hover:bg-discord-primary transition-all cursor-pointer duration-300 ${!data ? "grayscale" : ""}`}>{acronym}</span>}
                            </Link>
                        </div>
                    </span>
                </div>
                <Link href={data ? "/dashboard/" + server.id : `${process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK}&guild_id=${server.id}`} target={data ? undefined : "_blank"}>
                    <Button text={data ? "Dashboard" : "Invite"} icon={data ? <BsGear /> : <BsArrowUp />} className={"transition-all rounded-xl !px-2 py-1 w-fit text-white text-base !my-0"} />
                </Link>
            </div>
            <span className={"self-start text-left text-2xl overflow-ellipsis overflow-hidden text-wrap max-lg:text-xl font-open-sans flex-1 px-2 min-h-[69px] max-w-full"}>{server.name}</span>

        </div></span>);
}
