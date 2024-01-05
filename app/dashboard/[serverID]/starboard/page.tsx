"use client";

import DashboardStarboardConfig from "@/components/dashboard/starboard/DashboardStarboardConfig";
import DashboardSidebarContext from "@/context/DashboardSidebarContext";
import { useContext } from 'react';

export default function DashboardStarboard({ params }: { params: { serverID: string } }) {
    const page = useContext(DashboardSidebarContext);
    page?.setCurrentPage("starboard");
    return <><DashboardStarboardConfig id={params.serverID}/></>
}