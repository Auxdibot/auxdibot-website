'use client';

import DashboardProviders from '@/components/dashboard/DashboardProviders';
import { Toaster } from '@/components/ui/toaster';
import '@/styles/global.scss';

export default function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { serverID: string };
}) {
    return (
        <>
            <DashboardProviders serverID={params.serverID}>
                {children}
                <Toaster />
            </DashboardProviders>
        </>
    );
}
