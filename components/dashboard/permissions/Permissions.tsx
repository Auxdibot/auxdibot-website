"use client";

import { DataTable } from "@/components/ui/data-table/data-table";

import PermissionType from "@/lib/types/PermissionType";
import { columns } from "./table/column";

export default function Permissions({ permissions, serverID }: { serverID: string, permissions?: PermissionType[] }) {

    return <>
    <div className={"flex-1 flex-grow shadow-2xl border-2 border-gray-800 rounded-2xl h-full max-md:mx-auto"}>
    <h2 className={"secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Your Permission Overrides</h2>
    <div className={"p-2 max-md:max-w-[98vw] self-stretch"}>
    {permissions && permissions?.length > 0 ? <DataTable columns={columns(serverID)} data={permissions} /> : <h2 className={"text-xl font-open-sans text-gray-400 text-center"}>No permissions found.</h2>}
    </div>

    </div>
    </>;
}