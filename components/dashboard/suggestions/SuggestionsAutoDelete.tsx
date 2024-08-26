'use client';
import { useToast } from '@/components/ui/use-toast';
import { BsTrash } from 'react-icons/bs';
import { useQueryClient } from 'react-query';

export default function SuggestionsAutoDelete({
    server,
}: {
    server: { serverID: string; suggestions_auto_delete: boolean };
}) {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    function handleClick() {
        fetch(`/bot/v1/servers/${server.serverID}/suggestions/auto_delete`, {
            method: 'POST',
        })
            .then(async (data) => {
                const json = await data
                    .json()
                    .then((data) => data?.data)
                    .catch(() => undefined);
                toast({
                    title: 'Auto Delete Updated',
                    description: json
                        ? json['suggestions_auto_delete']
                            ? 'Suggestions will now automatically be deleted when they are responded to.'
                            : 'Suggestions will no longer be automatically deleted.'
                        : 'An error occurred. Please try again.',
                    status: !json || json['error'] ? 'error' : 'success',
                });
                queryClient.invalidateQueries([
                    'data_suggestions',
                    server.serverID,
                ]);
            })
            .catch(() => undefined);
    }
    return (
        <div
            className={
                'relative h-8 w-16 rounded-full border border-gray-700 px-1'
            }
        >
            <div
                onClick={() => handleClick()}
                className={`absolute bottom-1/2 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-gradient-to-l transition-all ${!server.suggestions_auto_delete ? '-translate-x-0.5 from-red-500 to-red-700' : 'translate-x-full from-green-500 to-green-700'}`}
            >
                <span className={'text-md text-white opacity-60'}>
                    <BsTrash />
                </span>
            </div>
        </div>
    );
}
