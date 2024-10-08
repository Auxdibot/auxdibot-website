'use client';

import { useQueryClient } from 'react-query';
import { useToast } from '@/components/ui/use-toast';
import { BsTrash } from 'react-icons/bs';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select/select';
import { PermissionFlagsBits } from 'discord-api-types/v10';

export default function DiscordPermissions({
    id,
    command,
    subcommand,
    permissions,
}: {
    readonly id: string;
    readonly command: string;
    readonly subcommand?: string[];
    readonly permissions?: string[];
}) {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function submit(permission: string) {
        let body = new URLSearchParams();

        body.append(
            'command',
            command + (subcommand ? ' ' + subcommand.join(' ') : '')
        );
        body.append('permission', permission ?? '');

        fetch(`/bot/v1/servers/${id}/commands/discord_permissions`, {
            method: 'PATCH',
            body,
        })
            .then(async (res) => {
                const json = await res.json().catch(() => undefined);
                queryClient.invalidateQueries(['data_command_permissions', id]);
                if (!json || json['error']) {
                    toast({
                        title: 'Failed to add discord permission requirement',
                        description:
                            json?.error ??
                            'An error occurred while adding a discord permission requirement.',
                        status: 'error',
                    });
                    return;
                }
                toast({
                    title: 'Added Discord Permission Requirement',
                    description: `The permission ${permission} is now required to use the command "/${command + ' ' + subcommand?.join(' ')}".`,
                    status: 'success',
                });
            })
            .catch(() => {});
    }
    function deleteDiscordPermission(permission: string) {
        let body = new URLSearchParams();

        body.append(
            'command',
            command + (subcommand ? ' ' + subcommand.join(' ') : '')
        );
        body.append('permission', permission ?? '');

        fetch(`/bot/v1/servers/${id}/commands/discord_permissions`, {
            method: 'DELETE',
            body,
        })
            .then(async (res) => {
                const json = await res.json().catch(() => undefined);
                queryClient.invalidateQueries(['data_command_permissions', id]);
                if (!json || json['error']) {
                    toast({
                        title: 'Failed to remove Discord permission requirement',
                        description:
                            json?.error ??
                            'An error occurred while removing a Discord permission requirement.',
                        status: 'error',
                    });
                    return;
                }
                toast({
                    title: 'Removed Discord Permission Requirement',
                    description: `The permission ${permission} is no longer required to use the command "/${command + ' ' + subcommand?.join(' ')}".`,
                    status: 'success',
                });
            })
            .catch(() => {});
    }
    return (
        <>
            <span>
                <Select required value='' onValueChange={(i) => submit(i)}>
                    <SelectTrigger className='flex items-center gap-2'>
                        <SelectValue placeholder='Select a Discord permission' />
                    </SelectTrigger>

                    <SelectContent>
                        {Object.keys(PermissionFlagsBits).map((i: string) => (
                            <SelectItem className={'group'} key={i} value={i}>
                                <span
                                    className={
                                        'flex items-center gap-1 pl-2 transition-all group-hover:gap-2'
                                    }
                                    key={i}
                                >
                                    {i}
                                </span>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </span>
            {permissions && permissions.length > 0 ? (
                <ul
                    className={
                        'mx-auto my-4 flex w-fit flex-col items-center justify-center gap-1 rounded-2xl border border-gray-800 p-2'
                    }
                >
                    {permissions.map((i, index) => (
                        <span className={'flex items-center gap-2'} key={index}>
                            {i}
                            <span
                                className={
                                    'secondary flex flex-row items-center gap-2 text-xl text-gray-300'
                                }
                            >
                                <button
                                    className={
                                        'hover-gradient w-fit rounded-2xl border border-gray-700 p-1 text-xl text-gray-600 transition-all hover:border-black hover:text-black'
                                    }
                                    onClick={() => deleteDiscordPermission(i)}
                                >
                                    <BsTrash />
                                </button>
                            </span>
                        </span>
                    ))}
                </ul>
            ) : (
                <span className={'text-center font-open-sans text-gray-400'}>
                    No Discord permissions found.
                </span>
            )}
        </>
    );
}
