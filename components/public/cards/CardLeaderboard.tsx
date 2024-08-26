import { CardFonts } from '@/lib/constants/CardFonts';
import { CardData } from '@/lib/types/CardData';
import { LeaderboardPayload } from '@/lib/types/LeaderboardPayload';
import { useQuery } from 'react-query';
import { TopThreeMembers } from '../leaderboard/TopThreeMembers';
import { Button } from '@/components/ui/button/button';
import Link from 'next/link';

export function CardLeaderboard({
    serverID,
    data,
}: {
    serverID: string;
    readonly data: CardData;
}) {
    const { data: leaderboard, status } = useQuery<
        LeaderboardPayload | { error: string } | undefined
    >(
        ['leaderboard', serverID, 0, 3],
        async () =>
            await fetch(`/bot/v1/leaderboard/${serverID}`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined)
    );
    if (status == 'loading') return <></>;
    if (!leaderboard || status == 'error' || 'error' in leaderboard)
        return <></>;
    if (leaderboard.leaderboard.length == 0) return <></>;

    const header = CardFonts[data?.header_font || 'BAUHAUS_93'],
        text = CardFonts[data?.text_font || 'OPEN_SANS'];
    return (
        <div
            className={
                'mb-40 flex w-full max-w-7xl items-center justify-center text-center'
            }
        >
            <section
                className={`${data?.dark ? 'bg-black' : 'bg-gray-100'} ${data?.dark ? 'text-gray-100' : 'text-gray-900'} ${data?.dark ? 'border-gray-800' : 'border-gray-300'} w-full max-w-full rounded-2xl border bg-opacity-60 px-3 py-10`}
            >
                <div
                    className={`flex flex-col items-center justify-center gap-8 font-${text}`}
                >
                    <h1
                        className={`text-5xl font-${header} flex flex-col items-center justify-center`}
                    >
                        Top Members
                    </h1>
                    <TopThreeMembers members={leaderboard.leaderboard} />
                    <Link href={`/leaderboard/${serverID}`}>
                        <Button
                            variant={'outline'}
                            className={'p-8 text-2xl text-white'}
                        >
                            View Full Leaderboard
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
