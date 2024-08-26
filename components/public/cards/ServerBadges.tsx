'use client';

import { CardBadge } from '@/lib/types/CardBadge';
import { CardBadgeDescriptions } from '@/lib/constants/CardBadgeDescriptions';
import { CardBadgeIcons } from '@/lib/constants/CardBadgeIcons';
import { Suspense } from 'react';
export default function ServerBadges({
    badges,
    dark,
}: {
    readonly badges: CardBadge[];
    readonly dark?: boolean;
}) {
    return (
        <Suspense fallback={<></>}>
            <span className={'flex w-fit justify-center'}>
                <span
                    className={'text-amber-600 text-blue-500 text-green-200'}
                ></span>
                <span
                    className={`flex ${dark ? 'bg-gray-950' : 'bg-gray-300'} border ${dark ? 'border-gray-800' : 'border-gray-400'} w-full justify-center gap-2 rounded-xl px-2 py-2 text-xl max-md:text-lg`}
                >
                    {badges.map((i) => (
                        <span
                            className={
                                'group relative inline-block cursor-pointer'
                            }
                            key={i}
                        >
                            <span
                                className={`absolute left-1/2 z-30 h-max origin-bottom -translate-x-1/2 -translate-y-14 scale-0 break-words rounded-2xl border border-gray-800 text-center text-base transition-all group-hover:scale-100 max-md:w-28 max-md:-translate-y-24 md:whitespace-nowrap ${!dark ? 'border-gray-400' : 'border-gray-800'} ${dark ? 'bg-gray-950' : 'bg-gray-200'} p-2 max-md:text-xs`}
                            >
                                {CardBadgeDescriptions[i]}
                            </span>
                            {CardBadgeIcons[i]}
                        </span>
                    ))}
                </span>
            </span>
        </Suspense>
    );
}
