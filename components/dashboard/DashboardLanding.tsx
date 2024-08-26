import { BsList } from 'react-icons/bs';
import { useMediaQuery } from 'react-responsive';
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card';
import { useRouter } from 'next/navigation';
import ModuleSlider from './settings/bot/ModuleSlider';
import { useQuery } from 'react-query';
export default function DashboardLanding({ id }: { id: string }) {
    const { data: settings } = useQuery(
        ['data_settings', id],
        async () =>
            await fetch(`/bot/v1/servers/${id}/modules`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined)
    );
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const router = useRouter();
    return (
        <main
            className={
                'flex flex-grow flex-col items-center justify-center bg-gray-950'
            }
        >
            <div
                className={'my-3 flex max-w-2xl animate-fadeIn flex-col gap-4'}
            >
                <h1 className={'header text-center text-6xl max-md:text-5xl'}>
                    dashboard
                </h1>
                <p
                    className={
                        'secondary w-fit text-center text-xl text-gray-100'
                    }
                >
                    Welcome to Auxdibot&apos;s dashboard! Select a category{' '}
                    {isMobile ? (
                        <>
                            by pressing <BsList className={'inline'} /> on
                            mobile
                        </>
                    ) : (
                        <>using the sidebar</>
                    )}{' '}
                    to begin editing the settings for your server.
                </p>
            </div>
            {settings && (
                <div
                    className={
                        'my-4 grid max-w-6xl grid-cols-3 gap-5 max-xl:grid-cols-2 max-md:grid-cols-1'
                    }
                >
                    <Card className={'col-span-1'}>
                        <CardContent className='flex flex-col gap-3 py-4'>
                            <CardTitle
                                className={
                                    'flex items-center justify-between font-montserrat text-2xl font-normal'
                                }
                            >
                                <span
                                    className={
                                        'before:hover-underline group relative cursor-pointer transition-all before:mb-1 before:bg-white hover:before:scale-100'
                                    }
                                    onClick={() => router.push(`${id}/logging`)}
                                >
                                    Moderation
                                </span>{' '}
                                <ModuleSlider
                                    module='Moderation'
                                    server={settings}
                                />
                            </CardTitle>
                            <CardDescription>
                                Auxdibot&apos;s moderation suite features a
                                tracked punishment history, a variety of
                                moderation commands, a reporting tool, and more.
                                Moderators have a tool for every situation with
                                Auxdibot&apos;s moderation suite.
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card className={'col-span-1'}>
                        <CardContent className='flex flex-col gap-3 py-4'>
                            <CardTitle
                                className={
                                    'flex items-center justify-between font-montserrat text-2xl font-normal'
                                }
                            >
                                <span
                                    className={
                                        'before:hover-underline group relative cursor-pointer transition-all before:mb-1 before:bg-white hover:before:scale-100'
                                    }
                                    onClick={() => router.push(`${id}/embeds`)}
                                >
                                    Messages
                                </span>{' '}
                                <ModuleSlider
                                    module='Messages'
                                    server={settings}
                                />
                            </CardTitle>
                            <CardDescription>
                                Create fleshed out custom Discord Embeds with
                                Auxdibot&apos;s embeds feature. Featuring an
                                easy-to-use editor, you can create embeds with a
                                variety of fields and colors.
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card className={'col-span-1'}>
                        <CardContent className='flex flex-col gap-3 py-4'>
                            <CardTitle
                                className={
                                    'flex items-center justify-between font-montserrat text-2xl font-normal'
                                }
                            >
                                <span
                                    className={
                                        'before:hover-underline group relative cursor-pointer transition-all before:mb-1 before:bg-white hover:before:scale-100'
                                    }
                                    onClick={() =>
                                        router.push(`${id}/schedules`)
                                    }
                                >
                                    Schedules
                                </span>
                            </CardTitle>
                            <CardDescription>
                                Auxdibot&apos;s method of building timed
                                messages. Administrators can schedule messages
                                to run on an interval, with custom embed content
                                and a custom start date.
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card className={'col-span-1'}>
                        <CardContent className='flex flex-col gap-3 py-4'>
                            <CardTitle
                                className={
                                    'flex items-center justify-between font-montserrat text-2xl font-normal'
                                }
                            >
                                <span
                                    className={
                                        'before:hover-underline group relative cursor-pointer transition-all before:mb-1 before:bg-white hover:before:scale-100'
                                    }
                                    onClick={() => router.push(`${id}/roles`)}
                                >
                                    Roles
                                </span>{' '}
                                <ModuleSlider
                                    module='Roles'
                                    server={settings}
                                />
                            </CardTitle>
                            <CardDescription>
                                Auxdibot comes with a variety of role management
                                features to help you integrate roles into your
                                server, including reaction roles, join roles,
                                sticky roles, and more.
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card className={'col-span-1'}>
                        <CardContent className='flex flex-col gap-3 py-4'>
                            <CardTitle
                                className={
                                    'flex items-center justify-between font-montserrat text-2xl font-normal'
                                }
                            >
                                <span
                                    className={
                                        'before:hover-underline group relative cursor-pointer transition-all before:mb-1 before:bg-white hover:before:scale-100'
                                    }
                                    onClick={() => router.push(`${id}/levels`)}
                                >
                                    Levels
                                </span>{' '}
                                <ModuleSlider
                                    module='Levels'
                                    server={settings}
                                />
                            </CardTitle>
                            <CardDescription>
                                Incentivize your members to chat on your server
                                with Auxdibot&apos;s levels feature. Members can
                                earn experience, level up, and gain role rewards
                                by chatting on a server with Auxdibot&apos;s
                                Levels module enabled.
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card className={'col-span-1'}>
                        <CardContent className='flex flex-col gap-3 py-4'>
                            <CardTitle
                                className={
                                    'flex items-center justify-between font-montserrat text-2xl font-normal'
                                }
                            >
                                <span
                                    className={
                                        'before:hover-underline group relative cursor-pointer transition-all before:mb-1 before:bg-white hover:before:scale-100'
                                    }
                                    onClick={() =>
                                        router.push(`${id}/suggestions`)
                                    }
                                >
                                    Suggestions
                                </span>{' '}
                                <ModuleSlider
                                    module='Suggestions'
                                    server={settings}
                                />
                            </CardTitle>
                            <CardDescription>
                                {' '}
                                Receive feedback from your server members with
                                Auxdibot&apos;s suggestion system. Members can
                                submit suggestions and vote on them, and
                                moderators can respond to them with a reason and
                                status.
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card className={'col-span-1'}>
                        <CardContent className='flex flex-col gap-3 py-4'>
                            <CardTitle
                                className={
                                    'flex items-center justify-between font-montserrat text-2xl font-normal'
                                }
                            >
                                <span
                                    className={
                                        'before:hover-underline group relative cursor-pointer transition-all before:mb-1 before:bg-white hover:before:scale-100'
                                    }
                                    onClick={() =>
                                        router.push(`${id}/starboard`)
                                    }
                                >
                                    Starboard
                                </span>{' '}
                                <ModuleSlider
                                    module='Starboard'
                                    server={settings}
                                />
                            </CardTitle>
                            <CardDescription>
                                Showcase your community highlights with
                                Auxdibot&apos;s starboard feature! When a
                                message reaches a certain amount of reactions,
                                it will be showcased in a starboard channel.
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card className={'col-span-1'}>
                        <CardContent className='flex flex-col gap-3 py-4'>
                            <CardTitle
                                className={
                                    'flex items-center justify-between font-montserrat text-2xl font-normal'
                                }
                            >
                                <span
                                    className={
                                        'before:hover-underline group relative cursor-pointer transition-all before:mb-1 before:bg-white hover:before:scale-100'
                                    }
                                    onClick={() =>
                                        router.push(`${id}/greetings`)
                                    }
                                >
                                    Greetings
                                </span>{' '}
                                <ModuleSlider
                                    module='Greetings'
                                    server={settings}
                                />
                            </CardTitle>
                            <CardDescription>
                                Greet members as they join your server with
                                Auxdibot&apos;s greetings feature. Greetings can
                                be customized using Auxdibot&apos;s Discord
                                Embed creator.
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card className={'col-span-1'}>
                        <CardContent className='flex flex-col gap-3 py-4'>
                            <CardTitle
                                className={
                                    'flex items-center justify-between font-montserrat text-2xl font-normal'
                                }
                            >
                                <span
                                    className={
                                        'before:hover-underline group relative cursor-pointer transition-all before:mb-1 before:bg-white hover:before:scale-100'
                                    }
                                    onClick={() =>
                                        router.push(`${id}/suggestions`)
                                    }
                                >
                                    Cards
                                </span>{' '}
                                <span
                                    className={'rounded-2xl bg-green-500 px-1'}
                                >
                                    BETA
                                </span>
                            </CardTitle>
                            <CardDescription>
                                {' '}
                                Receive feedback from your server members with
                                Auxdibot&apos;s suggestion system. Members can
                                submit suggestions and vote on them, and
                                moderators can respond to them with a reason and
                                status.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
            )}
        </main>
    );
}
