"use client";

import Error from "@/app/error";
import DiscordGuild from "@/lib/types/DiscordGuild";
import PageLoading from "../PageLoading";
import Button from "../ui/primary-button";
import { BsBook } from "react-icons/bs";
import useSession from "@/lib/hooks/useSession";
import { Server } from "./Server";

export default function Servers() {
    const { user, status } = useSession();
    
    if (status == "loading") return (<PageLoading/>)
    if (!user?.guilds) return (<Error/>);
    return (<div className={"flex-grow py-5 flex justify-center flex-col relative"}>
        <div className={"overflow-hidden h-screen bg-auxdibot-masthead bg-auto bg-no-repeat absolute bg-black top-0 -z-10 w-full"}></div>
        <h1 className={"header text-6xl max-md:text-5xl mx-auto my-5"}>your servers</h1>
        <p className={"secondary text-2xl text-center"}>Select a server to get started with Auxdibot&apos;s Dashboard!<br/>You can view the Auxdibot documentation below.</p>
        <Button icon={<BsBook/>} text={"Documentation"} href={"/docs"} className={"my-4"}/>
        <div className={"grid grid-flow-row grid-cols-3 max-md:grid-cols-1 mx-auto auto-cols-1 auto-rows-1 px-2 gap-5"}>
        {user.guilds.map((i: DiscordGuild) => {
       return <Server key={i.id} server={i}/>
    })}
        </div>
        </div>)
}
export type ServerProps = { server: DiscordGuild }
