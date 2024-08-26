import { Metadata, Viewport } from 'next';
import { LeaderboardPayload } from '@/lib/types/LeaderboardPayload';
import axios from 'axios';
import LoadingLeaderboard from '@/components/public/leaderboard/LoadingLeaderboard';
import Providers from '@/components/Providers';
import LayoutNavbar from '@/components/navbar/LayoutNavbar';
import '@/styles/global.scss';
import fonts from '@/app/fonts';

interface CardProps {
    params: { readonly serverID: string };
    children: React.ReactNode;
}

export async function generateMetadata({
    params,
}: CardProps): Promise<Metadata> {
    const leaderboardData = await axios
        .get<LeaderboardPayload | { error: string } | undefined>(
            `${process.env.NEXT_PUBLIC_SITE_URL}/bot/v1/leaderboard/${params.serverID}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        .then(async (result) =>
            result.data && !('error' in result.data) ? result.data : undefined
        )
        .catch(() => undefined);
    if (!leaderboardData)
        return {
            title: 'Leaderboard Not Found',
            description:
                "Couldn't find an Auxdibot leaderboard for that server.",
            openGraph: {
                title: 'Card Not Found',
                description:
                    "Couldn't find an Auxdibot leaderboard for that server.",
                type: 'website',
                url: 'https://bot.auxdible.me',
            },
        };
    return {
        title: leaderboardData.server.name,
        description:
            'The leaderboard data for ' +
            leaderboardData.server.name +
            '. View the top users and their levels, XP, and more. Powered by Auxdibot.',
        icons: leaderboardData.server.icon_url,
        openGraph: {
            title: `${leaderboardData.server.name}`,
            description:
                'The leaderboard data for ' +
                leaderboardData.server.name +
                '. View the top users and their levels, XP, and more. Powered by Auxdibot.',
            images: leaderboardData.server.icon_url && [
                leaderboardData.server.icon_url,
            ],
            siteName: `🧍 ${leaderboardData.server.members.toLocaleString()} members`,
            type: 'website',
            url: 'https://bot.auxdible.me',
        },
    };
}
export async function generateViewport({
    params,
}: CardProps): Promise<Viewport> {
    const cardData = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/bot/v1/cards/${params.serverID}`
    )
        .then((result) => result.json())
        .then((data) => (data && !data['error'] ? data : undefined))
        .catch(() => undefined);
    if (!cardData)
        return {
            colorScheme: 'dark',
            themeColor: '#000000',
        };
    return {
        colorScheme: 'dark',
        themeColor: cardData.primary_color ?? '#000000',
    };
}

export default function ServerLeaderboardLayout({
    params,
    children,
}: CardProps) {
    return (
        <div
            className={`flex h-full flex-1 flex-col bg-gray-950 ${Object.keys(
                fonts
            )
                .map((i) => fonts[i as keyof typeof fonts].variable)
                .join(' ')}`}
        >
            <Providers>
                <LayoutNavbar preventCollapse />
                <LoadingLeaderboard serverID={params.serverID} />
                {children}
            </Providers>
        </div>
    );
}
