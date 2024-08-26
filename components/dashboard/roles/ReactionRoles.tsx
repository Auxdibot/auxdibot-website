'use client';

import { DataTable } from '@/components/ui/data-table/data-table';
import { columns } from './table/column';

export default function ReactionRoles({
    server,
}: {
    server: {
        serverID: string;
        reaction_roles: { reactions: { emoji: string }[]; messageID: string }[];
    };
}) {
    return (
        <div
            className={
                'h-fit w-full rounded-2xl border-2 border-gray-800 shadow-2xl max-md:mx-auto'
            }
        >
            <h2
                className={
                    'secondary rounded-2xl rounded-b-none p-4 text-center text-2xl'
                }
            >
                Reaction Roles
            </h2>
            <div className={'p-2 max-md:max-w-[98vw]'}>
                {server?.reaction_roles?.length ? (
                    <DataTable
                        columns={columns(server.serverID)}
                        data={server?.reaction_roles.map((i, index) => ({
                            ...i,
                            index,
                        }))}
                    />
                ) : (
                    <h2
                        className={
                            'text-center font-open-sans text-xl text-gray-400'
                        }
                    >
                        No reaction roles found.
                    </h2>
                )}
            </div>
        </div>
    );
}
