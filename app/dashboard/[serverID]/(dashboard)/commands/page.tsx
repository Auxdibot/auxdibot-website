'use client';

import { DashboardCommandsConfig } from '@/components/dashboard/commands/DashboardCommandsConfig';

export default function DashboardModeration({
    params,
}: {
    params: { serverID: string };
}) {
    return (
        <>
            <DashboardCommandsConfig id={params.serverID} />
        </>
    );
}
