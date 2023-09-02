"use client";

import { useQuery } from "react-query";
import LevelSettings from "./LevelSettings";
import { Suspense } from 'react';
import LevelRewards from "./LevelRewards";

export default function DashboardLevelsConfig({ id }: { id: string }) {
    let { data: levels } = useQuery(["data_levels", id], async () => await fetch(`/api/v1/servers/${id}/levels`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    return (<main className={"bg-gray-700 flex-grow"}>
        <div className={"animate-fadeIn flex max-md:items-center flex-col py-5 md:px-5 gap-5"}>
        <h1 className={"header text-6xl max-md:text-5xl"}>Levels</h1>
        <span className={"grid grid-cols-2 max-md:grid-cols-1 gap-10"}>
            {levels ? <>
            <LevelSettings server={levels}/>
            <LevelRewards server={levels}/>
            </> : "" }
        </span>
        </div>
        
            
        </main>)
}