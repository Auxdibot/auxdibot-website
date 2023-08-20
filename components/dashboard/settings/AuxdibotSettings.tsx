"use client";

import DisableableModules from "@/lib/constants/DisableableModules";
import DiscordGuild from "@/lib/types/DiscordGuild";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { BsArrowLeftCircle, BsThreeDots, BsToggles, BsTrash } from "react-icons/bs";
import { useQueryClient } from "react-query";

export default function AuxdibotSettings({ data }: { data: { serverID: string }}) {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { data: session } = useSession();
    const [confirmation, setConfirmation] = useState(false);
    const [shake, setBarShake] = useState(false);
    const [loading, setLoading] = useState(false);
    const serverNameRef = useRef<HTMLInputElement>(null);
    let server: DiscordGuild = session?.user.guilds.find((i: DiscordGuild) => i.id == data?.serverID);
    function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (!server) return;
        if (serverNameRef.current?.value != server.name) {
            setBarShake(true);
            setTimeout(() => { setBarShake(false) }, 300);
            return;
        }
        setLoading(true);
        fetch(`/api/servers/${data.serverID}/reset`, { method: "POST" }).then(() => {
            queryClient.invalidateQueries(["data_settings", data.serverID])
            setLoading(false )
            router.push(`/dashboard/${data.serverID}`);
        }).catch(() => undefined);
    }
    
    return <>
    <div className={"bg-gray-800 shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-fit max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Bot Settings</h2>
    <button onClick={() => setConfirmation(!confirmation)} className={"secondary my-5 mx-auto hover:bg-gradient-to-l hover:from-red-400 hover:to-red-700 hover:text-black text-lg hover:border-black transition-all w-fit border-white border rounded-xl p-1 flex flex-row gap-2 items-center"} type="submit">
        <BsTrash/> Reset Bot
    </button>
    </div>
    {confirmation ? <div className={"fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-50 flex justify-center items-center"}>
        <div className={"bg-gray-700 rounded-2xl max-w-lg items-center flex flex-col text-center p-5 gap-5 max-md:gap-3"}>
            {loading ? <BsThreeDots className={"animate-spin text-8xl text-white"}/> : <><h1 className={"header text-6xl max-md:text-4xl"}>Warning!</h1>
            <p className={"text-2xl max-md:text-lg font-roboto"}>You are about to completely reset <span className={"font-bold text-red-500"}>EVERY</span> setting you have on Auxdibot for this server, and revert Auxdibot back to its default state. Are you sure?<br/><br/>Type <code>{server.name}</code> below to confirm.</p>
            <input className={`${shake ? "animate-incorrect animate" : ""} text-white text text-lg max-md:text-sm rounded-md border border-gray-500 p-1`} ref={serverNameRef}/>
            <span className={"w-full flex flex-row justify-between"}>
            <button onClick={(e) => handleSubmit(e)} className={"secondary text-2xl max-md:text-lg hover:bg-gradient-to-l hover:from-red-400 hover:to-red-700 hover:text-black hover:border-black transition-all w-fit border-white border rounded-xl p-1 flex flex-row gap-2 items-center"} type="submit">
                <BsTrash/> Reset Bot
            </button>
            <button onClick={(e) => setConfirmation(false)} className={"secondary text-2xl max-md:text-lg hover-gradient hover:text-black hover:border-black transition-all w-fit border-white border rounded-xl p-1 flex flex-row gap-2 items-center"} type="submit">
                <BsArrowLeftCircle/> Cancel
            </button>
            </span></>}
            
        </div>
        
    </div> : ""}
    </>;
}