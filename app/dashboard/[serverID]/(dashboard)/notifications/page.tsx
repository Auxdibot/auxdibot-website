'use client';

import DashboardNotificationsConfig from '@/components/dashboard/notifications/DashboardNotificationsConfig';

export default function DashboardNotifications({
    params,
}: {
    params: { serverID: string };
}) {
    return (
        <>
            <DashboardNotificationsConfig id={params.serverID} />
        </>
    );
}
