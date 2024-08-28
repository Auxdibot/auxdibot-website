'use client';

import Error from '@/app/error';
import DiscordGuild from '@/lib/types/DiscordGuild';
import PageLoading from '../PageLoading';
import Button from '../ui/button/primary-button';
import { BsBook } from 'react-icons/bs';
import useSession from '@/lib/hooks/useSession';
import { Server } from './Server';

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
            <Button
                icon={<BsBook />}
                text={'Documentation'}
                href={'/docs'}
                className={'my-4'}
            />
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
