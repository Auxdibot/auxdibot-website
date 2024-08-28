'use client';

import Image from 'next/image';
import { BsArrowDownShort, BsDatabase, BsThreeDots } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import useSession from '@/lib/hooks/useSession';
import Link from 'next/link';
import { useQuery } from 'react-query';
import DiscordGuild from '@/lib/types/DiscordGuild';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';

export function Server({ server }: { server: DiscordGuild }) {
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
    if (!data) return <></>;
    return (
        <Link
            href={`/dashboard/${server.id}`}
            className={'group flex items-center gap-2 font-open-sans'}
        >
            <div className={'relative'}>
                <div className='primary-gradient absolute -inset-0.5 rounded-lg opacity-0 blur transition-all group-hover:opacity-50' />
                {server.icon ? (
                    <Image
                        src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png?size=32`}
                        alt={server.name + ' icon'}
                        width={48}
                        height={48}
                        quality='100'
                        className={`relative z-10 flex cursor-pointer rounded-[5rem] bg-discord-bg transition-all duration-300 group-hover:rounded-2xl`}
                    />
                ) : (
                    <span
                        className={`relative z-10 flex h-12 w-12 flex-shrink-0 cursor-pointer items-center justify-center rounded-[5rem] bg-discord-bg font-roboto text-sm text-gray-100 transition-all duration-300 hover:bg-discord-primary group-hover:rounded-2xl`}
                    >
                        {acronym}
                    </span>
                )}
            </div>

            {server?.name}
        </Link>
    );
}

type MiniServerProps = React.ComponentPropsWithRef<'div'> & {
    serverID: string;
};
export default function MiniServer(props: MiniServerProps) {
    const { data: server } = useQuery(
        ['server_info', props.serverID],
        async () =>
            await fetch(`/bot/v1/servers/${props.serverID}`)
                .then(async (i) => await i.json().catch(() => undefined))
                .catch(() => undefined)
    );
    const acronym = server?.name
        ?.split(/[\s()]+/)
        .filter(Boolean)
        .map((i: string) => i.replace(/\W/g, '')[0])
        .join('');
    const [expanded, setExpanded] = useState(false);
    const { user, status } = useSession();

    const ref = useRef<HTMLDivElement | null>();
    useEffect(() => {
        const clickedOutside = (e: globalThis.MouseEvent) => {
            if (
                expanded &&
                ref.current &&
                !ref.current.contains(e.target as Node)
            )
                setExpanded(false);
        };
        document.addEventListener('mousedown', clickedOutside);
        return () => document.removeEventListener('mousedown', clickedOutside);
    }, [expanded]);
    function expand() {
        setExpanded(!expanded);
    }

    if (status == 'loading')
        return (
            <div {...props}>
                <BsThreeDots className={'animate-spin text-3xl text-white'} />
            </div>
        );
    if (!user?.guilds) return <></>;
    return (
        <div ref={props.ref} {...props}>
            <DropdownMenu open={expanded}>
                <DropdownMenuTrigger>
                    <span className={'flex items-center gap-2'}>
                        {status == 'authenticated' &&
                        server?.icon &&
                        server?.id ? (
                            <Image
                                src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png?size=128`}
                                alt={'Discord profile icon'}
                                className={
                                    'inline-block rounded-xl border align-middle'
                                }
                                width={36}
                                height={36}
                                quality='100'
                                priority
                            />
                        ) : (
                            <span
                                className={`relative z-10 flex h-[36px] w-[36px] flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl border bg-discord-bg font-roboto text-xs text-gray-100 transition-all duration-300 hover:bg-discord-primary`}
                            >
                                {acronym}
                            </span>
                        )}

                        <span
                            className={
                                'group flex cursor-pointer flex-row items-center gap-2 font-montserrat text-lg tracking-wide text-gray-200'
                            }
                            onClick={() => expand()}
                        >
                            <span
                                className={'select-none text-sm max-xl:hidden'}
                            >
                                {server?.name}
                            </span>

                            <BsArrowDownShort
                                className={
                                    'transition-transform group-hover:translate-y-1'
                                }
                            />
                        </span>
                    </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={'translate-y-2 p-0'}>
                    <h1
                        className={
                            'secondary flex w-full flex-row items-center justify-center gap-2 rounded-t-xl py-3 text-lg'
                        }
                    >
                        <BsDatabase /> Servers
                    </h1>
                    <Separator className={'w-full'} />
                    <ScrollArea className={'h-48'}>
                        <ul className={'flex flex-col gap-3 p-4'}>
                            {user?.guilds?.map((i: DiscordGuild) => {
                                return <Server key={i.id} server={i} />;
                            })}
                        </ul>
                    </ScrollArea>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
