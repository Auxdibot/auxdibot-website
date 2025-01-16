'use client';

import Image from 'next/image';
import { BsArrowDownShort, BsThreeDots } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import useSession from '@/lib/hooks/useSession';
import Link from 'next/link';
import { useQueryClient } from 'react-query';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Check, User, UserCog } from 'lucide-react';
import { hasVoted } from '@/lib/hasVoted';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export default function MiniProfile(props: React.ComponentProps<any>) {
    const [expanded, setExpanded] = useState(false);
    const { user, status } = useSession();
    const queryClient = useQueryClient();
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
    function signOut() {
        return fetch(`/bot/v1/auth/signout`)
            .then(() => {
                setExpanded(false);
                queryClient.invalidateQueries('session');
            })
            .catch(() => undefined);
    }
    if (status == 'loading')
        return (
            <div {...props}>
                <BsThreeDots className={'animate-spin text-3xl text-white'} />
            </div>
        );
    return (
        <div ref={ref} {...props}>
            <span className={'text-primary-300'}></span>
            <span className={`flex flex-row gap-2`}>
                {status == 'authenticated' &&
                user?.voted_date &&
                hasVoted(new Date(user.voted_date)) ? (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Check
                                className={'cursor-pointer text-yellow-600'}
                            />
                        </TooltipTrigger>
                        <TooltipContent>
                            Thank you for voting for Auxdibot!
                        </TooltipContent>
                    </Tooltip>
                ) : (
                    ''
                )}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <span
                            className={'flex cursor-pointer items-center gap-2'}
                        >
                            {status == 'authenticated' &&
                            user?.avatar &&
                            user?.id ? (
                                <Image
                                    src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=64`}
                                    alt={'Discord profile icon'}
                                    className={
                                        'inline-block rounded-xl align-middle'
                                    }
                                    width={36}
                                    height={36}
                                    quality='100'
                                    priority
                                />
                            ) : (
                                <UserCog
                                    className={
                                        'text inline-block align-middle text-2xl'
                                    }
                                />
                            )}

                            <button
                                className={
                                    'group flex cursor-pointer flex-row items-center gap-2 font-raleway text-lg tracking-wide text-gray-200'
                                }
                            >
                                <BsArrowDownShort
                                    className={
                                        'transition-transform group-hover:translate-y-1'
                                    }
                                />
                            </button>
                        </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='translate-y-2 font-inter'>
                        <DropdownMenuLabel className='flex items-center gap-1 font-raleway text-lg font-bold'>
                            <User width={'20px'} /> User
                        </DropdownMenuLabel>
                        {status == 'authenticated' ? (
                            <>
                                <Link href={'/dashboard'}>
                                    <DropdownMenuItem>
                                        Dashboard
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem
                                    onClick={() => signOut()}
                                    className='cursor-pointer text-red-500 hover:text-red-400'
                                >
                                    Sign out
                                </DropdownMenuItem>
                            </>
                        ) : (
                            <Link href={'/bot/v1/auth/discord'}>
                                <DropdownMenuItem>Sign in</DropdownMenuItem>
                            </Link>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </span>
        </div>
    );
}
