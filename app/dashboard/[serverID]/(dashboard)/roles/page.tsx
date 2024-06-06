"use client";

import DashboardRolesConfig from "@/components/dashboard/roles/DashboardRolesConfig";

export default function DashboardRoles({ params }: { params: { serverID: string } }) {
    return <><DashboardRolesConfig id={params.serverID}/></>
}