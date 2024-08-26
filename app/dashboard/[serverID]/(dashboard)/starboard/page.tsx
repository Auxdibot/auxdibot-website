'use client';

import DashboardStarboardConfig from '@/components/dashboard/starboard/DashboardStarboardConfig';

export default function DashboardStarboard({
    params,
}: {
    params: { serverID: string };
}) {
    return (
        <>
            <DashboardStarboardConfig id={params.serverID} />
        </>
    );
}
