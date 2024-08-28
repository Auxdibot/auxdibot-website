'use client';

import DashboardCardsConfig from '@/components/dashboard/cards/DashboardCardsConfig';

export default function DashboardCard({
    params,
}: {
    params: { serverID: string };
}) {
    return (
        <>
            <DashboardCardsConfig id={params.serverID} />
        </>
    );
}
