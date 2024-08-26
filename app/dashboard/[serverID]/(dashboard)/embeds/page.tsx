'use client';

import DashboardEmbedsConfig from '@/components/dashboard/embeds/DashboardEmbedsConfig';

export default function DashboardEmbeds({
    params,
}: {
    params: { serverID: string };
}) {
    return (
        <>
            <DashboardEmbedsConfig id={params.serverID} />
        </>
    );
}
