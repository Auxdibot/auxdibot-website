'use client';

import { useQuery } from 'react-query';
import StarboardBoards from './boards/StarboardBoards';
import { Suspense } from 'react';
import StarboardSettings from './settings/StarboardSettings';

export default function DashboardStarboardConfig({ id }: { id: string }) {
    let { data: starboard } = useQuery(
        ['data_starboard', id],
        async () =>
            await fetch(`/bot/v1/servers/${id}/starboard`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined)
    );
    return (
        <main className={'flex-grow bg-gray-950'}>
            <div
                className={
                    'flex animate-fadeIn flex-col gap-5 py-5 max-md:items-center md:px-5'
                }
            >
                <h1 className={'header text-6xl max-md:text-5xl'}>starboard</h1>
                <span className={'flex w-full flex-row gap-10 max-xl:flex-col'}>
                    <Suspense fallback={null}>
                        {starboard && <StarboardBoards server={starboard} />}
                        {starboard && <StarboardSettings server={starboard} />}
                    </Suspense>
                </span>
            </div>
        </main>
    );
}
