"use client";

import DashboardNotificationsConfig from "@/components/dashboard/notifications/DashboardNotificationsConfig";
import DashboardSidebarContext from "@/context/DashboardSidebarContext";
import { useContext } from 'react';

export default function DashboardNotifications({ params }: { params: { serverID: string } }) {
    const page = useContext(DashboardSidebarContext);
    page?.setCurrentPage("notifications");
    return <><DashboardNotificationsConfig
     id={params.serverID}/></>
}