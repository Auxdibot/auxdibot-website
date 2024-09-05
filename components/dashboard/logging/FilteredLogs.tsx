'use client';

import Link from 'next/link';
import { Suspense, useState } from 'react';
import { BsCheckLg, BsPlus } from 'react-icons/bs';
import { useQuery, useQueryClient } from 'react-query';
import { LogCombobox } from './combobox/LogCombobox';
import { Button } from '@/components/ui/button/button';
import { useToast } from '@/components/ui/use-toast';
import { LogFilter } from './LogFilter';

export default function FilteredLogs({
    server,
}: {
    server: {
        serverID: string;
        filtered_logs: string[];
    };
}) {
    const { data: actions } = useQuery<string[] | undefined>(
        ['data_actions', server.serverID],
        async () =>
            await fetch(`/bot/v1/servers/${server.serverID}/log/actions`)
                .then(
                    async (data) =>
                        await data
                            .json()
                            .then((data) => data?.data?.log_actions)
                            .catch(() => undefined)
                )
                .catch(() => undefined)
    );

    const [success, setSuccess] = useState(false);
    const [filter, setFiltered] = useState('');
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function addFilteredLog() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append('log', filter);
        fetch(`/bot/v1/servers/${server.serverID}/log/filter`, {
            method: 'POST',
            body,
        })
            .then(async (data) => {
                const json = await data.json().catch(undefined);
                if (!json || json['error']) {
                    toast({
                        title: 'Failed to add filtered log',
                        description: json['error']
                            ? json['error']
                            : 'An error occured.',
                        status: 'error',
                    });
                    return;
                }
                toast({
                    title: 'Filtered Log Added',
                    description: `Successfully ${json.data ? 'added' : 'removed'} "${filter
                        .split('_')
                        .map((i) => i[0] + i.slice(1).toLowerCase())
                        .join(' ')}" as a filtered log.`,
                    status: 'success',
                });
                queryClient.invalidateQueries([
                    'data_actions',
                    server.serverID,
                ]);
                queryClient.invalidateQueries([
                    'data_logging',
                    server.serverID,
                ]);
                setSuccess(true);
                setFiltered('');
            })
            .catch(() => {});
    }
    return (
        <section className={'flex flex-col py-2'}>
            <h3 className={'secondary text-center text-2xl'}>
                Filter Log Actions
            </h3>
            <Link
                href={`${process.env.NEXT_PUBLIC_DOCUMENTATION_LINK}/modules/logging`}
                className={'h-fit text-center font-open-sans text-gray-400'}
            >
                Click me to view all log actions that Auxdibot uses.
            </Link>
            <ul
                className={
                    'max-md:grid-cols-flow-dense grid-rows-flow-dense my-4 grid grid-cols-3 gap-4 px-2 font-open-sans max-lg:grid-cols-2 max-md:grid-cols-1'
                }
            >
                <Suspense fallback={null}>
                    {server?.filtered_logs?.map((i, index) => (
                        <li key={index}>
                            <LogFilter
                                filtered={i}
                                index={index}
                                serverID={server.serverID}
                            />
                        </li>
                    ))}
                </Suspense>
            </ul>
            <div className={'mx-auto flex w-fit flex-col gap-2'}>
                <LogCombobox
                    actions={actions}
                    onChange={(str) => setFiltered(str)}
                    value={filter}
                />
            </div>
            <Button
                onClick={() => addFilteredLog()}
                className={'mx-auto my-2 flex w-fit items-center gap-1'}
                variant={'outline'}
                type='submit'
            >
                {success ? (
                    <>
                        <BsCheckLg /> Updated!
                    </>
                ) : (
                    <>
                        <BsPlus /> Add Filtered Log
                    </>
                )}
            </Button>
        </section>
    );
}
