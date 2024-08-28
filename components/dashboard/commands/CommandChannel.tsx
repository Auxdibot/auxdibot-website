'use client';

import { BsCheckLg, BsSlash } from 'react-icons/bs';
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import Channels from '@/components/ui/select/channels';
import { Button } from '@/components/ui/button/button';
import { useToast } from '@/components/ui/use-toast';
export default function CommandChannel({
    server,
}: {
    server: { serverID: string; commands_channel?: string };
}) {
    let { data: channels } = useQuery(
        ['data_channels', server.serverID],
        async () =>
            await fetch(`/bot/v1/servers/${server.serverID}/channels`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined)
    );
    const [channel, setChannel] = useState<string | undefined>(
        server.commands_channel ?? undefined
    );
    const [success, setSuccess] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function onCommandChannelChange(e: { channel: string | undefined }) {
        if (success) setSuccess(false);

        setChannel(e.channel ?? undefined);
    }
    function setCommandChannel() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append('channel', channel ?? '');
        fetch(`/bot/v1/servers/${server.serverID}/commands/channel`, {
            method: 'POST',
            body,
        }).then(async (data) => {
            let json = await data.json();
            if (data.ok == false) {
                toast({
                    title: 'Failed to update commands channel',
                    description: json['error']
                        ? json['error']
                        : 'An error occured.',
                    status: 'error',
                });
                return;
            }
            queryClient.invalidateQueries([
                'data_command_permissions',
                server.serverID,
            ]);
            setSuccess(true);
            toast({
                title: 'Commands Channel Updated',
                description:
                    channel && channel != 'null'
                        ? `Successfully updated commands channel to: #${channels.find((c: { id: string }) => channel == c.id)?.name ?? 'Unknown'}`
                        : `Successfully disabled the commands channel for this server. ${server.commands_channel ? `Commands are no longer restricted to #${channels.find((c: { id: string }) => server.commands_channel == c.id)?.name}.` : ''} `,
                status: 'success',
            });
            setChannel('');
        });
    }
    if (!channels) return <></>;

    return (
        <span className={'flex w-fit flex-row gap-2 max-md:flex-col'}>
            <span className={'flex-1 max-md:mx-auto'}>
                <Channels
                    value={channel}
                    serverID={server.serverID}
                    onChange={(e) => onCommandChannelChange(e)}
                />{' '}
            </span>
            <Button
                onClick={() => setCommandChannel()}
                variant={'outline'}
                className={'flex w-fit items-center gap-1 max-md:mx-auto'}
                type='submit'
            >
                {success ? (
                    <>
                        <BsCheckLg /> Updated!
                    </>
                ) : (
                    <>
                        <BsSlash /> Set
                    </>
                )}
            </Button>
        </span>
    );
}
