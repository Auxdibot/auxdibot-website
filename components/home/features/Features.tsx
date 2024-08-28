import Link from 'next/link';
import { Button } from '../../ui/button/button';
import {
    BellRing,
    Clock,
    Hand,
    Handshake,
    Image,
    Medal,
    MessageCircle,
    Scroll,
    ShieldAlert,
    Star,
    Tag,
} from 'lucide-react';
import { FeaturesHeader } from './FeaturesHeader';

export function Features() {
    return (
        <section className='bg-zinc bg-opacity-50 py-5'>
            <FeaturesHeader />
            <div className='mx-auto grid max-w-7xl grid-cols-3 gap-4 max-lg:grid-cols-2 max-lg:px-5 max-sm:flex max-sm:grid-cols-1 max-sm:flex-col'>
                <div className='flex cursor-pointer flex-col rounded-lg border-2 border-zinc-800 bg-gradient-to-bl from-zinc-300/5 to-zinc-900/5 p-4 shadow transition-colors hover:bg-zinc-500/5'>
                    <h2 className='flex items-center gap-2 font-raleway text-2xl font-bold text-zinc-200'>
                        <ShieldAlert />{' '}
                        <span className='flex items-center'>
                            Moderation{' '}
                            <Link
                                href={
                                    process.env.NEXT_PUBLIC_DOCUMENTATION_LINK +
                                    '/modules/moderation'
                                }
                            >
                                <Button className='text-sm' variant='link'>
                                    [docs]
                                </Button>
                            </Link>
                        </span>
                    </h2>
                    <p className='font-inter text-sm text-zinc-200'>
                        Auxdibot&apos;s moderation suite features a tracked
                        punishment history, a variety of moderation commands, a
                        reporting tool, and more. Moderators have a tool for
                        every situation with Auxdibot&apos;s moderation suite.
                    </p>
                </div>
                <div className='flex cursor-pointer flex-col rounded-lg border-2 border-zinc-800 bg-gradient-to-bl from-zinc-300/5 to-zinc-900/5 p-4 shadow transition-colors hover:bg-zinc-500/5'>
                    <h2 className='flex items-center gap-2 font-raleway text-2xl font-bold text-zinc-200'>
                        <MessageCircle />{' '}
                        <span className='flex items-center'>
                            Embeds{' '}
                            <Link
                                href={
                                    process.env.NEXT_PUBLIC_DOCUMENTATION_LINK +
                                    '/modules/embeds'
                                }
                            >
                                <Button className='text-sm' variant='link'>
                                    [docs]
                                </Button>
                            </Link>
                        </span>
                    </h2>
                    <p className='font-inter text-sm text-zinc-200'>
                        Create fleshed out custom Discord Embeds with
                        Auxdibot&apos;s embeds feature. Featuring an easy-to-use
                        editor, you can create embeds with a variety of fields
                        and colors.
                    </p>
                </div>
                <div className='flex cursor-pointer flex-col rounded-lg border-2 border-zinc-800 bg-gradient-to-bl from-zinc-300/5 to-zinc-900/5 p-4 shadow transition-colors hover:bg-zinc-500/5'>
                    <h2 className='flex items-center gap-2 font-raleway text-2xl font-bold text-zinc-200'>
                        <Tag />{' '}
                        <span className='flex items-center'>
                            Roles{' '}
                            <Link
                                href={
                                    process.env.NEXT_PUBLIC_DOCUMENTATION_LINK +
                                    '/modules/roles'
                                }
                            >
                                <Button className='text-sm' variant='link'>
                                    [docs]
                                </Button>
                            </Link>
                        </span>
                    </h2>
                    <p className='font-inter text-sm text-zinc-200'>
                        Auxdibot comes with a variety of role management
                        features to help you integrate your Discord server roles
                        into Auxdibot. Auxdibot includes reaction roles, join
                        roles, sticky roles, and more.
                    </p>
                </div>
                <div className='flex cursor-pointer flex-col rounded-lg border-2 border-zinc-800 bg-gradient-to-bl from-zinc-300/5 to-zinc-900/5 p-4 shadow transition-colors hover:bg-zinc-500/5'>
                    <h2 className='flex items-center gap-2 font-raleway text-2xl font-bold text-zinc-200'>
                        <BellRing />{' '}
                        <span className='flex items-center'>
                            Notifications{' '}
                            <Link
                                href={
                                    process.env.NEXT_PUBLIC_DOCUMENTATION_LINK +
                                    '/modules/notifications'
                                }
                            >
                                <Button className='text-sm' variant='link'>
                                    [docs]
                                </Button>
                            </Link>
                        </span>
                    </h2>
                    <p className='font-inter text-sm text-zinc-200'>
                        Auxdibot&apos;s notifications allow you to subscribe to
                        alerts from your favorite YouTube channel, Twitch
                        channel, or RSS feed! Get notified when your favorite
                        content creator uploads a new video or goes live.
                    </p>
                </div>
                <div className='flex cursor-pointer flex-col rounded-lg border-2 border-zinc-800 bg-gradient-to-bl from-zinc-300/5 to-zinc-900/5 p-4 shadow transition-colors hover:bg-zinc-500/5'>
                    <h2 className='flex items-center gap-2 font-raleway text-2xl font-bold text-zinc-200'>
                        <Handshake />{' '}
                        <span className='flex items-center'>
                            Suggestions{' '}
                            <Link
                                href={
                                    process.env.NEXT_PUBLIC_DOCUMENTATION_LINK +
                                    '/modules/suggestions'
                                }
                            >
                                <Button className='text-sm' variant='link'>
                                    [docs]
                                </Button>
                            </Link>
                        </span>
                    </h2>
                    <p className='font-inter text-sm text-zinc-200'>
                        Receive feedback from your server members with
                        Auxdibot&apos;s suggestion system. Members can submit
                        suggestions and vote on them, and moderators can respond
                        to them with a reason and status.
                    </p>
                </div>
                <div className='flex cursor-pointer flex-col rounded-lg border-2 border-zinc-800 bg-gradient-to-bl from-zinc-300/5 to-zinc-900/5 p-4 shadow transition-colors hover:bg-zinc-500/5'>
                    <h2 className='flex items-center gap-2 font-raleway text-2xl font-bold text-zinc-200'>
                        <Star />{' '}
                        <span className='flex items-center'>
                            Starboard{' '}
                            <Link
                                href={
                                    process.env.NEXT_PUBLIC_DOCUMENTATION_LINK +
                                    '/modules/starboard'
                                }
                            >
                                <Button className='text-sm' variant='link'>
                                    [docs]
                                </Button>
                            </Link>
                        </span>
                    </h2>
                    <p className='font-inter text-sm text-zinc-200'>
                        Showcase your community highlights with Auxdibot&apos;s
                        Starboard feature! When a message reaches a certain
                        amount of reactions, it will be showcased in a starboard
                        channel.
                    </p>
                </div>
                <div className='flex cursor-pointer flex-col rounded-lg border-2 border-zinc-800 bg-gradient-to-bl from-zinc-300/5 to-zinc-900/5 p-4 shadow transition-colors hover:bg-zinc-500/5'>
                    <h2 className='flex items-center gap-2 font-raleway text-2xl font-bold text-zinc-200'>
                        <Clock />{' '}
                        <span className='flex items-center'>
                            Schedules{' '}
                            <Link
                                href={
                                    process.env.NEXT_PUBLIC_DOCUMENTATION_LINK +
                                    '/modules/schedules'
                                }
                            >
                                <Button className='text-sm' variant='link'>
                                    [docs]
                                </Button>
                            </Link>
                        </span>
                    </h2>
                    <p className='font-inter text-sm text-zinc-200'>
                        Schedule reminders for events, meetings, and more with
                        Auxdibot&apos;s schedules feature. Schedules can utilize
                        custom embeds, placeholders, timestamps, and more.
                    </p>
                </div>
                <div className='flex cursor-pointer flex-col rounded-lg border-2 border-zinc-800 bg-gradient-to-bl from-zinc-300/5 to-zinc-900/5 p-4 shadow transition-colors hover:bg-zinc-500/5'>
                    <h2 className='flex items-center gap-2 font-raleway text-2xl font-bold text-zinc-200'>
                        <Hand />{' '}
                        <span className='flex items-center'>
                            Greetings{' '}
                            <Link
                                href={
                                    process.env.NEXT_PUBLIC_DOCUMENTATION_LINK +
                                    '/modules/greetings'
                                }
                            >
                                <Button className='text-sm' variant='link'>
                                    [docs]
                                </Button>
                            </Link>
                        </span>
                    </h2>
                    <p className='font-inter text-sm text-zinc-200'>
                        Greet members as they join your server with
                        Auxdibot&apos;s greetings feature. Greetings can be
                        customized using Auxdibot&apos;s Discord Embed creator.
                    </p>
                </div>
                <div className='flex cursor-pointer flex-col rounded-lg border-2 border-zinc-800 bg-gradient-to-bl from-zinc-300/5 to-zinc-900/5 p-4 shadow transition-colors hover:bg-zinc-500/5'>
                    <h2 className='flex items-center gap-2 font-raleway text-2xl font-bold text-zinc-200'>
                        <Scroll />{' '}
                        <span className='flex items-center'>
                            Logging{' '}
                            <Link
                                href={
                                    process.env.NEXT_PUBLIC_DOCUMENTATION_LINK +
                                    '/modules/logging'
                                }
                            >
                                <Button className='text-sm' variant='link'>
                                    [docs]
                                </Button>
                            </Link>
                        </span>
                    </h2>
                    <p className='font-inter text-sm text-zinc-200'>
                        Log messages and moderation actions with more depth than
                        Discord&apos;s Audit Log system with Auxdibot&apos;s
                        logging feature. Trace the latest actions taken on your
                        server, and keep a record of everything that happens.
                    </p>
                </div>
                <div className='flex cursor-pointer flex-col rounded-lg border-2 border-zinc-800 bg-gradient-to-bl from-zinc-300/5 to-zinc-900/5 p-4 shadow transition-colors hover:bg-zinc-500/5'>
                    {/*eslint-disable-next-line jsx-a11y/alt-text*/}
                    <h2 className='flex items-center gap-2 font-raleway text-2xl font-bold text-zinc-200'>
                        <Image />{' '}
                        <span className='flex items-center'>
                            Cards{' '}
                            <Link
                                href={
                                    process.env.NEXT_PUBLIC_DOCUMENTATION_LINK +
                                    '/navigating/dashboard'
                                }
                            >
                                <Button className='text-sm' variant='link'>
                                    [docs]
                                </Button>
                            </Link>
                        </span>
                    </h2>
                    <p className='font-inter text-sm text-zinc-200'>
                        Experience the future of server presentation with
                        Auxdibot&apos;s cards feature. Cards are a way to
                        present your server to the world in a unique way. Create
                        a custom website for your server with a library of
                        various fonts and backgrounds.
                    </p>
                </div>
                <div className='col-span-2 flex cursor-pointer rounded-lg border-2 border-zinc-800 bg-gradient-to-bl from-zinc-400/20 to-zinc-900/20 p-4 shadow max-sm:flex-col max-sm:gap-2'>
                    <div className='flex-1'>
                        <h2 className='flex items-center gap-2 font-raleway text-2xl font-bold text-zinc-200'>
                            <Medal />{' '}
                            <span className='flex items-center'>
                                Levels{' '}
                                <span className='ml-2 rounded-md border px-1 text-base'>
                                    UPDATED
                                </span>
                                <Link
                                    href={
                                        process.env
                                            .NEXT_PUBLIC_DOCUMENTATION_LINK +
                                        '/modules/levels'
                                    }
                                >
                                    <Button className='text-sm' variant='link'>
                                        [docs]
                                    </Button>
                                </Link>
                            </span>
                        </h2>
                        <p className='font-inter text-sm text-zinc-200'>
                            Incentivize your members to chat on your server with
                            Auxdibot&apos;s levels feature. Members can earn
                            experience, level up, and gain role rewards by
                            chatting on a server with Auxdibot&apos;s Levels
                            module enabled.
                        </p>
                    </div>
                    <div className='flex flex-1 flex-col sm:items-center'>
                        <h2 className='mb-2 flex items-center gap-2 font-raleway text-2xl font-bold text-zinc-200'>
                            New Features
                        </h2>
                        <ul className='font-inter text-zinc-200'>
                            <li>XP Multipliers</li>
                            <li>Leaderboard Website</li>
                            <li>Level Messages</li>
                            <li>Randomized XP</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
