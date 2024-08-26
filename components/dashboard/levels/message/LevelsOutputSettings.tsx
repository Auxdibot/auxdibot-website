'use client';

import { Suspense } from 'react';
import LevelEmbed from './LevelEmbed';
import LevelChannel from './LevelChannel';
import { LevelPayload } from '../DashboardLevelsConfig';
import LevelLeaderboardVisibility from './LevelLeaderboardVisibility';

export default function LevelOutputSettings({
    server,
}: {
    server: LevelPayload;
}) {
    return (
        <>
            <div
                className={
                    'h-fit w-full rounded-2xl border-2 border-gray-800 shadow-2xl max-md:mx-auto'
                }
            >
                <h2
                    className={
                        'secondary rounded-2xl rounded-b-none p-4 text-center text-2xl'
                    }
                >
                    Levelup Message
                </h2>
                <div className={'flex flex-col gap-4'}>
                    <Suspense fallback={null}>
                        {server ? (
                            <>
                                <LevelChannel server={server} />
                                <div
                                    className={
                                        'text mx-auto flex w-fit flex-row gap-10 p-4 max-md:flex-col md:justify-between'
                                    }
                                >
                                    <span
                                        className={
                                            'flex flex-row items-center gap-2 text-xl'
                                        }
                                    >
                                        <LevelEmbed server={server} /> Level
                                        Embed
                                    </span>
                                    <span
                                        className={
                                            'flex flex-row items-center gap-2 text-xl'
                                        }
                                    >
                                        <LevelLeaderboardVisibility
                                            server={server}
                                        />{' '}
                                        Leaderboard Website
                                    </span>
                                </div>
                            </>
                        ) : (
                            ''
                        )}
                    </Suspense>
                </div>
            </div>
        </>
    );
}
