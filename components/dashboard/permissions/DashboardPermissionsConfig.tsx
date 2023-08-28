"use client";
import { useQuery } from "react-query"
import { Suspense } from 'react';
import CreateSchedule from "./CreatePermission";
import Permissions from "./Permissions";
import CreatePermission from "./CreatePermission";

export default function DashboardPermissionsConfig({ id }: { id: string }) {
    let { data: permissions } = useQuery(["data_permissions", id], async () => await fetch(`/api/v1/servers/${id}/permissions`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));

    return (<main className={"bg-gray-700 flex-grow"}>
        <div className={"animate-fadeIn flex max-md:items-center flex-col py-5 md:px-5 gap-5"}>
        <h1 className={"header text-6xl max-md:text-5xl"}>Permissions</h1>
        <span className={"flex flex-row max-md:flex-col gap-10"}>
            <Suspense fallback={null}>
                <Permissions serverID={id} permissions={permissions?.data?.permission_overrides}/>
                <CreatePermission serverID={id} />
            </Suspense>
        </span>
        </div>
        
            
        </main>)
}