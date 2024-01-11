"use client";

import DashboardEmbedsConfig from "@/components/dashboard/embeds/DashboardEmbedsConfig";
import DashboardSidebarContext from "@/context/DashboardSidebarContext";
import { useContext } from 'react';

export default function DashboardEmbeds({ params }: { params: { serverID: string } }) {
    const page = useContext(DashboardSidebarContext);
    page?.setCurrentPage("embeds");
    return <><DashboardEmbedsConfig id={params.serverID}/></>
}