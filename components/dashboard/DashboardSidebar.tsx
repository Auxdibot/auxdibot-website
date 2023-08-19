"use client";
import NotFound from "@/app/not-found";
import DiscordGuild from "@/lib/types/DiscordGuild";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsClock, BsGear, BsHammer, BsJournalBookmark, BsList, BsQuestionCircle, BsShieldCheck, BsStar, BsTextLeft, BsTrophy } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";

export default function DashboardSidebarContainer({ serverID }: { serverID: string }) {
    let [expanded, setExpanded] = useState(false);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const { data: session, status } = useSession();
    if (status == "loading") return <></>
    if (status == "unauthenticated") return <></>
    let server = session?.user.guilds.find((i: DiscordGuild) => i.id == serverID);
    return (<>{isMobile ? <div className={"fixed w-64 z-50 max-md:w-48"}>
        <div className={`transition-transform ${expanded ? "translate-x-0" : "-translate-x-48"}`}>
            <DashboardSidebar server={server} />
        </div>
        <button className={`fixed text-3xl border-t-2 border-t-gray-700 bg-gray-600 transition-all pr-2 pb-2 rounded-br-full ${expanded ? "ml-48" : ""}`} onClick={() => setExpanded(!expanded)}>
            <BsList/>
        </button>
    </div> : <DashboardSidebar server={server}/>}</>)
}
export function DashboardSidebar({ server }: { server?: DiscordGuild }) {
    if (!server) return (<NotFound/>)
    return (<><nav className={`fixed h-screen w-64 max-md:w-48 bg-gray-600 border-t-2 border-gray-700`}>
        <ul className={"flex flex-col gap-3 pt-3"}>
            <li className={"py-2 border-b-2 border-opacity-50 border-gray-700"}>
                <Link href={`/dashboard/${server?.id}/settings`} className={"flex flex-row gap-2 font-roboto text-lg max-sm:text-sm items-center ml-2 cursor-pointer"}><BsGear/> Settings</Link>
            </li>
            <li className={"py-2 border-b-2 border-opacity-50 border-gray-700"}>
                <span className={"flex flex-row gap-2 font-roboto text-lg max-sm:text-sm items-center ml-2"}><BsJournalBookmark/> Logging</span>
            </li>
            <li className={"py-2 border-b-2 border-opacity-50 border-gray-700"}>
                <span className={"flex flex-row gap-2 font-roboto text-lg max-sm:text-sm items-center ml-2"}><BsHammer/> Moderation</span>
            </li>
            <li className={"py-2 border-b-2 border-opacity-50 border-gray-700"}>
                <span className={"flex flex-row gap-2 font-roboto text-lg max-sm:text-sm items-center ml-2"}><BsClock/> Schedules</span>
            </li>
            <li className={"py-2 border-b-2 border-opacity-50 border-gray-700"}>
                <span className={"flex flex-row gap-2 font-roboto text-lg max-sm:text-sm items-center ml-2"}><BsShieldCheck/> Permissions</span>
            </li>
            <li className={"py-2 border-b-2 border-opacity-50 border-gray-700"}>
                <span className={"flex flex-row gap-2 font-roboto text-lg max-sm:text-sm items-center ml-2"}><BsTextLeft/> Embeds</span>
            </li>
            <li className={"py-2 border-b-2 border-opacity-50 border-gray-700"}>
                <span className={"flex flex-row gap-2 font-roboto text-lg max-sm:text-sm items-center ml-2"}><BsStar/> Starboard</span>
            </li>
            <li className={"py-2 border-b-2 border-opacity-50 border-gray-700"}>
                <span className={"flex flex-row gap-2 font-roboto text-lg max-sm:text-sm items-center ml-2"}><BsQuestionCircle/> Suggestions</span>
            </li>
            <li className={"py-2 border-b-2 border-opacity-50 border-gray-700"}>
                <span className={"flex flex-row gap-2 font-roboto text-lg max-sm:text-sm items-center ml-2"}><BsTrophy/> Levels</span>
            </li>
        </ul>
        {server ? <span className={"flex gap-3 py-4 items-center flex-col justify-center"}>
        <Link href={`/dashboard/${server.id}`}>
        {server.icon ?
        <Image
        src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png?size=64`}
        alt={server.name + " icon"}
        width={64}
        height={64}
        quality="100"
        className={`rounded-[5rem] bg-discord-bg hover:rounded-2xl transition-all duration-300 flex-grow`}
       />
        : <span className={`h-16 font-roboto text-gray-100 w-16 items-center flex justify-center bg-discord-bg rounded-[5rem] text-sm hover:rounded-2xl hover:bg-discord-primary transition-all cursor-pointer duration-300`}>{server.name.split(" ").map((i) => "abcdefghijklmnopqrstuvwxyz".indexOf(i[0]) != -1 ? i[0] : "").join("")}</span>}
        </Link>
        <span className={"secondary text-gray-100 text-md text-center"}>{server.name}</span>
        </span> : "T"}
    </nav><div className={"max-md:hidden w-64 max-md:w-64 h-16"}></div></>);
}
