"use client";

import DashboardCardsConfig from "@/components/dashboard/cards/DashboardCardsConfig";
import DashboardSidebarContext from "@/context/DashboardSidebarContext";
import { useContext } from 'react';

export default function DashboardCard({ params }: { params: { serverID: string } }) {
    const page = useContext(DashboardSidebarContext);
    page?.setCurrentPage("card");
    return <><DashboardCardsConfig id={params.serverID}/></>
}