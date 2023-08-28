"use client";

import DashboardPermissionsConfig from "@/components/dashboard/permissions/DashboardPermissionsConfig";
import DashboardSchedulesConfig from "@/components/dashboard/schedules/DashboardSchedulesConfig";
import DashboardSidebarContext from "@/context/DashboardSidebarContext";
import { useContext } from 'react';

export default function DashboardPermissions({ params }: { params: { serverID: string } }) {
    const page = useContext(DashboardSidebarContext);
    page?.setCurrentPage("permissions");
    return <><DashboardPermissionsConfig id={params.serverID}/></>
}