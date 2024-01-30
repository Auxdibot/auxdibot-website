import { CardData } from "@/lib/types/CardData";
import { BsCheck, BsDiscord, BsShare } from "react-icons/bs";
import ServerMembers from "./ServerMembers";
import Image from "next/image";
import { CardFonts } from "@/lib/constants/CardFonts";
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
    return <div className={"max-w-lg flex justify-center items-center"}>
        
    <div className={"flex flex-col gap-2 items-center max-w-full"}>
        <section className={`${data?.dark ? "bg-black" : "bg-gray-100"} ${data?.dark ? "text-gray-100" : "text-gray-900"} ${data?.dark ? "border-gray-800" : "border-gray-300"} border w-full px-3 py-10 bg-opacity-60 rounded-2xl`}>
        <div className={`flex flex-col justify-center items-center gap-5 text-center font-${text}`}>
            <span className={'relative'}>
                <div className={"absolute -inset-0 rounded-2xl blur-xl z-0 select-none transition-all opacity-40"} style={{ backgroundImage: `linear-gradient(135deg, ${data?.background?.color1 ?? 'transparent'}, ${data.background?.color2 ?? 'transparent'})`}}/>
            {data?.server?.icon_url ? <Image
                src={data.server.icon_url}
                alt={"Server icon"}
                className={"rounded-2xl relative z-10"}
                width={128}
                height={128}
            /> : data?.server?.acronym && <span className={`h-32 relative z-10 font-roboto text-gray-100 w-32 items-center flex justify-center bg-discord-bg rounded-[5rem] hover:rounded-2xl hover:bg-discord-primary transition-all cursor-pointer duration-300 text-2xl`}>{data.server.acronym}</span>}
            </span>
            <h1 className={`text-5xl font-${header} break-words-wrap max-w-full`}>{data?.server?.name}</h1>
            <span className={"flex max-md:flex-col items-center justify-center gap-4 w-full px-10"}>
                <ServerMembers totalMembers={data?.server?.members || 0}/>
                {data?.badges.length > 0 ? <ServerBadges badges={data?.badges} dark={data?.dark}/> : ""}
            </span>
            <p className={`text-lg break-words-wrap max-w-full`}>{data?.description || ''}</p>
            <span className={"flex gap-4 items-center max-md:flex-col"}>
            {data?.invite_url && <Link href={data?.invite_url} className={"text-xl  group rounded-2xl w-fit relative "} >
                <div className={"absolute -inset-0 rounded-2xl blur-xl z-0 opacity-0 group-hover:opacity-100 select-none transition-all"} style={{ backgroundImage: `linear-gradient(180deg, ${data?.background?.color1 ?? 'transparent'}, ${data?.background?.color2 ?? 'transparent'})`}}/>
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