'use client';

import Image from 'next/image';
import Link from 'next/link';
import MiniProfile from './MiniProfile';
import MiniServer from './MiniServer';
import { Book, DollarSign, Sparkle } from 'lucide-react';

export default function LayoutNavbar({
    dashboard,
    premiumIcon,
    serverID,
}: {
    dashboard?: boolean;
    premiumIcon?: boolean;
    serverID?: string;
}) {
    return (
        <>
            <nav
                className={`${dashboard ? 'fixed border-b border-gray-800 bg-gradient-to-br from-gray-900 to-black' : 'fixed left-1/2 mt-4 max-w-4xl -translate-x-1/2 rounded-full border-opacity-50 bg-opacity-30 backdrop-blur-3xl sm:w-[90%]'} items-between z-50 flex h-20 w-full justify-between gap-10 px-5 py-2 align-middle transition-all max-md:gap-4`}
            >
                {!dashboard ? (
                    <div className='absolute -inset-0 -z-10 rounded-full border-2 border-zinc-100 bg-gradient-to-br from-zinc-200 to-zinc-500 opacity-[15%]' />
                ) : (
                    ''
                )}

                <div
                    className={
                        'flex flex-1 items-center justify-between gap-5 font-montserrat text-gray-100 max-md:ml-2'
                    }
                >
                    <Link
                        href={process.env.NEXT_PUBLIC_DOCUMENTATION_LINK ?? ''}
                        className={
                            'max-sm:text-md before:hover-underline before:primary-gradient group relative flex items-center gap-2 text-xl transition-all hover:before:scale-100'
                        }
                    >
                        <Book
                            className={
                                'origin-center transition-all group-hover:scale-110 group-hover:text-orange-500'
                            }
                        />{' '}
                        <span className={'tracking-wide max-lg:hidden'}>
                            docs
                        </span>
                    </Link>
                    <Link
                        href={process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK || ''}
                        target='_blank'
                        className={
                            'max-sm:text-md before:hover-underline before:primary-gradient group relative flex items-center gap-2 text-xl hover:before:scale-100 max-[320px]:hidden'
                        }
                    >
                        <Sparkle
                            className={
                                'origin-center transition-all group-hover:scale-110 group-hover:text-orange-500'
                            }
                        />{' '}
                        <span className={'tracking-wide max-lg:hidden'}>
                            invite bot
                        </span>
                    </Link>
                </div>
                <Link
                    href={'/'}
                    className={
                        'mx-2 flex min-w-fit flex-row items-center justify-center gap-2 sm:mx-4'
                    }
                >
                    <Image
                        src={premiumIcon ? '/premium.png' : '/logo.png'}
                        alt={'Auxdibot icon.'}
                        className={
                            'inline-block align-middle transition-all hover:scale-110'
                        }
                        width={50}
                        height={50}
                        quality='100'
                        priority
                    />
                </Link>
                <div
                    className={
                        'flex flex-1 items-center justify-between gap-5 font-montserrat text-gray-100 max-[320px]:justify-end'
                    }
                >
                    <Link
                        href={'/premium'}
                        className={
                            'max-sm:text-md before:hover-underline group relative flex h-fit items-center gap-2 text-xl before:bg-gradient-to-br before:from-yellow-200 before:to-yellow-600 hover:before:scale-100 max-[320px]:hidden'
                        }
                    >
                        <DollarSign
                            className={
                                'origin-center transition-all group-hover:scale-110 group-hover:text-yellow-500'
                            }
                        />{' '}
                        <span className={'tracking-wide max-lg:hidden'}>
                            premium
                        </span>
                    </Link>
                    {serverID && (
                        <MiniServer
                            serverID={serverID}
                            className={
                                'relative ml-auto flex items-center justify-center gap-2 max-[460px]:hidden xl:min-w-[350px]'
                            }
                        />
                    )}
                    <MiniProfile
                        className={
                            'justify-right relative flex items-center gap-2'
                        }
                    />
                </div>
            </nav>
            {!dashboard ? '' : <div className={'h-20'}></div>}
        </>
    );
}
