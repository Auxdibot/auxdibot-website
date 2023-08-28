"use client";

import DashboardSchedulesConfig from "@/components/dashboard/schedules/DashboardSchedulesConfig";
import DashboardSidebarContext from "@/context/DashboardSidebarContext";
import { useContext } from 'react';

export default function DashboardSchedules({ params }: { params: { serverID: string } }) {
    const page = useContext(DashboardSidebarContext);
    page?.setCurrentPage("schedules");
    return <><DashboardSchedulesConfig id={params.serverID}/></>
}