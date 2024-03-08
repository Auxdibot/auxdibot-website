"use client";
import { useQuery } from "react-query"
import { Suspense } from 'react';
import Permissions from "./Permissions";
import CreatePermission from "./CreatePermission";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BsX } from "react-icons/bs";

export default function DashboardPermissionsConfig({ id }: { id: string }) {
    let { data: permissions } = useQuery(["data_permissions", id], async () => await fetch(`/api/v1/servers/${id}/permissions`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));

    return (<main className={"bg-gray-950 flex-grow"}>
        <div className={"animate-fadeIn flex max-md:items-center flex-col py-5 md:px-5 gap-5"}>
        <h1 className={"header text-6xl max-md:text-5xl"}>permissions</h1>
        <Alert variant={'destructive'} className="max-w-xl">
            <AlertTitle className={'flex items-center gap-2 text-xl'}><BsX/> Permissions Deprecation</AlertTitle>
            <AlertDescription>The Auxdibot permissions override system will be deprecated and removed in the coming updates. Your permissions will be moved to a new system, allowing you to toggle on/off certain commands and features for certain channels and groups on demand. See you there!</AlertDescription>
        </Alert>
        <span className={"flex flex-row max-xl:flex-col gap-10"}>
            <Suspense fallback={null}>
                <Permissions serverID={id} permissions={permissions?.data?.permission_overrides}/>
                <CreatePermission serverID={id} />
            </Suspense>
        </span>
        </div>
        
            
        </main>)
}