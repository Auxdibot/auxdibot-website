'use client';

import ScheduleType from '@/lib/types/ScheduleType';
import { DataTable } from '@/components/ui/data-table/data-table';
import { columns } from './table/column';

export default function Schedules({
    schedules,
    serverID,
}: {
    serverID: string;
    schedules?: ScheduleType[];
}) {
    return (
        <>
            <div
                className={
                    'h-full w-full flex-1 flex-grow rounded-2xl border-2 border-gray-800 shadow-2xl max-md:mx-auto'
                }
            >
                <h2
                    className={
                        'secondary rounded-2xl rounded-b-none p-4 text-center text-2xl'
                    }
                >
                    Your Schedules
                </h2>
                <div className={'self-stretch p-2 max-md:max-w-[98vw]'}>
                    {schedules && schedules?.length > 0 ? (
                        <DataTable
                            columns={columns(serverID)}
                            data={schedules}
                        />
                    ) : (
                        <h2
                            className={
                                'text-center font-open-sans text-xl text-gray-400'
                            }
                        >
                            No schedules found.
                        </h2>
                    )}
                </div>
            </div>
        </>
    );
}
