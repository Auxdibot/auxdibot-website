'use client';
import { useQuery } from 'react-query';
import Logs from './Logs';
import LogSettings from './LogSettings';

export default function DashboardLoggingConfig({ id }: { id: string }) {
    let { data: logging } = useQuery(
        ['data_logging', id],
        async () =>
            await fetch(`/bot/v1/servers/${id}/log`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined)
    );

    return (
        <main className={'flex-grow bg-gray-950'}>
            <div
                className={
                    'flex animate-fadeIn flex-col gap-5 py-5 max-md:items-center md:px-5'
                }
            >
                <h1 className={'header text-6xl max-md:text-5xl'}>logging</h1>
                <span
                    className={
                        'flex w-full max-w-[100vw] gap-5 max-md:flex-col max-md:px-2'
                    }
                >
                    <LogSettings server={logging?.data} />
                    <Logs logs={logging?.data?.logs} />
                </span>
            </div>
        </main>
    );
}
