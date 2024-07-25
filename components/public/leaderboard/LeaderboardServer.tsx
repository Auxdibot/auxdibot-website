import { PublicServerData } from "@/lib/types/PublicServerData";
import Image from "next/image";

export function LeaderboardServer({ server }: { server: PublicServerData }) {
    server.banner_url = "https://cdn.discordapp.com/banners/303681520202285057/a_5619d61d751fbb86536e9e0f608eeb55.webp?size=600";
    return <div className="w-full mb-80 overflow-visible">
        <div className="flex relative">
            <span className="rounded-2xl max-w-[95%] mt-10 mb-42 mx-auto h-96 max-lg:h-64 max-sm:h-48 max-[360px]:h-32 w-full border-4 overflow-hidden border-gray-700">
            {server.banner_url ? <Image src={server.banner_url} width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
             className="object-cover bg-black"
            alt={server.name} /> : <span className="bg-gray-800/70 w-full self-stretch"/>}
            </span>
            
            {server.icon_url ? <Image src={server.icon_url} width={0}
            height={0}
            sizes="100vw"
            
             className="object-cover w-64 h-64 max-lg:h-48 max-lg:w-48 max-lg:-bottom-32 max-lg:left-1/2 max-lg:-translate-x-1/2 max-sm:h-32 max-sm:w-32 max-sm:-bottom-20 max-[360px]:-bottom-16 bg-black rounded-full absolute -bottom-44 left-24 border-8 border-gray-700"
            alt={server.name} /> : <div
             className="font-roboto flex text-6xl max-lg:text-5xl max-sm:text-2xl justify-center items-center object-cover w-64 h-64 max-lg:h-48 max-lg:w-48 max-lg:-bottom-32 max-lg:left-1/2 max-lg:-translate-x-1/2 max-sm:h-32 max-sm:w-32 max-sm:-bottom-24  bg-black rounded-full absolute -bottom-44 left-24 border-8 border-gray-700"
            >{server.acronym}</div> }
        <div className="flex flex-col gap-2 absolute left-96 -bottom-28 max-lg:-bottom-80 max-lg:pt-8 max-sm:pt-0 max-lg:text-center max-lg:left-1/2 max-lg:-translate-x-1/2 max-lg:h-56 max-lg:w-full">
            <h1 className="text-5xl font-raleway font-bold max-lg:text-center">{server.name}</h1>
            <span className="font-roboto font-light text-3xl">{server.members} members</span>
        </div>
        </div>
        
        
    </div>
}