import { LeaderboardPayload } from '@/lib/types/LeaderboardPayload';
import { LeaderboardMember } from './LeaderboardMember';

export function MemberLeaderboard({
    leaderboard,
    start,
}: {
    leaderboard: LeaderboardPayload['leaderboard'];
    start: number;
}) {
    return (
        <ul className='grid w-full grid-cols-2 gap-2 self-stretch max-lg:grid-cols-1'>
            {leaderboard.map((member) => {
                return (
                    <li key={member.user.id}>
                        <LeaderboardMember
                            place={leaderboard.indexOf(member) + 3 + start}
                            member={member}
                        />
                    </li>
                );
            })}
        </ul>
    );
}
