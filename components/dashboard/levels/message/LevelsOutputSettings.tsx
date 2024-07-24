"use client";

import { Suspense } from 'react';
import LevelEmbed from "./LevelEmbed";
import LevelChannel from "./LevelChannel";
import { LevelPayload } from '../DashboardLevelsConfig';
import LevelLeaderboardVisibility from './LevelLeaderboardVisibility';

export default function LevelOutputSettings({ server }: { server: LevelPayload }) {

    
    return <>
    <div className={"shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Levelup Message</h2>
    <div className={"flex flex-col gap-4"}>
    <Suspense fallback={null}>
        { server ? <>
            <LevelChannel server={server}/>
            <div className={"flex flex-row max-md:flex-col md:justify-between w-fit mx-auto p-4 gap-10 text"}>
            <span className={"flex flex-row gap-2 items-center text-xl"}><LevelEmbed server={server} /> Level Embed</span>
            <span className={"flex flex-row gap-2 items-center text-xl"}><LevelLeaderboardVisibility server={server} /> Leaderboard Website</span>
            </div>
            
        </> : "" }

    </Suspense>
    
    </div>
    </div>
    </>;
}