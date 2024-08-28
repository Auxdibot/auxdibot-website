'use client';

import { useQuery, useQueryClient } from 'react-query';
import { useToast } from '@/components/ui/use-toast';
import Channels from '@/components/ui/select/channels';
import { Channel } from '@/components/ui/channel';
import { BsTrash } from 'react-icons/bs';

export default function RequiredChannels({
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
    const { data: channels } = useQuery(['data_channels', id], async () => {
        const res = await fetch(`/bot/v1/servers/${id}/channels`);
        return await res.json();
    });

    const { toast } = useToast();
    const queryClient = useQueryClient();
    function submit(channel: string) {
        let body = new URLSearchParams();

        body.append(
            'command',
            command + (subcommand ? ' ' + subcommand.join(' ') : '')
        );
        body.append('channel', channel ?? '');

        fetch(`/bot/v1/servers/${id}/commands/channels`, {
            method: 'PATCH',
            body,
        })
            .then(async (res) => {
                const json = await res.json().catch(() => undefined);
                queryClient.invalidateQueries(['data_command_permissions', id]);
                if (!json || json['error']) {
                    toast({
                        title: 'Failed to add required channel',
                        description:
                            json?.error ??
                            'An error occurred while adding a required channel.',
                        status: 'error',
                    });
                    return;
                }
                toast({
                    title: 'Added RequiredCchannel',
                    description: `The command "/${command + ' ' + subcommand?.join(' ')}" can exclusively be used in the channel #${channels?.find((i: { id: string; name: string }) => i.id == channel)?.name ?? 'Unknown'} and other specified required channels.`,
                    status: 'success',
                });
            })
            .catch(() => {});
    }
    function deleteChannel(channel: string) {
        let body = new URLSearchParams();

        body.append(
            'command',
            command + (subcommand ? ' ' + subcommand.join(' ') : '')
        );
        body.append('channel', channel ?? '');

        fetch(`/bot/v1/servers/${id}/commands/channels`, {
            method: 'DELETE',
            body,
        })
            .then(async (res) => {
                const json = await res.json().catch(() => undefined);
                queryClient.invalidateQueries(['data_command_permissions', id]);
                if (!json || json['error']) {
                    toast({
                        title: 'Failed to remove required channel',
                        description:
                            json?.error ??
                            'An error occurred while removing a required channel.',
                        status: 'error',
                    });
                    return;
                }
                toast({
                    title: 'Removed Required Channel',
                    description: `The command "/${command + ' ' + subcommand?.join(' ')}" is now longer required to be used in the channel #${channels?.find((i: { id: string; name: string }) => i.id == channel)?.name ?? 'Unknown'}.`,
                    status: 'success',
                });
            })
            .catch(() => {});
    }
    return (
        <>
            <Channels
                serverID={id}
                onChange={({ channel }) => channel && submit(channel)}
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
                            <Channel channelID={i} serverID={id} key={i} />
                            <span
                                className={
                                    'secondary flex flex-row items-center gap-2 text-xl text-gray-300'
                                }
                            >
                                <button
                                    className={
                                        'hover-gradient w-fit rounded-2xl border border-gray-700 p-1 text-xl text-gray-600 transition-all hover:border-black hover:text-black'
                                    }
                                    onClick={() => deleteChannel(i)}
                                >
                                    <BsTrash />
                                </button>
                            </span>
                        </span>
                    ))}
                </ul>
            ) : (
                <span className={'text-center font-open-sans text-gray-400'}>
                    No required channels found.
                </span>
            )}
        </>
    );
}
