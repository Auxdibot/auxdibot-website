import { DataTable } from '@/components/ui/data-table/data-table';
import { SuggestionsPayloadType } from '@/lib/types/SuggestionsPayloadType';
import { columns } from './table/column';

export default function Suggestions({
    server,
}: {
    server: {
        serverID: string;
        suggestions: SuggestionsPayloadType[];
    };
}) {
    return (
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
                Suggestions
            </h2>
            <div className={'p-2 max-md:max-w-[98vw]'}>
                {server?.suggestions?.length ? (
                    <DataTable
                        columns={columns(server.serverID)}
                        data={server?.suggestions.map((i, index) => ({
                            ...i,
                            index,
                        }))}
                    />
                ) : (
                    <h2
                        className={
                            'text-center font-open-sans text-xl text-gray-400'
                        }
                    >
                        No suggestions found.
                    </h2>
                )}
            </div>
        </div>
    );
}
