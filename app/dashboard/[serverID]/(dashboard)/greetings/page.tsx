'use client';

import DashboardGreetingsConfig from '@/components/dashboard/greetings/DashboardGreetingsConfig';

export default function DashboardGreetings({
    params,
}: {
    params: { serverID: string };
}) {
    return (
        <>
            <DashboardGreetingsConfig id={params.serverID} />
        </>
    );
}
