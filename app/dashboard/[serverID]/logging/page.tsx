"use client";

import DashboardLoggingConfig from "@/components/dashboard/logging/DashboardLoggingConfig";
import DashboardSidebarContext from "@/context/DashboardSidebarContext";
import { useContext } from 'react';

export default function DashboardLogging({ params }: { params: { serverID: string } }) {
    const page = useContext(DashboardSidebarContext);
    page?.setCurrentPage("logging");
    return <><DashboardLoggingConfig id={params.serverID}/></>
}