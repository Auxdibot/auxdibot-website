"use client";
import DashboardLanding from "@/components/dashboard/DashboardLanding";
export default function ServerDashboardContainer({ params }: { params: { serverID: string }})  {

    return (<>
            <DashboardLanding id={params.serverID}/>
        </>)
}