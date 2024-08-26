'use client';

import DashboardSchedulesConfig from '@/components/dashboard/schedules/DashboardSchedulesConfig';

export default function DashboardSchedules({
    params,
}: {
    params: { serverID: string };
}) {
    return (
        <>
            <DashboardSchedulesConfig id={params.serverID} />
        </>
    );
}
