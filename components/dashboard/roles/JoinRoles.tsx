'use client';

import { Controller, useForm } from 'react-hook-form';
import { BsPlus } from 'react-icons/bs';
import { useQueryClient } from 'react-query';
import Roles from '@/components/ui/select/roles';
import JoinRole from './JoinRole';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button/button';

type JoinRolesBody = { role: string };

export default function JoinRoles({
    server,
}: {
    server: { readonly serverID: string; readonly join_roles: string[] };
}) {
    const { control, reset, handleSubmit } = useForm<JoinRolesBody>();

    const { toast } = useToast();
    const queryClient = useQueryClient();
    function onSubmit(data: JoinRolesBody) {
        let body = new URLSearchParams();
        body.append('roleID', data.role ?? '');

        fetch(`/bot/v1/servers/${server.serverID}/join_roles`, {
            method: 'POST',
            body,
        })
            .then(async (data) => {
                const json = await data.json().catch(() => undefined);
                if (!json || json['error']) {
                    toast({
                        title: `Failed to add join role`,
                        description: json['error']
                            ? json['error']
                            : `An error occurred while adding the join role.`,
                        status: 'error',
                    });
                    return;
                }
                toast({
                    title: `Join Role Added`,
                    description: `The join role has been added successfully.`,
                    status: 'success',
                });
                reset();
                queryClient.invalidateQueries([
                    'data_join_roles',
                    server.serverID,
                ]);
            })
            .catch(() => {});
    }
    return (
        <>
            <div
                className={
                    'flex w-full flex-col self-stretch rounded-2xl border-2 border-gray-800 shadow-2xl max-md:mx-auto'
                }
            >
                <h2
                    className={
                        'secondary rounded-2xl rounded-b-none p-4 text-center text-2xl'
                    }
                >
                    Join Roles
                </h2>
                <div className={'flex h-full flex-col justify-between'}>
                    {server.join_roles && server.join_roles.length > 0 ? (
                        <ul
                            className={
                                'mx-auto my-4 flex w-fit flex-col items-center justify-center gap-1 rounded-2xl border border-gray-800 p-2'
                            }
                        >
                            {server.join_roles.map((i, index) => (
                                <JoinRole
                                    roleID={i}
                                    serverID={server.serverID}
                                    key={i}
                                    index={index}
                                />
                            ))}
                        </ul>
                    ) : (
                        <h2
                            className={
                                'text-center font-open-sans text-xl text-gray-400'
                            }
                        >
                            No join roles found.
                        </h2>
                    )}

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={
                            'flex flex-col items-center justify-center gap-3 py-2'
                        }
                    >
                        <span
                            className={
                                'mx-auto w-fit text-center font-open-sans italic text-gray-500'
                            }
                        >
                            Join roles added to your server will be given to any
                            member that joins your server.
                        </span>
                        <div
                            className={
                                'flex w-full flex-1 justify-center gap-2 max-md:flex-col md:px-20'
                            }
                        >
                            <section
                                className={
                                    'flex flex-1 items-center justify-center gap-2 max-md:flex-col'
                                }
                            >
                                <Controller
                                    control={control}
                                    name={'role'}
                                    rules={{ required: true }}
                                    render={({ field }) => {
                                        return (
                                            <Roles
                                                serverID={server.serverID}
                                                onChange={({ role }) =>
                                                    field.onChange(role)
                                                }
                                                required
                                                value={field.value}
                                            />
                                        );
                                    }}
                                />
                                <Button
                                    type='submit'
                                    className={`flex flex-row items-center gap-2`}
                                    variant={'outline'}
                                >
                                    <BsPlus /> Add
                                </Button>
                            </section>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
