'use client';

import { useQuery, useQueryClient } from 'react-query';
import { useToast } from '@/components/ui/use-toast';
import { BsTrash } from 'react-icons/bs';
import { Role } from '@/components/ui/role';
import Roles from '@/components/ui/select/roles';

export default function RequiredRoles({
    id,
    command,
    subcommand,
    required,
}: {
    readonly id: string;
    readonly command: string;
    readonly subcommand?: string[];
    readonly required: string[];
}) {
    const { data: roles } = useQuery(['data_roles', id], async () => {
        const res = await fetch(`/bot/v1/servers/${id}/roles`);
        return await res.json();
    });

    const { toast } = useToast();
    const queryClient = useQueryClient();
    function submit(role: string) {
        let body = new URLSearchParams();

        body.append(
            'command',
            command + (subcommand ? ' ' + subcommand.join(' ') : '')
        );
        body.append('role', role ?? '');

        fetch(`/bot/v1/servers/${id}/commands/roles`, { method: 'PATCH', body })
            .then(async (res) => {
                const json = await res.json().catch(() => undefined);
                queryClient.invalidateQueries(['data_command_permissions', id]);
                if (!json || json['error']) {
                    toast({
                        title: 'Failed to add required role',
                        description:
                            json?.error ??
                            'An error occurred while adding a required role.',
                        status: 'error',
                    });
                    return;
                }
                toast({
                    title: 'Added Required Role',
                    description: `The command "/${command + ' ' + subcommand?.join(' ')}" can exclusively be used by users with the role @${roles?.find((i: { id: string; name: string }) => i.id == role)?.name ?? 'Unknown'} and any other required role specified.`,
                    status: 'success',
                });
            })
            .catch(() => {});
    }
    function deleteRole(role: string) {
        let body = new URLSearchParams();

        body.append(
            'command',
            command + (subcommand ? ' ' + subcommand.join(' ') : '')
        );
        body.append('role', role ?? '');

        fetch(`/bot/v1/servers/${id}/commands/roles`, {
            method: 'DELETE',
            body,
        })
            .then(async (res) => {
                const json = await res.json().catch(() => undefined);
                queryClient.invalidateQueries(['data_command_permissions', id]);
                if (!json || json['error']) {
                    toast({
                        title: 'Failed to remove required role',
                        description:
                            json?.error ??
                            'An error occurred while removing a required role.',
                        status: 'error',
                    });
                    return;
                }
                toast({
                    title: 'Removed Blacklisted Role',
                    description: `Users with the role @${roles?.find((i: { id: string; name: string }) => i.id == role)?.name ?? 'Unknown'} are no longer exclusively allowed to use the command "/${command + ' ' + subcommand?.join(' ')}".`,
                    status: 'success',
                });
            })
            .catch(() => {});
    }
    return (
        <>
            <Roles
                serverID={id}
                onChange={({ role }) => role && submit(role)}
                required
                value={''}
            />
            {required && required.length > 0 ? (
                <ul
                    className={
                        'mx-auto my-4 flex w-fit flex-col items-center justify-center gap-1 rounded-2xl border border-gray-800 p-2'
                    }
                >
                    {required.map((i, index) => (
                        <span className={'flex items-center gap-2'} key={index}>
                            <Role roleID={i} serverID={id} key={i} />
                            <span
                                className={
                                    'secondary flex flex-row items-center gap-2 text-xl text-gray-300'
                                }
                            >
                                <button
                                    className={
                                        'hover-gradient w-fit rounded-2xl border border-gray-700 p-1 text-xl text-gray-600 transition-all hover:border-black hover:text-black'
                                    }
                                    onClick={() => deleteRole(i)}
                                >
                                    <BsTrash />
                                </button>
                            </span>
                        </span>
                    ))}
                </ul>
            ) : (
                <span className={'text-center font-open-sans text-gray-400'}>
                    No required roles found.
                </span>
            )}
        </>
    );
}
