"use client";

import { DataTable } from "@/components/ui/data-table";

import { columns } from "./table/column";


export default function Logs({ logs }: { logs?: { type: string, userID: string, date_unix: number, description: string }[]}) {

    return (
    <div className={"shadow-2xl border-2 border-gray-800 rounded-2xl h-full w-full max-md:mx-auto"}>
        <h2 className={"secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Log History</h2>
        <div className="p-2">
        {logs && logs?.length > 0 ? <DataTable columns={columns} data={logs.reverse()} /> : ""}
        </div>
        
        
    </div>
    );
}