'use client';

import { PremiumSlider } from './PremiumSlider';
import { ServerGroups } from './ServerGroups';

export default function ServerSettings(/*{ server }: { server: DiscordGuild & { data: {serverID: string, disabled_modules: string[]} } }*/) {
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
                    Server Settings
                </h2>
                <div
                    className={
                        'relative flex flex-col items-center gap-4 px-2 py-2'
                    }
                >
                    <ServerGroups />
                    <span
                        className={
                            'flex flex-row items-center gap-2 font-open-sans text-xl'
                        }
                    >
                        <PremiumSlider />
                        Enable Premium
                    </span>
                </div>
            </div>
        </>
    );
}
