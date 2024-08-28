'use client';

import DashboardModerationConfig from '@/components/dashboard/moderation/DashboardModerationConfig';
export default function DashboardModeration({
    params,
}: {
    params: { serverID: string };
}) {
    return (
        <>
            <DashboardModerationConfig id={params.serverID} />
        </>
    );
}
