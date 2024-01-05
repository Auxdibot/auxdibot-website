"use client";

import Error from "@/app/error";
import DiscordGuild from "@/lib/types/DiscordGuild";
import { useQuery } from "react-query";
import PageLoading from "../PageLoading";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import { BsBook } from "react-icons/bs";
import useSession from "@/lib/hooks/useSession";

export default function Servers() {
    const { user, status } = useSession();
    if (status == "loading") return (<PageLoading/>)
    if (!user?.guilds) return (<Error/>);
    return (<div className={"flex-grow py-5 bg-auxdibot-masthead bg-black flex justify-center flex-col"}>
        <h1 className={"header text-6xl max-md:text-5xl mx-auto my-5"}>your servers</h1>
        <p className={"secondary text-2xl text-center"}>Select a server to get started with Auxdibot&apos;s Dashboard!<br/>You can view the Auxdibot documentation below.</p>
        <Button icon={<BsBook/>} text={"Documentation"} href={"/docs"} className={"my-4"}/>
        <div className={"grid grid-flow-row grid-cols-3 max-md:grid-cols-2 max-w-2xl mx-auto auto-cols-1 auto-rows-1 px-2 bg-gray-800 bg-opacity-50 rounded-3xl"}>
        {user.guilds.map((i: DiscordGuild) => {
       return <Server key={i.id} server={i}/>
    })}
        </div>
        </div>)
}
type ServerProps = { server: DiscordGuild }
export function Server({ server }: ServerProps) {
    
    const { data } = useQuery(["server_list", server.id], async () => await fetch(`/api/v1/servers/${server.id}`).then(async (i) => await i.json().catch(() => undefined)).catch(() => undefined));
    return (<Link href={data?.inServer ? "/dashboard/" + server.id : process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK + "&guild_id=" + server.id}><div className={"flex flex-col text-center justify-center items-center w-full h-44 py-5 rounded-xl"}>
        <div className={"flex-1 flex-grow flex-shrink"}>
        <div className={data?.inServer ? "bg-gradient-to-l from-orange-400 to-red-500 rounded-[5rem] hover:rounded-2xl transition-all p-0.5" : ""}>
        {server.icon ? <Image
         src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png?size=64`}
         alt={server.name + " icon"}
         width={64}
         height={64}
         quality="100"
         className={`rounded-[5rem] bg-discord-bg hover:rounded-2xl transition-all cursor-pointer duration-300 ${!data || data['error'] ? "grayscale" : ""}`}
        />: <span className={`h-16 font-roboto text-gray-100 w-16 items-center flex justify-center bg-discord-bg rounded-[5rem] hover:rounded-2xl hover:bg-discord-primary transition-all cursor-pointer duration-300 ${!data ? "grayscale" : ""}`}>{server.name.split(" ").map((i) => "abcdefghijklmnopqrstuvwxyz".indexOf(i[0]) != -1 ? i[0] : "").join("")}</span>}
        </div>
        </div>
        <span className={"flex-1 flex-grow flex-shrink secondary my-2"}>{server.name}</span>
        
    </div></Link>)
}