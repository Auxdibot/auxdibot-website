'use client';

import { Suspense } from 'react';
import StarboardSelfStar from './StarboardSelfStar';
import StarboardStarStarboard from './StarboardStarStarboard';
import { Separator } from '@/components/ui/separator';

export default function StarboardSettings({
    server,
}: {
    server: {
        data: {
            serverID: string;
            self_star: boolean;
            starboard_star: boolean;
        };
    };
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
                    Starboard Settings
                </h2>
                <div className={'flex flex-col items-center gap-4 py-3'}>
                    <Suspense fallback={null}>
                        {server ? (
                            <>
                                <span className='text-center text-sm italic text-gray-400'>
                                    Change whether users can star their own
                                    messages.
                                </span>
                                <span
                                    className={
                                        'flex flex-row items-center gap-2 font-open-sans text-xl'
                                    }
                                >
                                    <StarboardSelfStar server={server} /> Self
                                    Starring
                                </span>
                                <Separator className='max-w-xs' />
                                <span className='text-center text-sm italic text-gray-400'>
                                    Change whether users can star messages
                                    directly through the Starboard channel.
                                </span>
                                <span
                                    className={
                                        'flex flex-row items-center gap-2 font-open-sans text-xl'
                                    }
                                >
                                    <StarboardStarStarboard server={server} />{' '}
                                    Starboard Starring
                                </span>
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
