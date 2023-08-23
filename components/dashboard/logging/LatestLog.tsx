"use client";

export default function LatestLog({ log }: { log?: { type: string, userID: string, date_unix: number, description: string }}) {

    return <>
    <div className={"bg-gray-800 shadow-2xl border-2 border-gray-800 rounded-2xl h-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Latest Log</h2>
    {log ? <div className={"flex flex-col gap-2 text-md font-lato bg-gray-700 w-fit mx-auto rounded-xl m-5 p-5"}> 
    <code className={"text-md flex flex-col gap-1"}><span>{new Date(log.date_unix).toUTCString()}</span> <span className={"float-right"}>{log.type}</span></code>
    <span>{log.description}</span></div> : ""}
    </div>
    </>;
}