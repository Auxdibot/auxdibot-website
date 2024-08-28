'use client';

import { DataTable } from '@/components/ui/data-table/data-table';

import { columns } from './table/column';

export default function Logs({
    logs,
}: {
    logs?: {
        type: string;
        userID: string;
        date_unix: number;
        description: string;
    }[];
}) {
    return (
        <div
            className={
                'w-full self-stretch rounded-2xl border-2 border-gray-800 shadow-2xl max-md:mx-auto'
            }
        >
            <h2
                className={
                    'secondary rounded-2xl rounded-b-none p-4 text-center text-2xl'
                }
            >
                Log History
            </h2>
            <div className='p-2'>
                {logs && logs?.length > 0 ? (
                    <DataTable columns={columns} data={logs.reverse()} />
                ) : (
                    <h2
                        className={
                            'text-center font-open-sans text-xl text-gray-400'
                        }
                    >
                        No logs found.
                    </h2>
                )}
            </div>
        </div>
    );
}
