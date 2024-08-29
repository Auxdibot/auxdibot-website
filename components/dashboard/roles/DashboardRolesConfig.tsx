'use client';
import CreateReactionRole from './CreateReactionRole';
import { useQuery } from 'react-query';
import ReactionRoles from './ReactionRoles';
import Massrole from './Massrole';
import JoinRoles from './JoinRoles';
import StickyRoles from './StickyRoles';
import { Tag } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button/button';
import { ModuleDisableOverlay } from '../ModuleDisableOverlay';

export default function DashboardRolesConfig({ id }: { id: string }) {
    const { data: reactionRoles } = useQuery(
        ['data_reaction_roles', id],
        async () =>
            await fetch(`/bot/v1/servers/${id}/reaction_roles`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined)
    );
    const { data: joinRoles } = useQuery(
        ['data_join_roles', id],
        async () =>
            await fetch(`/bot/v1/servers/${id}/join_roles`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined)
    );
    const { data: stickyRoles } = useQuery(
        ['data_sticky_roles', id],
        async () =>
            await fetch(`/bot/v1/servers/${id}/sticky_roles`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined)
    );
    return (
        <>
            <ModuleDisableOverlay id={id} module={'Roles'} />
            <main className={'flex-grow bg-gray-950'}>
                <div
                    className={
                        'flex animate-fadeIn flex-col gap-5 py-5 max-md:items-center md:px-5'
                    }
                >
                    <span className='mb-5 mt-2 flex items-center gap-5 max-md:flex-col'>
                        <div className='flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-800 bg-gradient-to-bl from-gray-500/40 to-gray-900/40 shadow transition-colors hover:bg-gray-500/40'>
                            <Tag size={'48'} />
                        </div>
                        <div className='flex flex-col max-md:items-center max-md:text-center'>
                            <h1
                                className={
                                    'header flex items-center font-raleway text-4xl font-bold'
                                }
                            >
                                Roles
                                <Link
                                    target='_blank'
                                    href={
                                        process.env
                                            .NEXT_PUBLIC_DOCUMENTATION_LINK +
                                        '/modules/roles'
                                    }
                                >
                                    <Button className='text-sm' variant='link'>
                                        [docs]
                                    </Button>
                                </Link>
                            </h1>
                            <p className='max-w-4xl font-inter text-lg'>
                                Allows users to create reaction roles, apply
                                roles in mass, and configure join and sticky
                                roles.
                            </p>
                        </div>
                    </span>
                    <span
                        className={
                            'grid grid-cols-2 grid-rows-4 gap-10 max-xl:grid-cols-1 max-xl:grid-rows-none'
                        }
                    >
                        {reactionRoles && reactionRoles?.data?.serverID ? (
                            <>
                                {reactionRoles &&
                                reactionRoles?.data?.serverID ? (
                                    <CreateReactionRole serverID={id} />
                                ) : (
                                    ''
                                )}
                                <div
                                    className={'row-span-2 flex flex-col gap-5'}
                                >
                                    {joinRoles && joinRoles?.data?.serverID ? (
                                        <JoinRoles server={joinRoles.data} />
                                    ) : (
                                        ''
                                    )}
                                    {stickyRoles &&
                                    stickyRoles?.data?.serverID ? (
                                        <StickyRoles
                                            server={stickyRoles.data}
                                        />
                                    ) : (
                                        ''
                                    )}
                                    <Massrole
                                        serverID={reactionRoles.data.serverID}
                                    />
                                </div>

                                {reactionRoles &&
                                reactionRoles?.data?.serverID ? (
                                    <ReactionRoles
                                        server={reactionRoles.data}
                                    />
                                ) : (
                                    ''
                                )}
                            </>
                        ) : (
                            ''
                        )}
                    </span>
                </div>
            </main>
        </>
    );
}
