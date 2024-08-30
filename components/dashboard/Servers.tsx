'use client';

import Error from '@/app/error';
import DiscordGuild from '@/lib/types/DiscordGuild';
import PageLoading from '../PageLoading';
import useSession from '@/lib/hooks/useSession';
import { Server } from './Server';
import { HeaderButton } from '../ui/header-button';
import { Book } from 'lucide-react';

export default function Servers() {
    const { user, status } = useSession();

    if (status == 'loading') return <PageLoading />;
    if (!user?.guilds) return <Error />;
    return (
        <div className={'relative flex flex-grow flex-col justify-center py-5'}>
            <div
                className={
                    'absolute top-0 -z-10 h-screen w-full overflow-hidden bg-black bg-auxdibot-masthead bg-auto bg-no-repeat'
                }
            ></div>
            <h1 className={'header mx-auto my-5 text-6xl max-md:text-5xl'}>
                your servers
            </h1>
            <p className={'secondary text-center text-2xl'}>
                Select a server to get started with Auxdibot&apos;s Dashboard!
                <br />
                You can view the Auxdibot documentation below.
            </p>
            <HeaderButton
                className='mx-auto my-2 flex w-fit text-xl font-bold'
                target='_blank'
                href={process.env.NEXT_PUBLIC_DOCUMENTATION_LINK}
            >
                <span className='flex items-center gap-2'>
                    <Book /> Documentation
                </span>
            </HeaderButton>

            <div
                className={
                    'auto-cols-1 auto-rows-1 mx-auto grid grid-flow-row grid-cols-3 gap-5 px-2 max-md:grid-cols-1'
                }
            >
                {user.guilds.map((i: DiscordGuild) => {
                    return <Server key={i.id} server={i} />;
                })}
            </div>
        </div>
    );
}
export type ServerProps = { server: DiscordGuild };
