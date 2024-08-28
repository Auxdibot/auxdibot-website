'use client';

import NotificationType from '@/lib/types/NotificationType';
import { DataTable } from '@/components/ui/data-table/data-table';
import { columns } from './table/column';

export default function Notifications({
    notifications,
    serverID,
}: {
    serverID: string;
    notifications?: NotificationType[];
}) {
    return (
        <>
            <div
                className={
                    'h-full flex-1 flex-grow rounded-2xl border-2 border-gray-800 shadow-2xl max-md:mx-auto max-md:w-full'
                }
            >
                <h2
                    className={
                        'secondary rounded-2xl rounded-b-none p-4 text-center text-2xl'
                    }
                >
                    Your Notification Feeds
                </h2>
                <div className={'self-stretch p-2 max-md:max-w-[98vw]'}>
                    {notifications && notifications?.length > 0 ? (
                        <DataTable
                            columns={columns(serverID)}
                            data={notifications}
                        />
                    ) : (
                        <h2
                            className={
                                'text-center font-open-sans text-xl text-gray-400'
                            }
                        >
                            No notifications found.
                        </h2>
                    )}
                </div>
            </div>
        </>
    );
}
