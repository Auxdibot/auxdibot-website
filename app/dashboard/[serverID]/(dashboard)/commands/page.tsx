"use client";

import { DashboardCommandsConfig } from "@/components/dashboard/commands/DashboardCommandsConfig";

import DashboardSidebarContext from "@/context/DashboardSidebarContext";
import { useContext } from 'react';

export default function DashboardModeration({ params }: { params: { serverID: string } }) {
    const page = useContext(DashboardSidebarContext);
    page?.setCurrentPage("commands");
    return <><DashboardCommandsConfig id={params.serverID}/></>
}