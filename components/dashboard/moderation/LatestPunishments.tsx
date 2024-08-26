'use client';

import { useQuery } from 'react-query';

import PunishmentData from '@/lib/types/PunishmentData';

import { DataTable } from '@/components/ui/data-table/data-table';
import { columns } from './table/column';

export default function LatestPunishments({
    serverID,
}: {
    readonly serverID: string;
}) {
    let { data: punishments } = useQuery<
        { data: { punishments: PunishmentData[] } } | undefined
    >(
        ['data_punishments', serverID],
        async () =>
            await fetch(`/bot/v1/servers/${serverID}/punishments?limit=5`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined)
    );
    return (
        <>
            <div
                className={
                    'h-fit flex-1 rounded-2xl border-2 border-gray-800 shadow-2xl max-md:mx-auto max-md:w-full'
                }
            >
                <h2
                    className={
                        'secondary rounded-2xl rounded-b-none p-4 text-center text-2xl'
                    }
                >
                    Latest Punishments
                </h2>
                <div className={'p-2 max-md:max-w-[98vw]'}>
                    {punishments?.data?.punishments?.length ? (
                        <DataTable
                            columns={columns(serverID)}
                            data={punishments.data.punishments}
                        />
                    ) : (
                        <h2
                            className={
                                'text-center font-open-sans text-xl text-gray-400'
                            }
                        >
                            No punishments found.
                        </h2>
                    )}
                </div>
            </div>
        </>
    );
}
