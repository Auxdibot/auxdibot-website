'use client';

import { Suspense } from 'react';

import { LevelPayload } from '../DashboardLevelsConfig';
import LevelEventXP from './LevelEventXP';
import LevelMessageXP from './LevelMessageXP';
import LevelStarboardXP from './LevelStarboardXP';
import LevelVoiceXP from './LevelVoiceXP';

export default function LevelXPSettings({ server }: { server: LevelPayload }) {
    return (
        <>
            <div
                className={
                    'w-full self-stretch rounded-2xl border-2 border-gray-800 shadow-2xl max-md:mx-auto'
                }
            >
                <h2
                    className={
                        'secondary rounded-2xl rounded-b-none p-4 text-center text-2xl'
                    }
                >
                    XP Settings
                </h2>
                <div className={'flex flex-col'}>
                    <Suspense fallback={null}>
                        {server ? (
                            <>
                                <LevelMessageXP server={server} />
                                <LevelEventXP server={server} />
                                <LevelStarboardXP server={server} />
                                <LevelVoiceXP server={server} />
                            </>
                        ) : (
                            ''
                        )}
                    </Suspense>
                    <span className='mx-auto my-1 max-w-lg text-center font-lato text-sm italic text-gray-400'>
                        Leaving one number followed by 0, ex. &quot;100&quot;
                        and &quot;0&quot;, will result in the user receiving the
                        fixed amount of XP you have specified in the first
                        number.
                    </span>
                </div>
            </div>
        </>
    );
}
