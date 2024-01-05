"use client";

import Permission from "./Permission";
import PermissionType from "@/lib/types/PermissionType";

export default function Permissions({ permissions, serverID }: { serverID: string, permissions?: PermissionType[] }) {

    return <>
    <div className={"bg-gray-800 flex-1 flex-grow shadow-2xl border-2 border-gray-800 rounded-2xl h-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Your Permission Overrides</h2>
    {permissions?.length ? 
    <table cellPadding={5} className={"mx-auto font-open-sans my-2 flex flex-col p-2 max-md:p-8 text-sm"}>
    <tr className={"max-md:hidden flex w-full justify-between px-2"}>
        <th className={"flex-1 font-montserrat font-normal text-xl"}>Permission</th>
        <th className={"flex-1 font-montserrat font-normal text-xl"}>Role or User</th>
        <th className={"flex-1 font-montserrat font-normal text-xl"}>ID</th>
        <div className={"w-9 opacity-0"}></div>
    </tr>
    {permissions ? permissions.map((permission) => <Permission key={permission.index} serverID={serverID} permission={permission}/>) : ""}
    </table> : ''}

    </div>
    </>;
}