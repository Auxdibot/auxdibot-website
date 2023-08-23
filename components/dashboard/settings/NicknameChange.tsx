"use client";

import { BsCheck, BsCheckLg, BsPersonBadge } from "react-icons/bs";
import { useState } from 'react'; 
import DiscordGuild from "@/lib/types/DiscordGuild";
import { useQueryClient } from "react-query";
export default function NicknameChange({ server }: { server: DiscordGuild & { data: {serverID: string, disabled_modules: string[]} } }) {
    const [nick, setNick] = useState("");
    const [success, setSuccess] = useState(false);
    const queryClient = useQueryClient();
    function onNickChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (success) setSuccess(false);
        setNick(e.currentTarget.value);
    }
    function setNickname() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append("new_nickname", nick);
        fetch(`/api/v1/servers/${server.id}/nick`, { method: "POST", body }).then(() => {
            queryClient.invalidateQueries(["data_settings", server.id])
            setSuccess(true)
            setNick("");
        }).catch(() => {});
    }
    return <div className={"flex flex-col gap-3 w-fit mx-auto border-b p-4 border-gray-700"}>
    <span className={"secondary text-xl text-center flex flex-col"}>Change Bot Nickname <span className={"text text-gray-500 italic text-sm text-center"}>(Leave empty to reset, max length 32 characters)</span></span>
    
    <span className={"flex flex-row max-md:flex-col gap-2"}><input value={nick} onChange={(e) => onNickChange(e)} maxLength={32} className={"font-roboto rounded-md p-0 text-md"}/> 
        <button onClick={() => setNickname()} className={`secondary text-md max-md:mx-auto ${success ? "bg-gradient-to-l from-green-400 to-green-600 text-black border-black" : "hover-gradient border-white"} hover:text-black hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsPersonBadge/> Change Name</>) }
        </button></span>
    </div>
}