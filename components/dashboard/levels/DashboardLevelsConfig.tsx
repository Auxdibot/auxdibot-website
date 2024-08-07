"use client";

import { useQuery } from "react-query";
import LevelOutputSettings from "./message/LevelsOutputSettings";
import LevelRewardsList from "./rewards/LevelRewards";
import { APIEmbed } from "discord-api-types/v10";
import LevelXPSettings from "./xp_counts/LevelXPSettings";
import { LevelMessage } from "./message/LevelMessage";

export interface LevelPayload {
    readonly serverID: string,
    readonly level_channel: string,
    readonly level_rewards: { roleID: string, level: number, index: number }[];
    readonly message_xp_range: number[];
    readonly voice_xp_range: number[];
    readonly starboard_xp_range: number[];
    readonly event_xp_range: number[];
    readonly level_message: { content: string, embed: APIEmbed };
    readonly level_embed: boolean;
    readonly publicize_leaderboard: boolean;

}
export default function DashboardLevelsConfig({ id }: { id: string }) {
    let { data: levels } = useQuery<{ data: LevelPayload } | { error: string } | undefined>(["data_levels", id], async () => await fetch(`/bot/v1/servers/${id}/levels`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    return (<main className={"bg-gray-950 flex-grow"}>
        <div className={"animate-fadeIn flex max-md:items-center flex-col py-5 md:px-5 gap-5"}>
        <h1 className={"header text-6xl max-md:text-5xl"}>levels</h1>
        <span className={"grid grid-cols-2 max-xl:grid-cols-1 gap-10 w-full"}>
            {levels && 'data' in levels ? <>
            <LevelRewardsList server={levels.data}/>
            <LevelXPSettings server={levels.data}/>
            <LevelOutputSettings server={levels.data}/>
            <LevelMessage server={levels.data}/>
            </> : "" }
        </span>
        </div>
        
            
        </main>)
}