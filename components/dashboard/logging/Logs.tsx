"use client";

import Log from "./Log";

export default function Logs({ logs }: { logs?: { type: string, userID: string, date_unix: number, description: string }[]}) {
    return (
    <div className={"bg-gray-800 shadow-2xl border-2 border-gray-800 rounded-2xl h-full w-full max-md:mx-auto"}>
        <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Log History</h2>
        {logs?.length ? <table cellPadding={5} className={"mx-auto font-open-sans my-2 flex flex-col p-2 max-md:p-8 text-sm"}>
        <tr className={"max-md:hidden flex w-full justify-between"}>
            <th className={"flex-1 font-montserrat font-normal text-xl"}>Log Type</th>
            <th className={"flex-1 font-montserrat font-normal text-xl"}>Log User</th>
            <th className={"flex-1 font-montserrat font-normal text-xl"}>Log Date</th>
        </tr>
        {logs?.sort((a,b) => b.date_unix-a.date_unix).map((i, index) => <Log key={index} log={i}/>)}
        </table> : ""}
        
    </div>
    );
}