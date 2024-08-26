'use client';

import {
    BsCheckLg,
    BsPersonAdd,
    BsPersonDown,
    BsTag,
    BsX,
} from 'react-icons/bs';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Controller, useForm } from 'react-hook-form';
import Roles from '@/components/ui/select/roles';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button/button';

type MassroleBody = { roleID: string; give: boolean };
export default function Massrole({ serverID }: { serverID: string }) {
    let { data: roles } = useQuery(
        ['data_roles', serverID],
        async () =>
            await fetch(`/bot/v1/servers/${serverID}/roles`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined)
    );
    const { control, handleSubmit, reset, watch } = useForm<MassroleBody>();
    const { toast } = useToast();
    const [success, setSuccess] = useState(false);

    const give = watch('give');
    function setMassrole(data: MassroleBody) {
        if (!serverID) return;
        const body = new URLSearchParams();
        body.append('roleID', data.roleID);
        body.append('give', data.give + '');
        fetch(`/bot/v1/servers/${serverID}/massrole`, { method: 'POST', body })
            .then(async (res) => {
                const json = await res.json().catch(() => undefined);
                if (!json || json['error']) {
                    toast({
                        title: `Failed to finish massrole`,
                        description: json['error']
                            ? json['error']
                            : `An error occurred while finishing the massrole process.`,
                        status: 'error',
                    });
                    return;
                }
                toast({
                    title: `Massrole ${data.give ? 'Gave' : 'Took'}`,
                    description: `Successfully ${data.give ? 'gave' : 'took'} the role @${roles?.find((i: any) => i.id == data.roleID)?.name ?? 'Unknown'} ${data.give ? 'to' : 'from'} every user in the server.`,
                    status: 'success',
                });
                reset({ give: true, roleID: '' });
                setSuccess(true);
            })
            .catch(() => {});
    }
    if (!roles) return <></>;

    return (
        <div
            className={
                'h-fit w-full rounded-2xl border-2 border-gray-800 shadow-2xl max-md:mx-auto'
            }
        >
            <h2
                className={
                    'secondary rounded-2xl rounded-b-none p-4 text-center text-2xl'
                }
            >
                Massrole
            </h2>
            <div className={'mx-auto flex w-fit flex-col gap-3 py-2'}>
                <span className={'flex items-center gap-2'}>
                    <Controller
                        control={control}
                        name={'roleID'}
                        render={({ field }) => {
                            return (
                                <Roles
                                    serverID={serverID}
                                    onChange={(e) => {
                                        setSuccess(false);
                                        field.onChange(e.role);
                                    }}
                                    value={field.value}
                                />
                            );
                        }}
                    />
                    <label
                        className={
                            'secondary mx-auto flex flex-row items-center gap-2 text-xl'
                        }
                    >
                        <Controller
                            control={control}
                            name={'give'}
                            render={({ field }) => {
                                return (
                                    <span
                                        onClick={() =>
                                            field.onChange(!field.value)
                                        }
                                        className={
                                            'flex cursor-pointer flex-row items-center justify-center gap-4 font-open-sans text-lg'
                                        }
                                    >
                                        <span
                                            className={`rounded-xl border bg-gradient-to-l p-1 text-2xl ${field.value ? 'from-green-400 to-green-700' : 'from-red-400 to-red-700'} select-none border-black text-black transition-all`}
                                        >
                                            {field.value ? <BsTag /> : <BsX />}
                                        </span>
                                        {field.value ? 'Give' : 'Take'}
                                    </span>
                                );
                            }}
                        />
                    </label>
                </span>
                <Button
                    onClick={handleSubmit(setMassrole)}
                    className={`mx-auto flex w-fit flex-row items-center gap-2`}
                    variant={'outline'}
                    type='submit'
                >
                    {success ? (
                        <>
                            <BsCheckLg /> Updated!
                        </>
                    ) : (
                        <>
                            {give ? <BsPersonAdd /> : <BsPersonDown />} Massrole{' '}
                            {give ? 'Give' : 'Take'}
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}
