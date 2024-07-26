export interface LeaderboardMemberData {
    user: {
        username: string;
        avatar: string;
        id: string;
    };
    level: number;
    xp: number;
    in_server: boolean;
    xpTill: number;
    nextLevelXP: number;
}