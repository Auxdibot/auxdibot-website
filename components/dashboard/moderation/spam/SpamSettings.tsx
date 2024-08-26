'use client';

import { Controller, useForm } from 'react-hook-form';
import { BsChatDots, BsCheckLg } from 'react-icons/bs';
import { useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { AutomodSpamLimit } from '@/lib/types/AutomodSpamLimit';
import timestampToDuration from '@/lib/timestampToDuration';
import TimestampBox from '@/components/ui/timestamp-box';
import { AutomodPunishment } from '@/lib/types/AutomodPunishment';
import SpamSettingsPunishment from './SpamSettingsPunishment';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button/button';
import { useToast } from '@/components/ui/use-toast';
import { PunishmentNames } from '@/lib/constants/PunishmentNames';
import durationToTimestamp from '@/lib/durationToTimestamp';

type SpamSettingsBody = { messages: number; duration: string };

export default function SpamSettings({
    server,
}: {
    server: {
        readonly serverID: string;
        readonly automod_spam_punishment: AutomodPunishment;
        readonly automod_spam_limit: AutomodSpamLimit;
    };
}) {
    const { control, reset, handleSubmit } = useForm<SpamSettingsBody>({
        defaultValues: useMemo(
            () => ({
                messages: server?.automod_spam_limit?.messages ?? 0,
                duration: durationToTimestamp(
                    server?.automod_spam_limit?.duration ?? 0
                ),
            }),
            [
                server?.automod_spam_limit?.messages,
                server?.automod_spam_limit?.duration,
            ]
        ),
    });
    const [success, setSuccess] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function onSubmit(data: SpamSettingsBody) {
        let body = new URLSearchParams();

        body.append('messages', data.messages?.toString() ?? '');
        if (
            !timestampToDuration(data.duration) ||
            timestampToDuration(data.duration) == 'permanent'
        ) {
            toast({
                title: 'Error',
                description: 'Duration is invalid.',
                status: 'error',
            });
            return;
        }
        const duration = Number(timestampToDuration(data.duration));
        body.append('duration', duration ? duration.toString() : '0');

        fetch(`/bot/v1/servers/${server.serverID}/moderation/spam`, {
            method: 'POST',
            body,
        }).then(async (res) => {
            const json = await res.json().catch(() => undefined);
            if (!json || json['error']) {
                toast({
                    title: 'Failed to update spam limit',
                    description:
                        json?.error ??
                        'An error occurred while updating spam settings.',
                    status: 'error',
                });
                return;
            }
            toast({
                title: 'Updated Spam Limit',
                description:
                    data.messages == 0 ||
                    timestampToDuration(data.duration) == 0
                        ? 'Spam limits are disabled for this server.'
                        : `Users will now receive a ${PunishmentNames[server.automod_spam_punishment?.punishment ?? 'WARN'].name} after sending ${data.messages} messages every ${data.duration}`,
                status: 'success',
            });
            queryClient.invalidateQueries(['data_moderation', server.serverID]);
            setSuccess(true);
            reset({
                messages: json.automod_spam_limit.messages,
                duration: json.automod_spam_limit.duration,
            });
        });
    }
    return (
        <>
            <div
                className={
                    'w-full self-stretch rounded-2xl border-2 border-gray-800 shadow-2xl max-md:mx-auto'
                }
            >
                <h2
                    className={
                        'secondary rounded-2xl rounded-b-none p-4 text-center text-2xl'
                    }
                >
                    Spam Limit
                </h2>
                <span
                    className={
                        'mx-auto block py-2 text-center font-open-sans text-sm italic text-gray-400'
                    }
                >
                    Accepts messages and timestamp. If messages or timestamp are
                    not set, spam limit is disabled.
                </span>
                <section className={'my-2 flex flex-col'}>
                    <h3
                        className={
                            'flex flex-col text-center font-open-sans text-2xl text-gray-300'
                        }
                    >
                        Spam Limits Settings
                    </h3>
                    <section className={'my-2 flex flex-col gap-4'}>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className={
                                'flex flex-col items-center justify-center gap-2'
                            }
                        >
                            <div
                                className={
                                    'mx-2 flex flex-row items-center justify-center rounded-2xl bg-gray-900/70 font-open-sans text-lg max-sm:text-base'
                                }
                            >
                                <span
                                    className={
                                        'flex w-16 self-stretch rounded-l-2xl border border-gray-800 bg-gray-950'
                                    }
                                >
                                    <Controller
                                        control={control}
                                        name={'messages'}
                                        render={({ field }) => {
                                            return (
                                                <Input
                                                    max={999}
                                                    min={0}
                                                    className={
                                                        'rounded-r-none border-0'
                                                    }
                                                    type={'number'}
                                                    onChange={(e) => {
                                                        setSuccess(false);
                                                        field.onChange(e);
                                                    }}
                                                    value={field.value}
                                                />
                                            );
                                        }}
                                    />
                                </span>
                                <span
                                    className={
                                        'flex items-center self-stretch whitespace-nowrap border-y border-gray-800 px-2 text-sm max-sm:hidden'
                                    }
                                >
                                    messages every
                                </span>
                                <span
                                    className={
                                        'flex items-center self-stretch whitespace-nowrap border-y border-gray-800 px-2 text-sm sm:hidden'
                                    }
                                >
                                    /
                                </span>
                                <span
                                    className={
                                        'w-[150px] self-stretch rounded-r-2xl bg-gray-950'
                                    }
                                >
                                    <Controller
                                        control={control}
                                        name={'duration'}
                                        render={({ field }) => {
                                            return (
                                                <TimestampBox
                                                    className={
                                                        'rounded-r-2xl border border-gray-800'
                                                    }
                                                    onChange={field.onChange}
                                                    value={field.value}
                                                />
                                            );
                                        }}
                                    />
                                </span>
                            </div>
                            <Button
                                type='submit'
                                variant={'outline'}
                                className={`mx-auto flex w-fit flex-row items-center gap-2`}
                            >
                                {success ? (
                                    <>
                                        <BsCheckLg /> Updated!
                                    </>
                                ) : (
                                    <>
                                        <BsChatDots /> Update
                                    </>
                                )}
                            </Button>
                        </form>
                        <SpamSettingsPunishment server={server} />
                    </section>
                </section>
            </div>
        </>
    );
}
