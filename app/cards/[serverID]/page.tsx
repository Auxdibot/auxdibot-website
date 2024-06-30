"use client";

import NotFound from "@/app/not-found";
import LatestMessages from "@/components/cards/LatestMessages";
import ServerInfo from "@/components/cards/ServerInfo";
import ServerRules from "@/components/cards/ServerRules";
import { GradientTemplates } from "@/lib/constants/GradientTemplates";
import { CardData } from "@/lib/types/CardData";
import { useQuery } from "react-query";
import { useMediaQuery } from "react-responsive";

export default function ServerCardPage({ params }: { params: { serverID: string } }) {
    const { data, status, error } = useQuery<CardData | { error: string } | undefined>([params.serverID, 'card'], async () => await fetch(`/bot/v1/cards/${params.serverID}`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    if ((!data && status != 'loading') || error || (data && 'error' in data)) { return <NotFound/> }
    
    if (status == 'loading') return <></>
    const gradient = GradientTemplates?.[(data as CardData)?.background?.gradient || 'BACKGROUND'] ?? undefined;
    return (
    <main className={`${data?.dark ? "bg-black" : "bg-gray-100"} ${data?.dark ? "text-gray-100" : "text-gray-800"}  flex flex-col max-md:p-1 justify-center items-center overflow-x-hidden`} style={{ backgroundImage: gradient && gradient(data?.background?.color1, data?.background?.color2)}}>
        <div className={"flex max-md:flex-col p-1 justify-center mx-auto items-center min-h-screen w-full gap-20 max-md:mt-12 animate-fadeIn"}>
        {isMobile ? 
        <>
        {data && <ServerInfo data={data} serverID={params.serverID} />}
        {data?.rules && <ServerRules data={data} />}
        {data?.channel && <LatestMessages data={data} />}
        </>
        :
        <>
        <div className={"flex-1 flex justify-center"}>{data?.channel && <LatestMessages data={data} />}</div>
        <div className={"flex-1 flex justify-center"}>{data && <ServerInfo data={data} serverID={params.serverID} />}</div>
        <div className={"flex-1 flex justify-center"}>{data?.rules && data.rules.length > 0 && <ServerRules data={data} />}</div>
        </>}
        </div>
        <span className={"text-xl w-fit py-2 max-md:my-5 max-md:text-center max-md:flex max-md:flex-col font-open-sans"}><span className={"bg-green-500 rounded-2xl border-gray-800 max-md:w-fit max-md:mx-auto border p-1 font-bold"}>BETA</span> This is a feature currently in testing and development for Auxdibot and will receive constant updates.</span>
        
    </main>)
}