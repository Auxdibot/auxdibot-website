"use client";

import { useQuery } from "react-query";
import StarboardSettings from "./StarboardSettings";
import { Suspense } from 'react';
import StarboardStats from "./StarboardStats";

export default function DashboardStarboardConfig({ id }: { id: string }) {
    let { data: starboard } = useQuery(["data_starboard", id], async () => await fetch(`/api/v1/servers/${id}/starboard`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    return (<main className={"bg-gray-950 flex-grow"}>
        <div className={"animate-fadeIn flex max-md:items-center flex-col py-5 md:px-5 gap-5"}>
        <h1 className={"header text-6xl max-md:text-5xl"}>starboard</h1>
        <span className={"flex flex-row max-md:flex-col gap-10"}>
            <Suspense fallback={null}>
                <StarboardSettings server={starboard}/>
                <StarboardStats server={starboard?.data}/>
            </Suspense>
        </span>
        </div>
        
            
        </main>)
}