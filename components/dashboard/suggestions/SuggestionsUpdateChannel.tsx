'use client';

import { BsCheckLg, BsDownload } from 'react-icons/bs';
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import Channels from '@/components/ui/select/channels';
import { Button } from '@/components/ui/button/button';
import { useToast } from '@/components/ui/use-toast';
export default function SuggestionsUpdateChannel({
    server,
}: {
    server: { serverID: string; suggestions_updates_channel?: string };
}) {
    let { data: channels } = useQuery(
        ['data_channels', server.serverID],
        async () =>
            await fetch(`/bot/v1/servers/${server.serverID}/channels`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined)
    );
    const [channel, setChannel] = useState<string | undefined>(
        server?.suggestions_updates_channel ?? undefined
    );
    const [success, setSuccess] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function onSuggestionsUpdateChannelChange(e: {
        channel: string | undefined;
    }) {
        if (success) setSuccess(false);

        setChannel(e.channel);
    }
    function setSuggestionsUpdateChannel() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append('suggestions_update_channel', channel || '');
        fetch(
            `/bot/v1/servers/${server.serverID}/suggestions/updates_channel`,
            { method: 'POST', body }
        )
            .then(() => {
                toast({
                    title: 'Suggestions Updates Channel Updated',
                    description: channel
                        ? `Successfully updated suggestions updates channel to: #${channels.find((c: { id: string }) => channel == c.id)?.name ?? 'Unknown'}`
                        : 'Successfully disabled suggestion updates for this server.  ',
                    status: 'success',
                });
                queryClient.invalidateQueries([
                    'data_suggestions',
                    server.serverID,
                ]);
                setSuccess(true);
                setChannel('');
            })
            .catch(() => {});
    }
    if (!channels) return <></>;

    return (
        <div className={'mx-auto flex w-fit flex-col gap-3'}>
            <span className={'secondary flex flex-col text-center text-xl'}>
                Set Suggestions Update Channel
            </span>

            <span
                className={
                    'mx-auto flex flex-row items-center gap-2 max-xl:flex-col'
                }
            >
                <Channels
                    serverID={server.serverID}
                    value={channel}
                    onChange={onSuggestionsUpdateChannelChange}
                />
                <Button
                    onClick={() => setSuggestionsUpdateChannel()}
                    className={`flex w-fit flex-row items-center gap-2 max-md:mx-auto`}
                    variant={'outline'}
                    type='submit'
                >
                    {success ? (
                        <>
                            <BsCheckLg /> Updated!
                        </>
                    ) : (
                        <>
                            <BsDownload /> Update
                        </>
                    )}
                </Button>
            </span>
        </div>
    );
}
