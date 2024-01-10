import { CardData } from "@/lib/types/CardData";
import { BsCheck, BsDiscord, BsShare } from "react-icons/bs";
import ServerMembers from "./ServerMembers";
import Image from "next/image";
import { CardFonts } from "@/lib/types/CardFonts";
import Link from "next/link";
import { useState } from "react";
import ServerBadges from "./ServerBadges";

export default function ServerInfo({ data, serverID }: { readonly data: CardData; readonly serverID: string; }) {
    const [copied, setCopied] = useState(false);
    function copy() {
        navigator.clipboard?.writeText(`${process.env.NEXT_PUBLIC_URL}/cards/${serverID}`)
        setCopied(true);
        setTimeout(() => setCopied(false), 2000)
    }
    const header = CardFonts[data?.header_font || "BAUHAUS_93"], text = CardFonts[data?.text_font || 'OPEN_SANS'];
    return <div className={"flex-1 flex justify-center items-center"}>
        
    <div className={"flex flex-col gap-2 items-center"}>
        <section className={`${data?.dark ? "bg-black" : "bg-gray-100"} ${data?.dark ? "text-gray-100" : "text-gray-800"} ${data?.dark ? "border-gray-800" : "border-gray-300"} border  px-3 py-10 bg-opacity-60 rounded-2xl`}>
        <div className={`flex flex-col justify-center items-center gap-5 text-center font-${text}`}>
            {data?.server?.icon_url && 
            <span className={'relative'}>
                <div className={"absolute -inset-0 rounded-2xl blur-xl z-0 select-none transition-all opacity-40"} style={{ backgroundImage: `linear-gradient(135deg, ${data?.background?.color1 ?? 'transparent'}, ${data.background?.color2 ?? 'transparent'})`}}/>
            <Image
                src={data.server.icon_url}
                alt={"Server icon"}
                className={"rounded-2xl relative z-10"}
                width={128}
                height={128}
            />
            </span>}
            <h1 className={`text-5xl font-${header}`}>{data?.server?.name}</h1>
            <span className={"flex max-md:flex-col items-center justify-center gap-2 w-full px-10"}>
                <ServerMembers totalMembers={data?.server?.members || 0}/>
                <span className={"flex-1 max-md:hidden flex-shrink-0"}><span className={`border ${!data?.dark ? "border-gray-800" : "border-gray-300"} h-8`}></span></span>
                <ServerBadges badges={data?.badges} dark={data?.dark}/>
            </span>
            <p className={`text-lg`}>{data?.description || ''}</p>
            <span className={"flex gap-4 items-center max-md:flex-col"}>
            {data?.invite_url && <Link href={data?.invite_url} className={" text-xl  group rounded-2xl w-fit relative "} >
                <div className={"absolute -inset-0 rounded-2xl blur-xl z-0 opacity-0 group-hover:opacity-100 select-none transition-all"} style={{ backgroundImage: `linear-gradient(135deg, ${data?.background?.color1 ?? 'transparent'}, ${data?.background?.color2 ?? 'transparent'})`}}/>
                <span className={"flex relative flex-row gap-2 rounded-2xl p-1 items-center z-10 bg-discord-primary text-gray-100"}><BsDiscord/> Join Server</span>
                </Link>}
            <span onClick={copy} className={"text-xl group rounded-2xl w-fit relative cursor-pointer"} >
                <div className={"absolute -inset-0 rounded-2xl blur-lg z-0 opacity-0 group-hover:opacity-100 select-none transition-all"} style={{ backgroundImage: `linear-gradient(135deg, ${data?.background?.color1 ?? 'transparent'}, ${data?.background?.color2 ?? 'transparent'})`}}/>
                <span className={"flex relative flex-row gap-2 rounded-2xl p-1 items-center z-10 origin-left transition-all"}>
                    <span className={`absolute w-max translate-x-10 ${data?.dark ? "bg-gray-800" : "bg-gray-200"} border border-gray-400 group-hover:scale-100 group-focus:scale-100 scale-0 rounded-tl-2xl rounded-md px-2 rounded-bl-2xl transition-all origin-left   `}> {copied ? "Copied!" : "Copy Link"}</span>
                    {copied ? <BsCheck/> : <BsShare/>}
                </span>
            </span>
            </span>
        </div>
    </section>
    </div>
    </div>;
}