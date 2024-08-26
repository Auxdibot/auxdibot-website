'use client';
import { CardData } from '@/lib/types/CardData';
import { BsThreeDots } from 'react-icons/bs';
import { useQuery } from 'react-query';

export default function LoadingLeaderboard({
    serverID,
}: {
    readonly serverID: string;
}) {
    const { status } = useQuery<CardData | { error: string } | undefined>(
        [serverID, 'card'],
        async () =>
            await fetch(`/bot/v1/leaderboard/${serverID}`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined)
    );
    if (status != 'loading') return <></>;
    return (
        <main
            className={
                'fixed top-0 flex h-screen w-screen flex-col items-center justify-center gap-4'
            }
        >
            <BsThreeDots className={'animate-spin text-6xl text-white'} />
            <h1 className={'animate-pulse font-montserrat text-2xl'}>
                Loading this server&apos;s leaderboard...
            </h1>
        </main>
    );
}
