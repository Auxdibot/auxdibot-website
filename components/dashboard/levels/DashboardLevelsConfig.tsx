"use client";

import { useQuery } from "react-query";
import LevelSettings from "./LevelSettings";
import LevelRewards from "./LevelRewards";

export default function DashboardLevelsConfig({ id }: { id: string }) {
    let { data: levels } = useQuery(["data_levels", id], async () => await fetch(`/api/v1/servers/${id}/levels`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    return (<main className={"bg-gray-950 flex-grow"}>
        <div className={"animate-fadeIn flex max-md:items-center flex-col py-5 md:px-5 gap-5"}>
        <h1 className={"header text-6xl max-md:text-5xl"}>levels</h1>
        <span className={"grid grid-cols-2 max-xl:grid-cols-1 gap-10 w-full"}>
            {levels?.data ? <>
            <LevelSettings server={levels.data}/>
            <LevelRewards server={levels.data}/>
            </> : "" }
        </span>
        </div>
        
            
        </main>)
}