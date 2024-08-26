'use client';

import { Controller, useForm } from 'react-hook-form';
import { PunishmentType } from '@/lib/types/PunishmentType';
import { BsCheckLg, BsExclamationTriangle } from 'react-icons/bs';
import PunishmentSelect from '@/components/ui/select/punishment-select';
import { useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useToast } from '@/components/ui/use-toast';
import { PunishmentNames } from '@/lib/constants/PunishmentNames';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button/button';

type ThresholdFormBody = { punishment: PunishmentType | null; warns: number };

export default function WarnThreshold({
    server,
}: {
    server: {
        readonly serverID: string;
        readonly automod_threshold_punishment: PunishmentType;
        readonly automod_punish_threshold_warns: number;
    };
}) {
    const { control, handleSubmit } = useForm<ThresholdFormBody>({
        defaultValues: useMemo(
            () => ({
                warns: server?.automod_punish_threshold_warns ?? 0,
                punishment: server.automod_threshold_punishment ?? 'WARN',
            }),
            [
                server.automod_punish_threshold_warns,
                server.automod_threshold_punishment,
            ]
        ),
    });
    const [success, setSuccess] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function onSubmit(data: ThresholdFormBody) {
        let body = new URLSearchParams();
        body.append('punishment', data.punishment ?? '');
        body.append('warns', data.warns.toString() ?? '');

        fetch(`/bot/v1/servers/${server.serverID}/moderation/threshold`, {
            method: 'POST',
            body,
        })
            .then(async (res) => {
                const json = await res.json().catch(() => undefined);
                if (!json || json['error']) {
                    toast({
                        title: 'Failed to update warns threshold',
                        description: json['error'] ?? 'An error occured',
                        status: 'error',
                    });
                    return;
                }
                setSuccess(true);
                queryClient.invalidateQueries([
                    'data_moderation',
                    server.serverID,
                ]);
                toast({
                    title: 'Warns Threshold Updated',
                    description: `The warns threshold has been updated. The user will receive a ${PunishmentNames[data.punishment ?? 'WARN']?.name} after receiving ${data.warns} warns.`,
                    status: 'success',
                });
            })
            .catch(() => {});
    }
    return (
        <section className={'my-2 flex h-full flex-col justify-center'}>
            <span
                className={
                    'block text-center font-open-sans text-sm italic text-gray-400'
                }
            >
                Users will receive the punishment you specify here after
                receiving the amount of warns you&apos;ve specified here.
            </span>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={'flex flex-col items-center justify-center gap-2'}
            >
                <div
                    className={
                        'mx-2 my-2 flex flex-row items-center justify-center rounded-2xl bg-gray-900/70 font-open-sans text-lg max-sm:text-base'
                    }
                >
                    <span className={'w-full self-stretch bg-gray-950'}>
                        <Controller
                            control={control}
                            name={'punishment'}
                            render={({ field }) => {
                                return (
                                    <PunishmentSelect
                                        disable={['WARN', 'DELETE_MESSAGE']}
                                        className={'rounded-none rounded-l-2xl'}
                                        onChange={(e) => {
                                            setSuccess(false);
                                            field.onChange(e.type);
                                        }}
                                        value={field.value}
                                    />
                                );
                            }}
                        />
                    </span>
                    <span
                        className={
                            'flex items-center self-stretch border-y border-gray-800 px-2'
                        }
                    >
                        every
                    </span>
                    <span className={'w-full self-stretch bg-gray-950'}>
                        <Controller
                            control={control}
                            name={'warns'}
                            render={({ field }) => {
                                return (
                                    <Input
                                        className={'rounded-none'}
                                        max={999}
                                        min={0}
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
                            'flex items-center self-stretch rounded-r-2xl border border-l-0 border-gray-800 px-2'
                        }
                    >
                        warns
                    </span>
                </div>

                <Button
                    type='submit'
                    variant={'outline'}
                    className={`mx-auto flex w-fit items-center gap-2`}
                >
                    {success ? (
                        <>
                            <BsCheckLg /> Updated!
                        </>
                    ) : (
                        <>
                            <BsExclamationTriangle /> Update
                        </>
                    )}
                </Button>
            </form>
        </section>
    );
}
