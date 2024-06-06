"use client";

import { DataTable } from "@/components/ui/data-table/data-table";
import { columns } from "./table/column";

export default function ReactionRoles({ server }: { server: { 
    serverID: string, 
    reaction_roles: { reactions: { emoji: string }[], messageID: string }[], 
}}) {
    return <div className={"shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Reaction Roles</h2>
    <div className={"p-2 max-md:max-w-[98vw]"}>
    {server?.reaction_roles?.length ?
    <DataTable columns={columns(server.serverID)} data={server?.reaction_roles.map((i, index) => ({...i, index}))} /> : <h2 className={"text-xl text-gray-400 font-open-sans text-center"}>No reaction roles found.</h2>}
    </div>
    </div>;
}