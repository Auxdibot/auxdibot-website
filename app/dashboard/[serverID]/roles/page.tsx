"use client";

import DashboardRolesConfig from "@/components/dashboard/roles/DashboardRolesConfig";
import DashboardSidebarContext from "@/context/DashboardSidebarContext";
import { useContext } from 'react';

export default function DashboardRoles({ params }: { params: { serverID: string } }) {
    const page = useContext(DashboardSidebarContext);
    page?.setCurrentPage("roles");
    return <><DashboardRolesConfig id={params.serverID}/></>
}