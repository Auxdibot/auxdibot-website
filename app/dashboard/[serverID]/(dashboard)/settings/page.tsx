"use client";

import DashboardSettingsConfig from "@/components/dashboard/settings/DashboardSettingsConfig";
import DashboardSidebarContext from "@/context/DashboardSidebarContext";
import { useContext } from 'react';

export default function DashboardSettings({ params }: { params: { serverID: string } }) {
    const page = useContext(DashboardSidebarContext);
    page?.setCurrentPage("settings");
    return <><DashboardSettingsConfig id={params.serverID}/></>
}