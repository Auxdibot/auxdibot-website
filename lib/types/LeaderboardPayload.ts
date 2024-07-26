import { LeaderboardMemberData } from "./LeaderboardMemberData"
import { PublicServerData } from "./PublicServerData"

export interface LeaderboardPayload {
    server: PublicServerData,
    leaderboard: LeaderboardMemberData[]
    total: number;
}