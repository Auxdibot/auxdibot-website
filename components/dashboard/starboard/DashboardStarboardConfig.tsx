"use client";

import { useQuery } from "react-query";
import StarboardBoards from "./boards/StarboardBoards";
import { Suspense } from 'react';
import StarboardSettings from "./settings/StarboardSettings";

export default function DashboardStarboardConfig({ id }: { id: string }) {
    let { data: starboard } = useQuery(["data_starboard", id], async () => await fetch(`/bot/v1/servers/${id}/starboard`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    return (<main className={"bg-gray-950 flex-grow"}>
        <div className={"animate-fadeIn flex max-md:items-center flex-col py-5 md:px-5 gap-5"}>
        <h1 className={"header text-6xl max-md:text-5xl"}>starboard</h1>
        <span className={"flex flex-row max-xl:flex-col w-full gap-10"}>
            <Suspense fallback={null}>
                {starboard && <StarboardBoards server={starboard}/>}
                {starboard && <StarboardSettings server={starboard}/>}
            </Suspense>
        </span>
        </div>
        
            
        </main>)
}