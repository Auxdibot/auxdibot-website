import { LeaderboardPayload } from "@/lib/types/LeaderboardPayload";
import { LeaderboardMember } from "./LeaderboardMember";

export function MemberLeaderboard({ leaderboard, start }: { leaderboard: LeaderboardPayload['leaderboard'], start: number }) {
    return (
        <ul className="w-full self-stretch grid grid-cols-2 max-lg:grid-cols-1 gap-2">
            {leaderboard.map((member) => { 
                return (
                <li key={member.user.id}>
                    <LeaderboardMember place={leaderboard.indexOf(member) + 3  + start} member={member}/>
                    
                </li>
            )})}
        </ul>
    );
}
