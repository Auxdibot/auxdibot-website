"use client";

import Button from "@/components/Button";
import useSession from "@/lib/hooks/useSession";
import DiscordGuild from "@/lib/types/DiscordGuild";
import { useRouter } from "next/navigation";
import { BsArrowLeftCircle,BsThreeDots, BsTrash } from "react-icons/bs";
import { useQueryClient } from "react-query";
import LogChannel from "./LogChannel";

export default function LogSettings({ server }: { server: { id: string, data: {log_channel: string} }}) {
    const queryClient = useQueryClient();
    const router = useRouter();
    
    return <>
    <div className={"bg-gray-800 shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Logs Settings</h2>
    { server ? <LogChannel server={server}/> : "" }
    </div>
    </>;
}