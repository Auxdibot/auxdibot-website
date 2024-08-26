'use client';

import DiscordGuild from '@/lib/types/DiscordGuild';
import NicknameChange from './NicknameChange';
import { ResetDialog } from './ResetDialog';

export default function AuxdibotSettings({
    server,
}: {
    server: DiscordGuild & {
        data: { serverID: string; disabled_modules: string[] };
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
                    Bot Settings
                </h2>
                <div className={'relative flex flex-col gap-4 py-2'}>
                    <NicknameChange server={server} />
                    <ResetDialog serverID={server?.id} />
                </div>
            </div>
        </>
    );
}
