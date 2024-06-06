"use client";

import DashboardSettingsConfig from "@/components/dashboard/settings/DashboardSettingsConfig";

export default function DashboardSettings({ params }: { params: { serverID: string } }) {
    return <><DashboardSettingsConfig id={params.serverID}/></>
}