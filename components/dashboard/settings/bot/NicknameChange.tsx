'use client';

import { BsCheckLg, BsPersonBadge } from 'react-icons/bs';
import { useState } from 'react';
import DiscordGuild from '@/lib/types/DiscordGuild';
import { useQueryClient } from 'react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button/button';
import { useToast } from '@/components/ui/use-toast';
export default function NicknameChange({
    server,
}: {
    server: DiscordGuild & {
        data: { serverID: string; disabled_modules: string[] };
    };
}) {
    const [nick, setNick] = useState('');
    const [success, setSuccess] = useState(false);
    const queryClient = useQueryClient();
    const { toast } = useToast();

    function onNickChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (success) setSuccess(false);
        setNick(e.currentTarget.value);
    }
    function setNickname() {
        if (!server || !server.data) return;
        const body = new URLSearchParams();
        body.append('new_nickname', nick);
        fetch(`/bot/v1/servers/${server.data.serverID}/nick`, {
            method: 'POST',
            body,
        })
            .then(async (data) => {
                const json = await data.json().catch(() => undefined);
                queryClient.invalidateQueries(['data_settings', server.id]);
                if (!json || json['error']) {
                    toast({
                        title: `Error`,
                        description: `An error occurred while updating nickname!`,
                        status: 'error',
                        duration: 5000,
                    });
                } else {
                    setSuccess(true);
                    toast({
                        title: `Updated Nickname`,
                        description: `Updated nickname to ${nick || 'Auxdibot'}!`,
                        status: 'success',
                        duration: 5000,
                    });
                }
                setNick('');
            })
            .catch(() => {});
    }
    return (
        <div
            className={
                'mx-auto flex w-fit flex-col gap-3 border-b border-gray-700 p-4'
            }
        >
            <span className={'secondary flex flex-col text-center text-xl'}>
                Update Bot Nickname
            </span>

            <span className={'mx-auto flex w-fit flex-col items-center gap-2'}>
                <Input
                    maxLength={32}
                    value={nick}
                    placeholder={'Bot name here...'}
                    onChange={(e) => onNickChange(e)}
                />
                <Button
                    onClick={() => setNickname()}
                    className={`gap-1 font-open-sans`}
                    variant={'outline'}
                    type='submit'
                >
                    {success ? (
                        <>
                            <BsCheckLg /> Updated!
                        </>
                    ) : (
                        <>
                            <BsPersonBadge /> Update Nickname
                        </>
                    )}
                </Button>
            </span>
        </div>
    );
}
