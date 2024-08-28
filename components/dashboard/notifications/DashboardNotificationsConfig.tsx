'use client';
import { useQuery } from 'react-query';
import { Suspense } from 'react';
import CreateNotification from './CreateNotification';
import Notifications from './Notifications';
import { SiYoutube } from '@icons-pack/react-simple-icons';

export default function DashboardNotificationsConfig({ id }: { id: string }) {
    let { data: notifications } = useQuery(
        ['data_notifications', id],
        async () =>
            await fetch(`/bot/v1/servers/${id}/notifications`)
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
                        <SiYoutube size={'48'} />
                    </div>
                    <div className='flex flex-col max-md:items-center max-md:text-center'>
                        <h1
                            className={
                                'font-raleway text-4xl font-bold text-white'
                            }
                        >
                            Notifications
                        </h1>
                        <p className='max-w-4xl font-inter text-lg'>
                            Allows users to configure messages that send on
                            YouTube/Twitch/RSS updates.
                        </p>
                    </div>
                </span>
                <span className={'flex flex-row gap-10 max-xl:flex-col'}>
                    <Suspense fallback={null}>
                        <CreateNotification serverID={id} />
                        <Notifications
                            serverID={id}
                            notifications={notifications?.data?.notifications}
                        />
                    </Suspense>
                </span>
            </div>
        </main>
    );
}
