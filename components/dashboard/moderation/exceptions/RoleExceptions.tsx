'use client';

import { Controller, useForm } from 'react-hook-form';
import { BsTag } from 'react-icons/bs';
import { useQuery, useQueryClient } from 'react-query';
import Roles from '@/components/ui/select/roles';
import RoleException from './RoleException';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button/button';

type RoleExceptionsBody = { role: string };

export default function RoleExceptions({
    server,
}: {
    server: {
        readonly serverID: string;
        readonly automod_role_exceptions: string[];
    };
}) {
    const { data: roles } = useQuery(
        ['data', server.serverID, 'roles'],
        async () => {
            const res = await fetch(`/bot/v1/servers/${server.serverID}/roles`);
            return await res.json();
        },
        { enabled: !!server.serverID }
    );

    const { control, reset, handleSubmit } = useForm<RoleExceptionsBody>();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function onSubmit(data: RoleExceptionsBody) {
        let body = new URLSearchParams();
        body.append('role', data.role ?? '');

        fetch(`/bot/v1/servers/${server.serverID}/moderation/exceptions`, {
            method: 'PATCH',
            body,
        })
            .then(async (res) => {
                const json = await res.json().catch(() => undefined);
                if (!json || json['error']) {
                    toast({
                        title: 'Failed to add role exception',
                        description:
                            json?.error ??
                            'An error occurred while adding role exception.',
                        status: 'error',
                    });
                    return;
                }
                queryClient.invalidateQueries([
                    'data_moderation',
                    server.serverID,
                ]);
                reset({ role: '' });
                toast({
                    title: 'Added Role Exception',
                    description: `Users with the role ${roles?.find((i: { id: string; name: string }) => i.id == data.role)?.name ?? data.role} will now be exempt from automod punishments.`,
                    status: 'success',
                });
            })
            .catch(() => {});
    }
    return (
        <>
            <div
                className={
                    'flex max-h-[500px] w-full flex-col self-stretch rounded-2xl border-2 border-gray-800 shadow-2xl max-md:mx-auto'
                }
            >
                <h2
                    className={
                        'secondary rounded-2xl rounded-b-none p-4 text-center text-2xl'
                    }
                >
                    Automod Role Exceptions
                </h2>
                <div className={'flex h-full flex-col justify-between'}>
                    {server.automod_role_exceptions &&
                    server.automod_role_exceptions.length > 0 ? (
                        <ul
                            className={
                                'mx-auto my-4 flex w-fit flex-col items-center justify-center gap-1 rounded-2xl border border-gray-800 p-2'
                            }
                        >
                            {server.automod_role_exceptions.map((i, index) => (
                                <RoleException
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
                            No role exceptions found.
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
                            Once a role is added as a role exception, every
                            member with this role will not receive automod
                            punishments.
                        </span>
                        <div
                            className={
                                'flex w-full flex-1 justify-center gap-2 max-md:flex-col md:px-20'
                            }
                        >
                            <section
                                className={
                                    'flex flex-1 flex-col items-center justify-between'
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
                            </section>
                        </div>

                        <Button
                            variant={'outline'}
                            type='submit'
                            className={`mx-auto flex w-fit flex-row items-center gap-2`}
                        >
                            <BsTag /> Add
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}
