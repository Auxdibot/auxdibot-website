'use client';

import { Controller, useForm } from 'react-hook-form';
import { BsCheckLg, BsFileArrowUp } from 'react-icons/bs';
import { useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { AutomodSpamLimit } from '@/lib/types/AutomodSpamLimit';
import timestampToDuration from '@/lib/timestampToDuration';
import TimestampBox from '@/components/ui/timestamp-box';
import { AutomodPunishment } from '@/lib/types/AutomodPunishment';
import AttachmentsSettingsPunishment from './AttachmentsSettingsPunishment';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import durationToTimestamp from '@/lib/durationToTimestamp';
import { PunishmentNames } from '@/lib/constants/PunishmentNames';

type AttachmentsSettingsBody = { attachments: number; duration: string };

export default function AttachmentsSettings({
    server,
}: {
    server: {
        readonly serverID: string;
        readonly automod_attachments_punishment: AutomodPunishment;
        readonly automod_attachments_limit: AutomodSpamLimit;
    };
}) {
    const { control, reset, handleSubmit } = useForm<AttachmentsSettingsBody>({
        defaultValues: useMemo(
            () => ({
                attachments: server?.automod_attachments_limit?.messages ?? 0,
                duration: durationToTimestamp(
                    server?.automod_attachments_limit?.duration ?? 0
                ),
            }),
            [
                server?.automod_attachments_limit?.messages,
                server.automod_attachments_limit?.duration,
            ]
        ),
    });
    const [success, setSuccess] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function onSubmit(data: AttachmentsSettingsBody) {
        let body = new URLSearchParams();
        body.append('attachments', data.attachments?.toString() ?? '');
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

        fetch(`/bot/v1/servers/${server.serverID}/moderation/attachments/`, {
            method: 'POST',
            body,
        })
            .then(async (res) => {
                const json = await res.json().catch(() => undefined);
                if (!json || json['error']) {
                    toast({
                        title: 'Failed to update attachments limit',
                        description:
                            json?.error ??
                            'An error occurred while updating attachments settings.',
                        status: 'error',
                    });
                    return;
                }
                toast({
                    title: 'Updated Attachments Limit',
                    description:
                        data.attachments == 0 ||
                        timestampToDuration(data.duration) == 0
                            ? 'Attachments limits are disabled for this server.'
                            : `Users will now receive a ${PunishmentNames[server.automod_attachments_punishment?.punishment ?? 'WARN'].name} after sending ${data.attachments} attachments every ${data.duration}`,
                    status: 'success',
                });
                queryClient.invalidateQueries([
                    'data_moderation',
                    server.serverID,
                ]);
                setSuccess(true);
                reset({
                    attachments: json.automod_attachments_limit.messages,
                    duration: json.automod_attachments_limit.duration,
                });
            })
            .catch(() => {});
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
                    Attachments Limit
                </h2>
                <span
                    className={
                        'mx-auto block py-2 text-center font-open-sans text-sm italic text-gray-400'
                    }
                >
                    Accepts attachments and timestamp. If attachments or
                    timestamp are not set, attachments limit is disabled.
                </span>
                <section className={'my-2 flex flex-col'}>
                    <h3
                        className={
                            'flex flex-col text-center font-open-sans text-2xl text-gray-300'
                        }
                    >
                        Attachments Limits Settings
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
                                        name={'attachments'}
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
                                    attachments every
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
                                        <BsFileArrowUp /> Update
                                    </>
                                )}
                            </Button>
                        </form>
                        <AttachmentsSettingsPunishment server={server} />
                    </section>
                </section>
            </div>
        </>
    );
}
