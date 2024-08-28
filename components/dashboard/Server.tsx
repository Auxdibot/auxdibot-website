'use client';
import { useQuery } from 'react-query';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../ui/button/primary-button';
import { BsArrowUp, BsGear } from 'react-icons/bs';
import { ServerProps } from './Servers';

export function Server({ server }: ServerProps) {
    const { data } = useQuery(
        ['server_info', server.id],
        async () =>
            await fetch(`/bot/v1/servers/${server.id}`)
                .then(async (i) => await i.json().catch(() => undefined))
                .catch(() => undefined)
    );
    const acronym = server?.name
        ?.split(/[\s()]+/)
        .filter(Boolean)
        .map((i) => i.replace(/\W/g, '')[0])
        .join('');
    return (
        <span className='group relative min-w-[300px]'>
            <div className='absolute -inset-0.5 rounded-lg bg-gradient-to-tl from-orange-400 to-red-500 opacity-0 blur transition-all group-hover:opacity-50'></div>
            <div
                className={
                    'relative z-10 flex h-full w-full max-w-xs flex-col justify-between gap-2 rounded-xl border border-gray-800 bg-gray-950 pb-5 text-center'
                }
            >
                <div
                    className={
                        'relative h-32 w-full rounded-t-xl bg-contain bg-no-repeat'
                    }
                    style={{
                        backgroundImage: `url("https://cdn.discordapp.com/icons/${server.id}/${server.banner}.png")`,
                    }}
                >
                    {server.banner ? (
                        ''
                    ) : (
                        <span
                            className={`absolute top-0 flex h-full w-full cursor-pointer items-center justify-center rounded-t-xl bg-discord-bg object-cover font-roboto text-3xl text-gray-100 transition-all duration-300 ${!data ? 'grayscale' : ''}`}
                        >
                            {acronym}
                        </span>
                    )}
                </div>
                <div
                    className={
                        'flex w-full flex-1 flex-row items-center justify-between px-2'
                    }
                >
                    <div className={'relative'}>
                        <span
                            className={`absolute -top-14 flex h-20 w-20 items-center overflow-visible`}
                        >
                            <div
                                className={`rounded-[5rem] bg-gradient-to-l p-0.5 transition-all group-hover:rounded-2xl ${data ? 'from-orange-400 to-red-500' : 'bg-gradient-to-l from-gray-600 to-gray-800'}`}
                            >
                                <Link
                                    href={
                                        data
                                            ? '/dashboard/' + server.id
                                            : `${process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK}&guild_id=${server.id}`
                                    }
                                    target={data ? undefined : '_blank'}
                                >
                                    {server.icon ? (
                                        <Image
                                            src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png?size=128`}
                                            alt={server.name + ' icon'}
                                            width={80}
                                            height={80}
                                            quality='100'
                                            className={`flex h-20 w-20 cursor-pointer rounded-[5rem] bg-discord-bg transition-all duration-300 group-hover:rounded-2xl ${!data ? 'grayscale' : ''}`}
                                        />
                                    ) : (
                                        <span
                                            className={`flex h-20 w-20 cursor-pointer items-center justify-center rounded-[5rem] bg-discord-bg font-roboto text-gray-100 transition-all duration-300 hover:bg-discord-primary group-hover:rounded-2xl ${!data ? 'grayscale' : ''}`}
                                        >
                                            {acronym}
                                        </span>
                                    )}
                                </Link>
                            </div>
                        </span>
                    </div>
                    <Link
                        href={
                            data
                                ? '/dashboard/' + server.id
                                : `${process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK}&guild_id=${server.id}`
                        }
                        target={data ? undefined : '_blank'}
                    >
                        <Button
                            text={data ? 'Dashboard' : 'Invite'}
                            icon={data ? <BsGear /> : <BsArrowUp />}
                            className={
                                '!my-0 w-fit rounded-xl !px-2 py-1 text-base text-white transition-all'
                            }
                        />
                    </Link>
                </div>
                <span
                    className={
                        'text-wrap min-h-[69px] max-w-full flex-1 self-start overflow-hidden overflow-ellipsis px-2 text-left font-open-sans text-2xl max-lg:text-xl'
                    }
                >
                    {server.name}
                </span>
            </div>
        </span>
    );
}
