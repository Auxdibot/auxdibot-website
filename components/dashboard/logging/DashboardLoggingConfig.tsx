'use client';
import { useQuery } from 'react-query';
import Logs from './Logs';
import LogSettings from './LogSettings';
import { Scroll } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button/button';

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
                <span className='mb-5 mt-2 flex items-center gap-5 max-md:flex-col'>
                    <div className='flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-800 bg-gradient-to-bl from-gray-500/40 to-gray-900/40 shadow transition-colors hover:bg-gray-500/40'>
                        <Scroll size={'48'} />
                    </div>
                    <div className='flex flex-col max-md:items-center max-md:text-center'>
                        <h1
                            className={
                                'header flex items-center font-raleway text-4xl font-bold'
                            }
                        >
                            Logging
                            <Link
                                href={
                                    process.env.NEXT_PUBLIC_DOCUMENTATION_LINK +
                                    '/modules/logging'
                                }
                            >
                                <Button className='text-sm' variant='link'>
                                    [docs]
                                </Button>
                            </Link>
                        </h1>
                        <p className='max-w-4xl font-inter text-lg'>
                            Allows the logging of messages and moderation
                            actions with extreme depth.
                        </p>
                    </div>
                </span>
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
