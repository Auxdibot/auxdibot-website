'use client';

import { Controller, useForm } from 'react-hook-form';
import { PunishmentType } from '@/lib/types/PunishmentType';
import { BsCheckLg, BsHammer } from 'react-icons/bs';
import PunishmentSelect from '@/components/ui/select/punishment-select';
import { useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { AutomodPunishment } from '@/lib/types/AutomodPunishment';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button/button';
import { useToast } from '@/components/ui/use-toast';
import { PunishmentNames } from '@/lib/constants/PunishmentNames';

type SpamLimitPunishmentBody = {
    punishment: PunishmentType | null;
    reason?: string;
};

export default function SpamSettingsPunishment({
    server,
}: {
    server: {
        readonly serverID: string;
        readonly automod_spam_punishment: AutomodPunishment;
    };
}) {
    const { control, reset, handleSubmit } = useForm<SpamLimitPunishmentBody>({
        defaultValues: useMemo(
            () => ({
                punishment:
                    server.automod_spam_punishment?.punishment ?? 'WARN',
                reason:
                    server.automod_spam_punishment?.reason ??
                    'You have been punished for breaking the spam limit on this server.',
            }),
            [server.automod_spam_punishment]
        ),
    });
    const [success, setSuccess] = useState(false);
    const queryClient = useQueryClient();
    const { toast } = useToast();
    function onSubmit(data: SpamLimitPunishmentBody) {
        let body = new URLSearchParams();
        body.append('punishment', data.punishment ?? '');
        body.append('reason', data.reason ?? '');
        fetch(`/bot/v1/servers/${server.serverID}/moderation/spam/punishment`, {
            method: 'POST',
            body,
        })
            .then(async (res) => {
                const json = await res.json().catch(() => undefined);
                if (!json || json['error']) {
                    toast({
                        title: 'Failed to update spam punishment',
                        description:
                            json?.error ??
                            'An error occurred while updating spam punishment.',
                        status: 'error',
                    });
                    return;
                }
                toast({
                    title: 'Updated Spam Punishment',
                    description: `Users will now receive a ${PunishmentNames[data.punishment ?? 'WARN'].name} after breaking the spam limit.`,
                    status: 'success',
                });
                queryClient.invalidateQueries([
                    'data_moderation',
                    server.serverID,
                ]);
                reset({
                    punishment: json.automod_spam_punishment.punishment,
                    reason: json.automod_spam_punishment.reason,
                });
                setSuccess(true);
            })
            .catch(() => {});
    }
    return (
        <section className={'my-2 flex flex-col gap-2'}>
            <span className={'text-center font-open-sans text-xl'}>
                Spam Limit Punishment
            </span>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={
                    'flex w-full flex-col items-center justify-center gap-2'
                }
            >
                <section
                    className={
                        'flex w-full flex-col items-center justify-between gap-2 px-4'
                    }
                >
                    <span className={'flex flex-1 flex-col items-center gap-1'}>
                        <label
                            className={
                                'w-full text-left font-montserrat text-sm'
                            }
                        >
                            Punishment
                        </label>
                        <Controller
                            control={control}
                            name={'punishment'}
                            render={({ field }) => {
                                return (
                                    <PunishmentSelect
                                        disable={['DELETE_MESSAGE']}
                                        className={'w-48'}
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
                    <span className={'flex w-full flex-col items-center gap-1'}>
                        <label
                            className={
                                'w-full text-left font-montserrat text-sm'
                            }
                        >
                            Punishment Reason
                        </label>
                        <Controller
                            control={control}
                            name={'reason'}
                            render={({ field }) => {
                                return (
                                    <>
                                        <Textarea
                                            maxLength={200}
                                            className={'max-h-[100px] w-full'}
                                            onChange={field.onChange}
                                            value={field.value}
                                        />
                                        <span
                                            className={
                                                'w-full pl-2 text-left font-open-sans text-xs text-gray-400'
                                            }
                                        >
                                            {field.value?.length || 0}/200
                                        </span>
                                    </>
                                );
                            }}
                        />
                    </span>
                </section>

                <Button
                    variant={'outline'}
                    type='submit'
                    className={`mx-auto flex w-fit flex-row items-center gap-2`}
                >
                    {success ? (
                        <>
                            <BsCheckLg /> Updated!
                        </>
                    ) : (
                        <>
                            <BsHammer /> Update
                        </>
                    )}
                </Button>
            </form>
        </section>
    );
}
