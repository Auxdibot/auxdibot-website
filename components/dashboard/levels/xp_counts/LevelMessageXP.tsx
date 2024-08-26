'use client';

import { BsAward, BsCheckLg } from 'react-icons/bs';
import { useState } from 'react';
import { useQueryClient } from 'react-query';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button/button';
import { useToast } from '@/components/ui/use-toast';
import { LevelPayload } from '../DashboardLevelsConfig';
export default function LevelMessageXP({ server }: { server: LevelPayload }) {
    const [messageXP, setMessageXP] = useState<(number | string)[]>([
        server.message_xp_range[0] ?? 0,
        server.message_xp_range[1] ?? 0,
    ]);
    const [success, setSuccess] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function onMessageXPChange(e: (string | number)[]) {
        if (success) setSuccess(false);

        setMessageXP(e);
    }
    function setMessageXPGiven() {
        if (!server) return;
        const body = new URLSearchParams();

        body.append('message_xp', messageXP ? messageXP.join('-') : '');
        fetch(`/bot/v1/servers/${server.serverID}/levels/message_xp`, {
            method: 'POST',
            body,
        })
            .then(async (data) => {
                const json:
                    | { data: { message_xp_range: number[] } }
                    | { error: string } = await data
                    .json()
                    .catch(() => undefined);
                if (!json || 'error' in json) {
                    toast({
                        title: 'Failed to update message XP',
                        description: json['error'] ?? 'An error occured',
                        status: 'error',
                    });
                    return;
                }

                toast({
                    title: 'Message XP Updated',
                    description: `Successfully updated message XP to be ${!json.data.message_xp_range[1] ? json.data.message_xp_range?.join(' to ') : json.data.message_xp_range[0]} XP.`,
                    status: 'success',
                });
                queryClient.invalidateQueries(['data_levels', server.serverID]);
                setMessageXP([
                    server.message_xp_range[0] ?? 0,
                    server.message_xp_range[1] ?? 0,
                ]);
            })
            .catch(() => {});
    }

    return (
        <div className={'mx-auto flex w-fit flex-col gap-1 p-4'}>
            <label
                className={'flex flex-col text-lg font-bold max-md:text-center'}
            >
                Message XP
            </label>
            <span
                className={'flex flex-row items-center gap-2 max-xl:flex-col'}
            >
                <div
                    className={
                        'mx-2 flex flex-row items-center justify-center rounded-2xl bg-gray-900/70 font-open-sans text-lg max-sm:text-base'
                    }
                >
                    <span
                        className={
                            'flex w-24 self-stretch rounded-l-xl border border-gray-800 bg-gray-950'
                        }
                    >
                        <Input
                            value={Number(messageXP[0]) || 0}
                            className={'rounded-r-none border-0'}
                            onChange={(e) =>
                                onMessageXPChange([
                                    e.target.value,
                                    messageXP[1],
                                ])
                            }
                        />
                    </span>
                    <span
                        className={
                            'flex items-center self-stretch whitespace-nowrap border-y border-gray-800 px-2 text-sm max-sm:hidden'
                        }
                    >
                        to
                    </span>
                    <span
                        className={
                            'flex items-center self-stretch whitespace-nowrap border-y border-gray-800 px-2 text-sm sm:hidden'
                        }
                    >
                        -
                    </span>
                    <span
                        className={
                            'flex w-24 rounded-r-xl border border-gray-800 bg-gray-950'
                        }
                    >
                        <Input
                            value={Number(messageXP[1]) || 0}
                            className={'rounded-none border-0'}
                            onChange={(e) =>
                                onMessageXPChange([
                                    messageXP[0],
                                    e.target.value,
                                ])
                            }
                        />
                    </span>
                </div>
                <Button
                    onClick={() => setMessageXPGiven()}
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
                            <BsAward /> Update
                        </>
                    )}
                </Button>
            </span>
        </div>
    );
}
