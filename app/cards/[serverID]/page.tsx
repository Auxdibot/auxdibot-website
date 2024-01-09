"use client";

import NotFound from "@/app/not-found";
import { CardData } from "@/lib/types/CardData";
import { CardFonts } from "@/lib/types/CardFonts";
import { CardGradients } from "@/lib/types/CardGradients";
import DOMPurify from "dompurify";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsCheck, BsDiscord, BsShare, BsStar } from "react-icons/bs";
import { useQuery } from "react-query";

const GradientTemplates: { [key in CardGradients as string]: (color1?: string, color2?: string) => string } = {
    "RADIAL": (color1, color2) =>  `radial-gradient(${color1 ?? '#000000'} 10%, ${color2 ?? '#000000'} 100%)`,
    "LINEAR": (color1, color2) =>  `linear-gradient(${color1 ?? '#000000'} 0%, ${color2 ?? '#000000'} 90%)`,
    "BACKGROUND": (color1, color2) =>  `linear-gradient(180deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 1) 85%),radial-gradient(ellipse at top left, ${color1 ?? "#000000"}80, transparent 30%),radial-gradient(ellipse at top right, ${color1 ?? "#000000"}80, transparent 30%),radial-gradient(ellipse at center right, ${color2 ?? "#000000"}80, transparent 50%),radial-gradient(ellipse at center left, ${color2 ?? "#000000"}80, transparent 50%)`,
}

export default function ServerCardPage({ params }: { params: { serverID: string } }) {
    const { data, status, error } = useQuery<CardData | { error: string } | undefined>([params.serverID, 'card'], async () => await fetch(`/api/v1/cards/${params.serverID}`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    const [copied, setCopied] = useState(false);
    if ((!data && status != 'loading') || error || (data && 'error' in data)) { return <NotFound/> }
    const header = CardFonts[data?.header_font || "BAUHAUS_93"], text = CardFonts[data?.text_font || 'OPEN_SANS'];
    function copy() {
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/cards/${params.serverID}`)
        setCopied(true);
        setTimeout(() => setCopied(false), 2000)
    }
    if (status == 'loading') return <></>
    return (
    <main className={"flex flex-col max-md:p-1 justify-center items-center"} style={{ backgroundImage: GradientTemplates[data?.background?.gradient || 'BACKGROUND'](data?.background?.color1, data?.background?.color2)}}>
        <div className={"flex max-md:flex-col max-md:p-1 justify-center items-center h-screen w-full gap-20 max-md:mt-12 animate-fadeIn"}>
        <div className={"flex flex-col gap-2 items-center"}>
            
            {data?.featured && <span className={"text-xl font-roboto flex gap-2 items-center"}><BsStar className={"text-amber-600"}/> This server is featured by Auxdibot.</span>}
            <section className={"bg-black border border-gray-800 px-3 py-10 bg-opacity-60 rounded-2xl"}>
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
                <p className={`text-2xl`}>{data?.description || ''}</p>
                <span className={"flex gap-4 items-center max-md:flex-col"}>
                {data?.invite_url && <Link href={data?.invite_url} className={" text-xl  group rounded-2xl w-fit relative "} >
                    <div className={"absolute -inset-0 rounded-2xl blur-xl z-0 opacity-0 group-hover:opacity-100 select-none transition-all"} style={{ backgroundImage: `linear-gradient(135deg, ${data?.background?.color1 ?? 'transparent'}, ${data?.background?.color2 ?? 'transparent'})`}}/>
                    <span className={"flex relative flex-row gap-2 rounded-2xl p-1 items-center z-10 bg-discord-primary"}><BsDiscord/> Join Server</span>
                    </Link>}
                <span onClick={copy} className={"text-xl group rounded-2xl w-fit relative cursor-pointer"} >
                    <div className={"absolute -inset-0 rounded-2xl blur-lg z-0 opacity-0 group-hover:opacity-100 select-none transition-all"} style={{ backgroundImage: `linear-gradient(135deg, ${data?.background?.color1 ?? 'transparent'}, ${data?.background?.color2 ?? 'transparent'})`}}/>
                    <span className={"flex relative flex-row gap-2 rounded-2xl p-1 items-center z-10 origin-left transition-all"}>
                        <span className={"absolute w-max translate-x-10 bg-gray-800 border border-gray-400 group-hover:scale-100 group-focus:scale-100 scale-0 rounded-tl-2xl rounded-md px-2 rounded-bl-2xl transition-all origin-left   "}> {copied ? "Copied!" : "Copy Link"}</span>
                        {copied ? <BsCheck/> : <BsShare/>}
                    </span>
                </span>
                </span>
            </div>
        </section>
        </div>
        {data?.rules && 
        <section className={"bg-black border border-gray-800 px-3 py-10 bg-opacity-60 rounded-2xl"}>
            <div className={`flex flex-col justify-center items-center gap-5 font-${text}`}>
                <h1 className={`text-5xl font-${header}`}>Server Rules</h1>
                <p className={"h-full break-all"} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.rules.replaceAll('\\n', '<br/>')) }}></p>
            </div>
        </section>}
        </div>
        <span className={"text-xl w-fit py-2 max-md:my-5 max-md:text-center max-md:flex max-md:flex-col font-open-sans"}><span className={"bg-green-600 rounded-2xl border-gray-800 max-md:w-fit max-md:mx-auto border p-1 font-bold"}>BETA</span> This is a feature currently in development for Auxdibot and not the final product.</span>
        
    </main>)
}