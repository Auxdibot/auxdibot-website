'use client';

import { BsCheckLg, BsHash } from 'react-icons/bs';
import { useState } from 'react';
import Channels from '@/components/ui/select/channels';
import { useQuery } from 'react-query';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button/button';
export default function ReportsChannel({
    server,
}: {
    server: { readonly serverID: string; readonly reports_channel: string };
}) {
    let { data: channels } = useQuery(
        ['data_channels', server.serverID],
        async () =>
            await fetch(`/bot/v1/servers/${server.serverID}/channels`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined)
    );
    const [channel, setChannel] = useState<string | undefined>(
        server.reports_channel ?? undefined
    );
    const { toast } = useToast();
    const [success, setSuccess] = useState(false);
    function onReportsChannelChange(e: { channel?: string }) {
        if (success) setSuccess(false);
        if (e.channel == 'null') return setChannel(undefined);
        setChannel(e.channel ?? undefined);
    }
    function setReportsChannel() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append('reports_channel', channel || '');
        fetch(`/bot/v1/servers/${server.serverID}/moderation/reports/channel`, {
            method: 'POST',
            body,
        })
            .then(async (data) => {
                const json = await data.json().catch(() => undefined);
                if (!json || json['error']) {
                    toast({
                        title: 'Failed to set reports channel',
                        description: json['error'] || "Couldn't find error.",
                        status: 'error',
                    });
                    return;
                }
                setSuccess(true);
                toast({
                    title: 'Reports Channel Updated',
                    description: channel
                        ? `The reports channel has been updated to #${channels?.find((i: { id: string }) => i.id === channel)?.name ?? 'Unknown'}.`
                        : 'Reports channel is now disabled for this server. Reports are disabled.',
                    status: 'success',
                });
            })
            .catch(() => {});
    }

    return (
        <div
            className={
                'flex flex-1 flex-shrink-0 flex-col gap-3 p-4 md:w-fit md:items-start'
            }
        >
            <h3
                className={
                    'mx-auto flex flex-col text-center font-open-sans text-xl text-gray-300'
                }
            >
                Reports Channel
            </h3>

            <span
                className={
                    'mx-auto flex flex-col items-center justify-center gap-2 max-md:flex-col'
                }
            >
                <span className={'mx-auto'}>
                    <Channels
                        serverID={server.serverID}
                        onChange={onReportsChannelChange}
                        value={channel}
                    />
                </span>
                <Button
                    onClick={setReportsChannel}
                    className={`mx-auto flex w-fit items-center gap-2`}
                    variant={'outline'}
                    type='submit'
                >
                    {success ? (
                        <>
                            <BsCheckLg /> Updated!
                        </>
                    ) : (
                        <>
                            <BsHash /> Update
                        </>
                    )}
                </Button>
            </span>
        </div>
    );
}
