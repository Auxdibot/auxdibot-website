'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BsBook, BsDiscord, BsArrowUp, BsCurrencyDollar } from 'react-icons/bs';
import MiniProfile from './MiniProfile';
import MiniServer from './MiniServer';

// TODO: preventCollapse is now depreceated eventually redo sidebar look on dashboard and remove it
export default function LayoutNavbar({
    preventCollapse,
    premiumIcon,
    serverID,
}: {
    preventCollapse?: boolean;
    premiumIcon?: boolean;
    serverID?: string;
}) {
    return (
        <>
            <nav
                className={`${preventCollapse ? 'fixed border-b border-gray-800 bg-gradient-to-br from-gray-900 to-black' : 'fixed border-b border-b-black border-opacity-50 bg-black bg-opacity-30 backdrop-blur-3xl'} z-50 flex h-16 w-full items-center gap-10 px-5 py-2 align-middle transition-all max-md:gap-4`}
            >
                <Link
                    href={'/'}
                    className={'flex min-w-fit flex-row items-center gap-2'}
                >
                    <Image
                        src={premiumIcon ? '/premium.png' : '/logo.png'}
                        alt={'Auxdibot icon.'}
                        className={
                            'inline-block align-middle transition-all hover:scale-110'
                        }
                        width={36}
                        height={36}
                        quality='100'
                        priority
                    />
                </Link>
                <div
                    className={
                        'flex items-center gap-5 font-montserrat text-gray-100 max-md:ml-2'
                    }
                >
                    <Link
                        href={process.env.NEXT_PUBLIC_DOCUMENTATION_LINK ?? ''}
                        className={
                            'max-sm:text-md before:hover-underline before:primary-gradient group relative flex items-center gap-2 text-xl transition-all hover:before:scale-100'
                        }
                    >
                        <BsBook
                            className={
                                'origin-center transition-all group-hover:scale-110 group-hover:text-orange-500'
                            }
                        />{' '}
                        <span className={'tracking-wide max-lg:hidden'}>
                            docs
                        </span>
                    </Link>
                    <Link
                        href={process.env.NEXT_PUBLIC_DISCORD_SERVER_LINK || ''}
                        target='_blank'
                        className={
                            'max-sm:text-md before:hover-underline before:primary-gradient group relative flex items-center gap-2 text-xl hover:before:scale-100 max-[300px]:hidden'
                        }
                    >
                        <BsDiscord
                            className={
                                'origin-center transition-all group-hover:scale-110 group-hover:text-orange-500'
                            }
                        />{' '}
                        <span className={'tracking-wide max-lg:hidden'}>
                            support
                        </span>
                    </Link>
                    <Link
                        href={process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK || ''}
                        target='_blank'
                        className={
                            'max-sm:text-md before:hover-underline before:primary-gradient group relative flex items-center gap-2 text-xl hover:before:scale-100 max-[300px]:hidden'
                        }
                    >
                        <BsArrowUp
                            className={
                                'origin-center transition-all group-hover:scale-110 group-hover:text-orange-500'
                            }
                        />{' '}
                        <span className={'tracking-wide max-lg:hidden'}>
                            invite
                        </span>
                    </Link>
                    <Link
                        href={'/premium'}
                        className={
                            'max-sm:text-md before:hover-underline group relative flex items-center gap-2 text-xl before:bg-gradient-to-br before:from-yellow-200 before:to-yellow-600 hover:before:scale-100'
                        }
                    >
                        <BsCurrencyDollar
                            className={
                                'origin-center transition-all group-hover:scale-110 group-hover:text-yellow-500'
                            }
                        />{' '}
                        <span className={'tracking-wide max-lg:hidden'}>
                            premium
                        </span>
                    </Link>
                </div>
                <span className={'ml-auto flex items-center gap-2'}>
                    {serverID && (
                        <MiniServer
                            serverID={serverID}
                            className={
                                'relative ml-auto flex items-center justify-center gap-2 max-[420px]:hidden xl:min-w-[350px]'
                            }
                        />
                    )}
                    <MiniProfile
                        className={
                            'relative ml-auto flex items-center justify-center gap-2'
                        }
                    />
                </span>
            </nav>
            {!preventCollapse ? '' : <div className={'h-16'}></div>}
        </>
    );
}
