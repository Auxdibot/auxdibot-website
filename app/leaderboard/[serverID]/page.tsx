"use client";

import LeaderboardNotFound from "@/components/public/leaderboard/LeaderboardNotFound";
import { LeaderboardServer } from "@/components/public/leaderboard/LeaderboardServer";
import { MemberLeaderboard } from "@/components/public/leaderboard/MemberLeaderboard";
import { LeaderboardPayload } from "@/lib/types/LeaderboardPayload";
import { useQuery } from "react-query";

export default function LeaderboardPage({ params }: { params: { serverID: string } }) {
    const { data, status, error } = useQuery<LeaderboardPayload | { error: string } | undefined>([params.serverID, 'card'], async () => await fetch(`/bot/v1/leaderboard/${params.serverID}`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    if (status == 'loading') return <></>
    if ((!data) || error || (data && 'error' in data)) { return <LeaderboardNotFound/> }
    
    
    
    return (
    <main className={`self-stretch flex flex-col overflow-x-hidden`}>
        <LeaderboardServer server={data.server}/>
        <MemberLeaderboard leaderboard={data.leaderboard}/>
    </main>)
}