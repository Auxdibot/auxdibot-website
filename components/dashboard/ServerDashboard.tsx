"use client";
import { servers } from "@prisma/client";
import { redirect } from "next/navigation"
type ServerDashboardProps = { data?: servers; serverID: string; };
export default function ServerDashboard({ data, serverID }: ServerDashboardProps) {
    if (!data) redirect(process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK + "&guild_id=" + serverID);
    return (<main className={'flex-grow flex flex-col bg-gray-700 justify-center items-center'}><h1 className={"header text-6xl text-center"}>Under Construction</h1></main>);
}