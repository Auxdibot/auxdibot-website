"use client";

import DashboardModerationConfig from "@/components/dashboard/moderation/DashboardModerationConfig";
import DashboardSidebarContext from "@/context/DashboardSidebarContext";
import { useContext } from 'react';

export default function DashboardModeration({ params }: { params: { serverID: string } }) {
    const page = useContext(DashboardSidebarContext);
    page?.setCurrentPage("moderation");
    return <><DashboardModerationConfig id={params.serverID}/></>
}