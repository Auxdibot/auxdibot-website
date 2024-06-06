"use client";

import DashboardLoggingConfig from "@/components/dashboard/logging/DashboardLoggingConfig";

export default function DashboardLogging({ params }: { params: { serverID: string } }) {
    return <><DashboardLoggingConfig id={params.serverID}/></>
}