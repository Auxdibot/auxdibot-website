import { PublicServerData } from "./PublicServerData"

export interface LeaderboardPayload {
    server: PublicServerData,
    leaderboard: {
        user: {
            username: string;
            avatar: string;
            id: string;
        };
        level: number;
        xp: number;
        in_server: boolean;
        xpTill: number;
    }[]
}