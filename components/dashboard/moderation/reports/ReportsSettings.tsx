'use client';

import ReportsChannel from './ReportsChannel';
import ReportsRole from './ReportsRole';

export default function ReportsSettings({
    server,
}: {
    server: {
        readonly serverID: string;
        readonly reports_channel: string;
        readonly report_role: string;
    };
}) {
    return (
        <section className={'my-2 flex h-full flex-col justify-center'}>
            <span
                className={
                    'block text-center font-open-sans text-sm italic text-gray-400'
                }
            >
                When a user runs the /report command, all reports will be
                directed to the channel you specified and the reports role you
                have set will be pinged.
            </span>
            <div
                className={
                    'mx-auto my-2 flex h-full w-full justify-center max-md:flex-col md:px-10'
                }
            >
                {server && <ReportsChannel server={server} />}

                {server && <ReportsRole server={server} />}
            </div>
        </section>
    );
}
