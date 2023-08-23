import DashboardLoggingConfig from "@/components/dashboard/logging/DashboardLoggingConfig";
import DashboardSettingsConfig from "@/components/dashboard/settings/DashboardSettingsConfig";

export default function DashboardSettings({ params }: { params: { serverID: string } }) {
    return <><DashboardLoggingConfig id={params.serverID}/></>
}