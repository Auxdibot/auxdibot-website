"use client";

import LeaderboardNotFound from "@/components/public/leaderboard/LeaderboardNotFound";
import { LeaderboardPagination } from "@/components/public/leaderboard/LeaderboardPagination";
import { LeaderboardServer } from "@/components/public/leaderboard/LeaderboardServer";
import LoadingLeaderboard from "@/components/public/leaderboard/LoadingLeaderboard";
import { MemberLeaderboard } from "@/components/public/leaderboard/MemberLeaderboard";
import { TopThreeMembers } from "@/components/public/leaderboard/TopThreeMembers";
import { LeaderboardPayload } from "@/lib/types/LeaderboardPayload";
import { useSearchParams } from "next/navigation";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { useQuery } from "react-query";

export const StartContext = createContext<{ start: number, setStart: Dispatch<SetStateAction<number>> | null }>({ start: 0, setStart: null });
export default function LeaderboardPage({ params }: { params: { serverID: string } }) {
    const queryParams = useSearchParams();
    const startQuery = queryParams.get('start'),
          limit = queryParams.get('limit');
    const [start, setStart] = useState<number>(Number(startQuery) || 0);
   
    const { data, status, error } = useQuery<LeaderboardPayload | { error: string } | undefined>([params.serverID, 'leaderboard', start, limit], async () => await fetch(`/bot/v1/leaderboard/${params.serverID}?start=${start ?? ''}&limit=${limit ?? ''}`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    if (status == 'loading') return <LoadingLeaderboard serverID={params.serverID}/>
    if ((!data) || error || (data && 'error' in data)) { return <LeaderboardNotFound/> }
    
    return (
    <StartContext.Provider value={{ setStart, start }}>
    <main className={`self-stretch flex flex-col overflow-x-hidden`}>
        <LeaderboardServer server={data.server}/>
        <h1 className={"text-7xl max-sm:text-5xl mb-12 text-center header"}>leaderboard</h1>
        {Number(start) === 0 ? <TopThreeMembers members={data.leaderboard.slice(0,3)}/> : ""}
        <MemberLeaderboard leaderboard={Number(start) === 0 ? data.leaderboard.slice(3) : data.leaderboard} start={Number(start) || 0}/>
        <LeaderboardPagination total={data.total} />
    </main>
    </StartContext.Provider>
    )
}