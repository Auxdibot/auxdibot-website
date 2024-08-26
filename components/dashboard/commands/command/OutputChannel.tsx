'use client';
import Channels from '@/components/ui/select/channels';
import { useToast } from '@/components/ui/use-toast';
import { useQuery, useQueryClient } from 'react-query';

export default function OutputChannel({
    command,
    subcommand,
    output_channel,
    id,
}: {
    command: string;
    subcommand?: string[];
    output_channel?: string;
    id: string;
}) {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const { data: channels } = useQuery(['data_channels', id], async () => {
        const res = await fetch(`/bot/v1/servers/${id}/channels`);
        return await res.json();
    });

    function setOutputChannnel(channel?: string) {
        const body = new URLSearchParams();
        body.append(
            'command',
            command + (subcommand ? ' ' + subcommand.join(' ') : '')
        );
        body.append('output_channel', channel ?? '');
        fetch(`/bot/v1/servers/${id}/commands/output_channel`, {
            method: 'POST',
            body,
        }).then(async (data) => {
            const json = await data.json().catch(() => undefined);
            queryClient.invalidateQueries(['data_command_permissions', id]);
            if (!json || json['error']) {
                toast({
                    title: `Error`,
                    description: `An error occurred while updating this command permission!`,
                    status: 'error',
                    duration: 5000,
                });
            } else {
                toast({
                    title: `Changed Command Output Channel`,
                    description: `Successfully changed the output channel for "/${command + ' ' + subcommand?.join(' ')}". Command output will be ${channel && channel != 'null' ? `redirected to #${channels.find((i: { id: string }) => i.id == channel)?.name ?? 'Unknown'}.` : "a reply to the user's message."}`,
                    status: 'success',
                    duration: 5000,
                });
            }
        });
    }
    if (!channels) return <></>;

    return (
        <span className={'w-fit min-w-[170px] flex-1 max-md:mx-auto'}>
            <Channels
                value={output_channel ?? ''}
                serverID={id}
                onChange={(e) => setOutputChannnel(e.channel)}
            />{' '}
        </span>
    );
}
