"use client";

import Permission from "./Permission";
import Schedule from "./Permission";
import PermissionType from "@/lib/types/PermissionType";

export default function Permissions({ permissions, serverID }: { serverID: string, permissions?: PermissionType[] }) {

    return <>
    <div className={"bg-gray-800 flex-1 flex-grow shadow-2xl border-2 border-gray-800 rounded-2xl h-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Your Permission Overrides</h2>
    <div className={"flex flex-col gap-2 text-md font-lato mx-auto rounded-xl m-5 p-5"}> 
    {permissions ? permissions.map((permission) => <Permission key={permission.index} serverID={serverID} permission={permission}/>) : ""}
    </div>
    </div>
    </>;
}