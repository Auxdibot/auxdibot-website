'use client';
import { useQuery } from 'react-query';
import { Suspense } from 'react';
import Schedules from './Schedules';
import CreateSchedule from './CreateSchedule';

export default function DashboardSchedulesConfig({ id }: { id: string }) {
    let { data: schedules } = useQuery(
        ['data_schedules', id],
        async () =>
            await fetch(`/bot/v1/servers/${id}/schedules`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined)
    );

    return (
        <main className={'flex-grow bg-gray-950'}>
            <div
                className={
                    'flex animate-fadeIn flex-col gap-5 py-5 max-lg:items-center md:px-5'
                }
            >
                <h1 className={'header text-6xl max-lg:text-5xl'}>schedules</h1>
                <span className={'flex w-full flex-row gap-10 max-xl:flex-col'}>
                    <Suspense fallback={null}>
                        <CreateSchedule serverID={id} />
                        <Schedules
                            serverID={id}
                            schedules={schedules?.data?.scheduled_messages}
                        />
                    </Suspense>
                </span>
            </div>
        </main>
    );
}
