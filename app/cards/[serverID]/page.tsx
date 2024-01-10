"use client";

import NotFound from "@/app/not-found";
import LatestMessages from "@/components/cards/LatestMessages";
import ServerInfo from "@/components/cards/ServerInfo";
import ServerRules from "@/components/cards/ServerRules";
import { CardData } from "@/lib/types/CardData";
import { CardGradients } from "@/lib/types/CardGradients";
import { useQuery } from "react-query";
import { useMediaQuery } from "react-responsive";

const GradientTemplates: { [key in CardGradients as string]: (color1?: string, color2?: string) => string } = {
    "RADIAL": (color1, color2) =>  `radial-gradient(${color1 ?? '#000000'} 10%, ${color2 ?? '#000000'} 100%)`,
    "LINEAR": (color1, color2) =>  `linear-gradient(${color1 ?? '#000000'} 0%, ${color2 ?? '#000000'} 90%)`,
    "BACKGROUND": (color1, color2) =>  `linear-gradient(180deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 1) 85%),radial-gradient(ellipse at top left, ${color1 ?? "#000000"}80, transparent 30%),radial-gradient(ellipse at top right, ${color1 ?? "#000000"}80, transparent 30%),radial-gradient(ellipse at center right, ${color2 ?? "#000000"}80, transparent 50%),radial-gradient(ellipse at center left, ${color2 ?? "#000000"}80, transparent 50%)`,
}

export default function ServerCardPage({ params }: { params: { serverID: string } }) {
    const { data, status, error } = useQuery<CardData | { error: string } | undefined>([params.serverID, 'card'], async () => await fetch(`/api/v1/cards/${params.serverID}`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    if ((!data && status != 'loading') || error || (data && 'error' in data)) { return <NotFound/> }
    
    if (status == 'loading') return <></>

    return (
    <main className={"flex flex-col max-md:p-1 justify-center items-center overflow-x-hidden"} style={{ backgroundImage: GradientTemplates[data?.background?.gradient || 'BACKGROUND'](data?.background?.color1, data?.background?.color2)}}>
        <div className={"flex max-md:flex-col max-md:p-1 justify-center items-center min-h-screen w-full gap-20 max-md:mt-12 animate-fadeIn"}>
        {isMobile ? 
        <>
        {data && <ServerInfo data={data} serverID={params.serverID} />}
        {data?.rules && <ServerRules data={data} />}
        {data?.channel && <LatestMessages data={data} />}
        </>
        :
        <>
        {data?.channel && <LatestMessages data={data} />}
        {data && <ServerInfo data={data} serverID={params.serverID} />}
        {data?.rules && <ServerRules data={data} />}
        </>}
        </div>
        <span className={"text-xl w-fit py-2 max-md:my-5 max-md:text-center max-md:flex max-md:flex-col font-open-sans"}><span className={"bg-red-600 rounded-2xl border-gray-800 max-md:w-fit max-md:mx-auto border p-1 font-bold"}>ALPHA</span> This is a feature currently in extreme testing and development for Auxdibot and not the final product.</span>
        
    </main>)
}