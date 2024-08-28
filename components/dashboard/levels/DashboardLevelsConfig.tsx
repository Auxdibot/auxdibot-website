'use client';

import { useQuery } from 'react-query';
import LevelOutputSettings from './message/LevelsOutputSettings';
import LevelRewardsList from './rewards/LevelRewards';
import { APIEmbed } from 'discord-api-types/v10';
import LevelXPSettings from './xp_counts/LevelXPSettings';
import { LevelMessage } from './message/LevelMessage';
import { Medal } from 'lucide-react';

export interface LevelPayload {
    readonly serverID: string;
    readonly level_channel: string;
    readonly level_rewards: { roleID: string; level: number; index: number }[];
    readonly message_xp_range: number[];
    readonly voice_xp_range: number[];
    readonly starboard_xp_range: number[];
    readonly event_xp_range: number[];
    readonly level_message: { content: string; embed: APIEmbed };
    readonly level_embed: boolean;
    readonly publicize_leaderboard: boolean;
}
export default function DashboardLevelsConfig({ id }: { id: string }) {
    let { data: levels } = useQuery<
        { data: LevelPayload } | { error: string } | undefined
    >(
        ['data_levels', id],
        async () =>
            await fetch(`/bot/v1/servers/${id}/levels`)
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
                <span className='mb-5 mt-2 flex items-center gap-5 max-md:flex-col'>
                    <div className='flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-800 bg-gradient-to-bl from-gray-500/40 to-gray-900/40 shadow transition-colors hover:bg-gray-500/40'>
                        <Medal size={'48'} />
                    </div>
                    <div className='flex flex-col max-md:items-center max-md:text-center'>
                        <h1
                            className={
                                'font-raleway text-4xl font-bold text-white'
                            }
                        >
                            Levels
                        </h1>
                        <p className='max-w-4xl font-inter text-lg'>
                            Allows members can earn experience, level up, and
                            gain role rewards by chatting on a server.
                        </p>
                    </div>
                </span>
                <span
                    className={
                        'grid w-full grid-cols-2 gap-10 max-xl:grid-cols-1'
                    }
                >
                    {levels && 'data' in levels ? (
                        <>
                            <LevelRewardsList server={levels.data} />
                            <LevelXPSettings server={levels.data} />
                            <LevelOutputSettings server={levels.data} />
                            <LevelMessage server={levels.data} />
                        </>
                    ) : (
                        ''
                    )}
                </span>
            </div>
        </main>
    );
}
