'use client';

import LogChannel from './LogChannel';
import FilteredLogs from './FilteredLogs';

export default function LogSettings({
    server,
}: {
    server: { serverID: string; log_channel: string; filtered_logs: string[] };
}) {
    return (
        <>
            <div
                className={
                    'h-fit w-full rounded-2xl border-2 border-gray-800 shadow-2xl max-md:mx-auto'
                }
            >
                <h2
                    className={
                        'secondary rounded-2xl rounded-b-none p-4 text-center text-2xl'
                    }
                >
                    Logs Settings
                </h2>
                {server ? <LogChannel server={server} /> : ''}
                {server ? <FilteredLogs server={server} /> : ''}
            </div>
        </>
    );
}
