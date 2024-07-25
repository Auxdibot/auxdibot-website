import { User } from "@/components/ui/user";
import { LeaderboardPayload } from "@/lib/types/LeaderboardPayload";
import Image from "next/image";

export function MemberLeaderboard({ leaderboard }: { leaderboard: LeaderboardPayload['leaderboard'] }) {
    return <ul className="w-full self-stretch min-h-screen flex flex-col">
        {leaderboard.map((member) => <li key={member.user.id}>
            <span className="flex items-center gap-2">
            <span className={"flex gap-2 items-center"}>
                {member?.user.avatar ? <Image src={`https://cdn.discordapp.com/avatars/${member?.user.id}/${member?.user.avatar}.png`} width={24} height={24} className={"rounded-full max-md:hidden"} alt={`${member?.user.username}'s avatar`}/> : ""}
                {member?.user ? member?.user.username : "Unknown"}
            </span>
            <span className={"flex gap-2 items-center"}>
                
                <span className={"font-roboto text-2xl"}>{member?.xp}</span>
                <span className={"font-roboto text-2xl"}>{member?.level}</span>
                </span>
            </span>
        


            </li>)}
    </ul>
}