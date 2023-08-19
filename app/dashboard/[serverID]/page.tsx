"use client";
import PageLoading from "@/components/PageLoading";
import DashboardLanding from "@/components/dashboard/DashboardLanding";
import { useQuery } from "react-query";


export default function ServerDashboardContainer({ params}: { params: { serverID: string }})  {
    const { data, status } = useQuery(["server_list", params.serverID], async () => await fetch(`/api/servers/${params.serverID}`).then(async (i) => await i.json().then((i) => i.data).catch(() => undefined)).catch(() => undefined));
    if (status == "loading") return <PageLoading/>
    return (<>
            <DashboardLanding />
        </>)
}