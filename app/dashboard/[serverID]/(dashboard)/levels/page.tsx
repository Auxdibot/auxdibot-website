'use client';

import DashboardLevelsConfig from '@/components/dashboard/levels/DashboardLevelsConfig';

export default function DashboardLevels({
    params,
}: {
    params: { serverID: string };
}) {
    return (
        <>
            <DashboardLevelsConfig id={params.serverID} />
        </>
    );
}
