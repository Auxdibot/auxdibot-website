"use client";

import DashboardLevelsConfig from "@/components/dashboard/levels/DashboardLevelsConfig";
import DashboardSidebarContext from "@/context/DashboardSidebarContext";
import { useContext } from 'react';

export default function DashboardLevels({ params }: { params: { serverID: string } }) {
    const page = useContext(DashboardSidebarContext);
    page?.setCurrentPage("levels");
    return <><DashboardLevelsConfig id={params.serverID}/></>
}