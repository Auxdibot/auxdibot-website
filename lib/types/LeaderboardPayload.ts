export interface LeaderboardPayload {
    server: {
        name: string,
        icon_url?: string,
        members: number,
        acronym: string
    },
    leaderboard: {
        userID: string,
        level: number,
        xp: number,
        xpTill: number,
        in_server: boolean
    }[]
}