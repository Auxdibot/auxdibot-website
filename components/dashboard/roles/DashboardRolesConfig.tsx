'use client';
import CreateReactionRole from './CreateReactionRole';
import { useQuery } from 'react-query';
import ReactionRoles from './ReactionRoles';
import Massrole from './Massrole';
import JoinRoles from './JoinRoles';
import StickyRoles from './StickyRoles';

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
        <main className={'flex-grow bg-gray-950'}>
            <div
                className={
                    'flex animate-fadeIn flex-col gap-5 py-5 max-md:items-center md:px-5'
                }
            >
                <h1 className={'header text-6xl max-md:text-5xl'}>roles</h1>
                <span
                    className={
                        'grid grid-cols-2 grid-rows-4 gap-10 max-xl:grid-cols-1 max-xl:grid-rows-none'
                    }
                >
                    {reactionRoles && reactionRoles?.data?.serverID ? (
                        <>
                            {reactionRoles && reactionRoles?.data?.serverID ? (
                                <CreateReactionRole serverID={id} />
                            ) : (
                                ''
                            )}
                            <div className={'row-span-2 flex flex-col gap-5'}>
                                {joinRoles && joinRoles?.data?.serverID ? (
                                    <JoinRoles server={joinRoles.data} />
                                ) : (
                                    ''
                                )}
                                {stickyRoles && stickyRoles?.data?.serverID ? (
                                    <StickyRoles server={stickyRoles.data} />
                                ) : (
                                    ''
                                )}
                                <Massrole
                                    serverID={reactionRoles.data.serverID}
                                />
                            </div>

                            {reactionRoles && reactionRoles?.data?.serverID ? (
                                <ReactionRoles server={reactionRoles.data} />
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
    );
}
