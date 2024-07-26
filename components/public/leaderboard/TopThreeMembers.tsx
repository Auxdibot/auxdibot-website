import { LeaderboardMemberData } from "@/lib/types/LeaderboardMemberData";
import { LeaderboardMember } from "./LeaderboardMember";

export function TopThreeMembers({ members }: { members: LeaderboardMemberData[] }) {
    return (
        <div className="flex flex-col w-full items-center max-w-7xl mx-auto gap-10 mb-40 justify-center">
            <span className="flex max-lg:flex-col items-center justify-center w-full">
                {members.length > 0 && <LeaderboardMember member={members[0]} place={0} />}
            </span>
            <span className="flex max-lg:flex-col max-lg:gap-10 items-center lg:justify-between w-full">
            {members.length > 1 && <LeaderboardMember member={members[1]} place={1} />}
                {members.length > 2 &&  <LeaderboardMember member={members[2]} place={2} />}
            </span>
        </div>
    )
}