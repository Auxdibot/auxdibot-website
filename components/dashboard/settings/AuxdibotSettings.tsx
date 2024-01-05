"use client";

import DiscordGuild from "@/lib/types/DiscordGuild";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsArrowLeftCircle, BsThreeDots, BsTrash, BsX } from "react-icons/bs";
import { useQueryClient } from "react-query";
import NicknameChange from "./NicknameChange";
import TextBox from "@/components/input/TextBox";

export default function AuxdibotSettings({ server }: { server: DiscordGuild & { data: {serverID: string, disabled_modules: string[]} } }) {
    const queryClient = useQueryClient();
    const router = useRouter();
    
    const [confirmation, setConfirmation] = useState(false);
    const [shake, setBarShake] = useState(false);
    const [loading, setLoading] = useState(false);
    const [confirmationDelete, setConfirmationDelete] = useState('');
    function onConfirmationChange(e: React.ChangeEvent<HTMLInputElement>) {
        setConfirmationDelete(e.currentTarget.value);
    }
    function reset(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (!server) return;
        if (confirmationDelete != server?.name) {
            setBarShake(true);
            setTimeout(() => { setBarShake(false) }, 300);
            return;
        }
        setLoading(true);
        fetch(`/api/v1/servers/${server.id}/reset`, { method: "POST" }).then(() => {
            queryClient.invalidateQueries(["data_settings", server.id])
            setLoading(false )
            router.push(`/dashboard/${server.id}`);
        }).catch(() => undefined);
    }
    
    return <>
    <div className={"bg-gray-800 shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Bot Settings</h2>
    <div className={"flex flex-col gap-4"}>
    <NicknameChange server={server}/>
    <button onClick={() => setConfirmation(!confirmation)} className={"secondary my-5 mx-auto hover:bg-gradient-to-l hover:from-red-400 hover:to-red-700 hover:text-black text-lg hover:border-black transition-all w-fit border-white border rounded-xl p-1 flex flex-row gap-2 items-center"} type="submit">
        <BsTrash/> Reset Bot
    </button>
    </div>
    </div>
    {confirmation ? <div className={"fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-50 flex justify-center items-center"}>
        <div className={"bg-auxdibot-masthead bg-black border-2 border-slate-800 rounded-2xl max-w-lg items-center flex flex-col text-center p-5 gap-5 max-md:gap-3"}>
            {loading ? <BsThreeDots className={"animate-spin text-8xl text-white"}/> : <><h1 className={"header text-6xl max-md:text-4xl"}>WARNING</h1>
            <p className={"text-2xl max-md:text-lg font-roboto"}>You are about to completely reset <span className={"font-bold text-red-500"}>EVERY</span> setting you have on Auxdibot for this server, and revert Auxdibot back to its default state. Are you sure?<br/><br/>Type <code>{server?.name}</code> below to confirm.</p>
            <TextBox value={confirmationDelete} onChange={onConfirmationChange} Icon={shake ? BsX : BsTrash } className={`${shake ? "animate-incorrect animate" : ""}`}/>
            <span className={"w-full flex flex-row justify-between"}>
            <button onClick={(e) => reset(e)} className={"secondary text-2xl max-md:text-lg hover:bg-gradient-to-l hover:from-red-400 hover:to-red-700 hover:text-black hover:border-black transition-all w-fit border-white border rounded-xl p-1 flex flex-row gap-2 items-center"} type="submit">
                <BsTrash/> Reset Bot
            </button>
            <button onClick={() => setConfirmation(false)} className={"secondary text-2xl max-md:text-lg hover-gradient hover:text-black hover:border-black transition-all w-fit border-white border rounded-xl p-1 flex flex-row gap-2 items-center"} type="submit">
                <BsArrowLeftCircle/> Cancel
            </button>
            </span></>}
            
        </div>
        
    </div> : ""}
    </>;
}