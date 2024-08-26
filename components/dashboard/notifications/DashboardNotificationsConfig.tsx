'use client';
import { useQuery } from 'react-query';
import { Suspense } from 'react';
import CreateNotification from './CreateNotification';
import Notifications from './Notifications';

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
                <h1 className={'header text-6xl max-md:text-5xl'}>
                    notifications
                </h1>
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
