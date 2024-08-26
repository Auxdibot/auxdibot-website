'use client';

import { BsAward, BsCheckLg } from 'react-icons/bs';
import { useState } from 'react';
import { useQueryClient } from 'react-query';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button/button';
import { useToast } from '@/components/ui/use-toast';
import { LevelPayload } from '../DashboardLevelsConfig';
export default function LevelVoiceXP({ server }: { server: LevelPayload }) {
    const [voiceXP, setVoiceXP] = useState<(number | string)[]>([
        server.voice_xp_range[0] ?? 0,
        server.voice_xp_range[1] ?? 0,
    ]);
    const [success, setSuccess] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function onVoiceXPChange(e: (string | number)[]) {
        if (success) setSuccess(false);

        setVoiceXP(e);
    }
    function setVoiceXPGiven() {
        if (!server) return;
        const body = new URLSearchParams();

        body.append('voice_xp', voiceXP ? voiceXP.join('-') : '');
        fetch(`/bot/v1/servers/${server.serverID}/levels/voice_xp`, {
            method: 'POST',
            body,
        })
            .then(async (data) => {
                const json:
                    | { data: { voice_xp_range: number[] } }
                    | { error: string } = await data
                    .json()
                    .catch(() => undefined);
                if (!json || 'error' in json) {
                    toast({
                        title: 'Failed to update voice XP',
                        description: json['error'] ?? 'An error occured',
                        status: 'error',
                    });
                    return;
                }

                toast({
                    title: 'Message XP Updated',
                    description: `Successfully updated voice XP to be ${!json.data.voice_xp_range[1] ? json.data.voice_xp_range?.join(' to ') : json.data.voice_xp_range[0]} XP.`,
                    status: 'success',
                });
                queryClient.invalidateQueries(['data_levels', server.serverID]);
                setVoiceXP([
                    server.voice_xp_range[0] ?? 0,
                    server.voice_xp_range[1] ?? 0,
                ]);
            })
            .catch(() => {});
    }

    return (
        <div className={'mx-auto flex w-fit flex-col gap-1 p-4'}>
            <label
                className={'flex flex-col text-lg font-bold max-md:text-center'}
            >
                Voice XP
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
                            value={Number(voiceXP[0]) || 0}
                            className={'rounded-r-none border-0'}
                            onChange={(e) =>
                                onVoiceXPChange([e.target.value, voiceXP[1]])
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
                            value={Number(voiceXP[1]) || 0}
                            className={'rounded-none border-0'}
                            onChange={(e) =>
                                onVoiceXPChange([voiceXP[0], e.target.value])
                            }
                        />
                    </span>
                </div>
                <Button
                    onClick={() => setVoiceXPGiven()}
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
