'use client';

import { DataTable } from '@/components/ui/data-table/data-table';
import { columns } from './table/column';
import { StoredEmbed } from '@/lib/types/StoredEmbed';

export default function StoredEmbeds({
    stored_embeds,
    serverID,
}: {
    serverID: string;
    stored_embeds?: StoredEmbed[];
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
                    Your Stored Embeds
                </h2>
                <div className={'self-stretch p-2 max-md:max-w-[98vw]'}>
                    {stored_embeds && stored_embeds?.length > 0 ? (
                        <DataTable
                            columns={columns(serverID)}
                            data={stored_embeds}
                        />
                    ) : (
                        <h2
                            className={
                                'text-center font-open-sans text-xl text-gray-400'
                            }
                        >
                            No stored embeds found.
                        </h2>
                    )}
                </div>
            </div>
        </>
    );
}
