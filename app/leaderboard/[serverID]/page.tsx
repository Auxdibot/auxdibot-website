"use client";

import LeaderboardNotFound from "@/components/public/leaderboard/LeaderboardNotFound";
import { LeaderboardPayload } from "@/lib/types/LeaderboardPayload";
import { useQuery } from "react-query";
import { useMediaQuery } from "react-responsive";

export default function LeaderboardPage({ params }: { params: { serverID: string } }) {
    const { data, status, error } = useQuery<LeaderboardPayload | { error: string } | undefined>([params.serverID, 'card'], async () => await fetch(`/bot/v1/leaderboard/${params.serverID}`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    if (status == 'loading') return <></>
    if ((!data) || error || (data && 'error' in data)) { return <LeaderboardNotFound/> }
    
    
    
    return (
    <main className={`flex flex-col max-md:p-1 justify-center items-center overflow-x-hidden`}>
        <div>

        </div>
        <ul>
            {data?.leaderboard.toString()}
        </ul>
        
    </main>)
}