import DashboardSettingsConfig from "@/components/dashboard/DashboardSettingsConfig";

export default function DashboardSettings({ params }: { params: { serverID: string } }) {
    return <><DashboardSettingsConfig serverID={params.serverID}/></>
}