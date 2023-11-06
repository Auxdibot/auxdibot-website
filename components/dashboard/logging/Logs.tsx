"use client";

import Log from "./Log";

export default function Logs({ logs }: { logs?: { type: string, userID: string, date_unix: number, description: string }[]}) {
    return (
    <div className={"bg-gray-800 shadow-2xl border-2 border-gray-800 rounded-2xl h-full max-md:mx-auto"}>
        <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Log History</h2>
        {logs?.reverse().map((i, index) => <Log key={index} log={i}/>)}
    </div>
    );
}