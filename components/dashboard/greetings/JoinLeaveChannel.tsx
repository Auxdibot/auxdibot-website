'use client';

import { BsCheckLg } from 'react-icons/bs';
import { PiHandWavingLight } from 'react-icons/pi';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Channels from '@/components/ui/select/channels';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button/button';
export default function JoinLeaveChannel({ serverID }: { serverID: string }) {
    let { data: channels } = useQuery(
        ['data_channels', serverID],
        async () =>
            await fetch(`/bot/v1/servers/${serverID}/channels`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined)
    );
    const [channel, setChannel] = useState<string | undefined>('');
    const [success, setSuccess] = useState(false);
    const { toast } = useToast();
    function onJoinLeaveChannelChange(e: { channel: string | undefined }) {
        if (success) setSuccess(false);

        setChannel(e.channel);
    }
    function setJoinLeaveChannel() {
        if (!serverID) return;
        const body = new URLSearchParams();
        body.append('channel', channel || '');
        fetch(`/bot/v1/servers/${serverID}/greetings/channel`, {
            method: 'POST',
            body,
        })
            .then(async (data) => {
                const json = await data.json().catch(() => undefined);
                if (!json || json['error']) {
                    toast({
                        title: `Failed to update Join/Leave channel`,
                        description: json['error']
                            ? json['error']
                            : `An error occurred while updating the Join/Leave channel.`,
                        status: 'error',
                    });
                    return;
                }
                toast({
                    title: `Join/Leave Channel Updated`,
                    description: `Successfully updated the Join/Leave channel.`,
                    status: 'success',
                });
                setSuccess(true);
                setChannel(undefined);
            })
            .catch(() => {});
    }
    if (!channels) return <></>;

    return (
        <div
            className={
                'mx-auto flex w-fit flex-col gap-3 border-b border-gray-700 p-4'
            }
        >
            <span className={'secondary flex flex-col text-center text-xl'}>
                Set Join/Leave Channel
            </span>

            <span className={'flex flex-col items-center gap-2'}>
                <Channels
                    serverID={serverID}
                    value={channel}
                    onChange={onJoinLeaveChannelChange}
                />
                <Button
                    onClick={() => setJoinLeaveChannel()}
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
                            <PiHandWavingLight /> Change Join/Leave Channel
                        </>
                    )}
                </Button>
            </span>
        </div>
    );
}
