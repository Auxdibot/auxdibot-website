'use client';

import { Suspense } from 'react';
import { useQuery } from 'react-query';
import { BsThreeDots } from 'react-icons/bs';
import {
    CircleSlashIcon,
    MessageCircleCode,
    MessageCircleQuestion,
    Scroll,
    ShieldBan,
    Star,
    Trophy,
    User,
    Users,
} from 'lucide-react';
import { Countable } from '../ui/countable';
import { Marquee } from '../ui/marquee';
import { PiHandWaving } from 'react-icons/pi';
import Image from 'next/image';
import Link from 'next/link';

export default function Analytics() {
    let { data: analytics, status } = useQuery(
        ['analytics'],
        async () =>
            await fetch('/bot/v1/analytics')
                .then(async (data) => await data.json().catch(() => {}))
                .catch(() => {})
    );

    return (
        <Suspense fallback={<></>}>
            <span className='relative z-10 flex'>
                <div
                    className={
                        'absolute -inset-1 z-0 mx-auto w-[60%] max-w-xl overflow-hidden bg-gradient-to-br from-pink-700 from-50% to-red-500 bg-clip-content opacity-40 blur-3xl'
                    }
                />
                <span className='z-10 inline-flex w-full items-center justify-center gap-2 text-center text-4xl font-bold max-sm:flex-col'>
                    As seen on
                    <Link
                        href={process.env.NEXT_PUBLIC_TOPGG_URL ?? ''}
                        className='inline-flex items-center gap-2 bg-gradient-to-br from-pink-700 from-50% to-red-500 bg-clip-text text-transparent'
                    >
                        <Image
                            src={'/topgg.png'}
                            width={48}
                            height={48}
                            alt='Top.gg icon'
                        />{' '}
                        top.gg
                    </Link>
                </span>
            </span>
            <div
                className={
                    'mx-auto flex w-full max-w-7xl justify-center gap-4 max-lg:flex-col max-lg:gap-5 max-lg:px-10'
                }
            >
                <section className='flex w-full cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-zinc-800 bg-gradient-to-bl from-zinc-300/5 to-zinc-900/5 p-4 shadow transition-colors hover:bg-zinc-500/5'>
                    <p
                        className={
                            'flex w-max items-center gap-2 font-raleway text-6xl font-bold max-md:flex-col'
                        }
                    >
                        {status == 'success' ? (
                            <Countable start={0} end={analytics?.servers} />
                        ) : (
                            <BsThreeDots
                                className={'animate-spin text-4xl text-white'}
                            />
                        )}
                    </p>
                    <h2
                        className={
                            'flex items-center gap-2 font-raleway text-2xl font-bold text-white'
                        }
                    >
                        <Users size={'24px'} /> Servers
                    </h2>
                </section>

                <section className='flex w-full cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-zinc-800 bg-gradient-to-bl from-zinc-300/5 to-zinc-900/5 p-4 shadow transition-colors hover:bg-zinc-500/5'>
                    <p
                        className={
                            'flex w-max items-center gap-2 font-raleway text-6xl font-bold max-md:flex-col'
                        }
                    >
                        {status == 'success' ? (
                            <Countable start={0} end={analytics?.members} />
                        ) : (
                            <BsThreeDots
                                className={'animate-spin text-4xl text-white'}
                            />
                        )}
                    </p>
                    <h2
                        className={
                            'flex items-center gap-2 font-raleway text-2xl font-bold text-white'
                        }
                    >
                        <User size={'24px'} /> Members
                    </h2>
                </section>
                <section className='flex w-full cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-zinc-800 bg-gradient-to-bl from-zinc-300/5 to-zinc-900/5 p-4 shadow transition-colors hover:bg-zinc-500/5'>
                    <p
                        className={
                            'flex w-max items-center gap-2 font-raleway text-6xl font-bold max-md:flex-col'
                        }
                    >
                        {status == 'success' ? (
                            <Countable start={0} end={analytics?.commands} />
                        ) : (
                            <BsThreeDots
                                className={'animate-spin text-4xl text-white'}
                            />
                        )}
                    </p>
                    <h2
                        className={
                            'flex items-center gap-2 font-raleway text-2xl font-bold text-white'
                        }
                    >
                        <CircleSlashIcon size={'24px'} /> Actions Run
                    </h2>
                </section>
            </div>
            <Marquee>
                <section className='mx-10 flex min-w-[350px] cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-zinc-800 bg-gradient-to-bl from-zinc-300/5 to-zinc-900/5 p-4 shadow transition-colors hover:bg-zinc-500/5 max-md:min-w-[300px]'>
                    <p
                        className={
                            'flex w-max items-center gap-2 font-raleway text-6xl font-bold max-md:flex-col'
                        }
                    >
                        {status == 'success' ? (
                            <Countable
                                start={0}
                                end={analytics?.starred_messages}
                            />
                        ) : (
                            <BsThreeDots
                                className={'animate-spin text-4xl text-white'}
                            />
                        )}
                    </p>
                    <h2
                        className={
                            'flex items-center gap-2 font-raleway text-2xl font-bold text-white'
                        }
                    >
                        <Star size={'24px'} /> Starred Messages
                    </h2>
                </section>
                <section className='mx-10 flex min-w-[350px] cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-zinc-800 bg-gradient-to-bl from-zinc-300/5 to-zinc-900/5 p-4 shadow transition-colors hover:bg-zinc-500/5 max-md:min-w-[300px]'>
                    <p
                        className={
                            'flex w-max items-center gap-2 font-raleway text-6xl font-bold max-md:flex-col'
                        }
                    >
                        {status == 'success' ? (
                            <Countable start={0} end={analytics?.levelups} />
                        ) : (
                            <BsThreeDots
                                className={'animate-spin text-4xl text-white'}
                            />
                        )}
                    </p>
                    <h2
                        className={
                            'flex items-center gap-2 font-raleway text-2xl font-bold text-white'
                        }
                    >
                        <Trophy size={'24px'} /> Levelups
                    </h2>
                </section>
                <section className='mx-10 flex min-w-[350px] cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-zinc-800 bg-gradient-to-bl from-zinc-300/5 to-zinc-900/5 p-4 shadow transition-colors hover:bg-zinc-500/5 max-md:min-w-[300px]'>
                    <p
                        className={
                            'flex w-max items-center gap-2 font-raleway text-6xl font-bold max-md:flex-col'
                        }
                    >
                        {status == 'success' ? (
                            <Countable start={0} end={analytics?.logs} />
                        ) : (
                            <BsThreeDots
                                className={'animate-spin text-4xl text-white'}
                            />
                        )}
                    </p>
                    <h2
                        className={
                            'flex items-center gap-2 font-raleway text-2xl font-bold text-white'
                        }
                    >
                        <Scroll size={'24px'} /> Logs Created
                    </h2>
                </section>
                <section className='mx-10 flex min-w-[350px] cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-zinc-800 bg-gradient-to-bl from-zinc-300/5 to-zinc-900/5 p-4 shadow transition-colors hover:bg-zinc-500/5 max-md:min-w-[300px]'>
                    <p
                        className={
                            'flex w-max items-center gap-2 font-raleway text-6xl font-bold max-md:flex-col'
                        }
                    >
                        {status == 'success' ? (
                            <Countable start={0} end={analytics?.embeds} />
                        ) : (
                            <BsThreeDots
                                className={'animate-spin text-4xl text-white'}
                            />
                        )}
                    </p>
                    <h2
                        className={
                            'flex items-center gap-2 font-raleway text-2xl font-bold text-white'
                        }
                    >
                        <MessageCircleCode size={'24px'} /> Embeds Stored
                    </h2>
                </section>
                <section className='mx-10 flex min-w-[350px] cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-zinc-800 bg-gradient-to-bl from-zinc-300/5 to-zinc-900/5 p-4 shadow transition-colors hover:bg-zinc-500/5 max-md:min-w-[300px]'>
                    <p
                        className={
                            'flex w-max items-center gap-2 font-raleway text-6xl font-bold max-md:flex-col'
                        }
                    >
                        {status == 'success' ? (
                            <Countable start={0} end={analytics?.punishments} />
                        ) : (
                            <BsThreeDots
                                className={'animate-spin text-4xl text-white'}
                            />
                        )}
                    </p>
                    <h2
                        className={
                            'flex items-center gap-2 font-raleway text-2xl font-bold text-white'
                        }
                    >
                        <ShieldBan size={'24px'} /> Punishments
                    </h2>
                </section>
                <section className='mx-10 flex min-w-[350px] cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-zinc-800 bg-gradient-to-bl from-zinc-300/5 to-zinc-900/5 p-4 shadow transition-colors hover:bg-zinc-500/5 max-md:min-w-[300px]'>
                    <p
                        className={
                            'flex w-max items-center gap-2 font-raleway text-6xl font-bold max-md:flex-col'
                        }
                    >
                        {status == 'success' ? (
                            <Countable start={0} end={analytics?.suggestions} />
                        ) : (
                            <BsThreeDots
                                className={'animate-spin text-4xl text-white'}
                            />
                        )}
                    </p>
                    <h2
                        className={
                            'flex items-center gap-2 font-raleway text-2xl font-bold text-white'
                        }
                    >
                        <MessageCircleQuestion size={'24px'} /> Suggestions
                    </h2>
                </section>
                <section className='mx-10 flex min-w-[350px] cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-zinc-800 bg-gradient-to-bl from-zinc-300/5 to-zinc-900/5 p-4 shadow transition-colors hover:bg-zinc-500/5 max-md:min-w-[300px]'>
                    <p
                        className={
                            'flex w-max items-center gap-2 font-raleway text-6xl font-bold max-md:flex-col'
                        }
                    >
                        {status == 'success' ? (
                            <Countable start={0} end={analytics?.punishments} />
                        ) : (
                            <BsThreeDots
                                className={'animate-spin text-4xl text-white'}
                            />
                        )}
                    </p>
                    <h2
                        className={
                            'flex items-center gap-2 font-raleway text-2xl font-bold text-white'
                        }
                    >
                        <PiHandWaving size={'24px'} /> Greetings Sent
                    </h2>
                </section>
            </Marquee>
        </Suspense>
    );
}
