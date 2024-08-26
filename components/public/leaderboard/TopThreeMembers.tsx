import { LeaderboardMemberData } from '@/lib/types/LeaderboardMemberData';
import { LeaderboardMember } from './LeaderboardMember';

export function TopThreeMembers({
    members,
}: {
    members: LeaderboardMemberData[];
}) {
    return (
        <div className='mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-10'>
            <span className='flex w-full items-center justify-center max-lg:flex-col'>
                {members.length > 0 && (
                    <LeaderboardMember member={members[0]} place={0} />
                )}
            </span>
            <span className='flex w-full items-center max-lg:flex-col max-lg:gap-10 lg:justify-between'>
                {members.length > 1 && (
                    <LeaderboardMember member={members[1]} place={1} />
                )}
                {members.length > 2 && (
                    <LeaderboardMember member={members[2]} place={2} />
                )}
            </span>
        </div>
    );
}
