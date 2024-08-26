'use client';
import { BsX } from 'react-icons/bs';
import { useQueryClient } from 'react-query';
import { useToast } from '@/components/ui/use-toast';

export function LogFilter({
    filtered,
    serverID,
}: {
    filtered: string;
    index: number;
    serverID: string;
}) {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function deleteReaction() {
        const body = new URLSearchParams();
        body.append('log', filtered);
        fetch(`/bot/v1/servers/${serverID}/log/filter`, {
            method: 'POST',
            body,
        })
            .then(async (data) => {
                const json = await data.json().catch(() => undefined);
                if (!json || json['error']) {
                    toast({
                        title: 'Failed to remove filtered log',
                        description: json['error']
                            ? json['error']
                            : 'An error occured.',
                        status: 'error',
                    });
                    return;
                }
                queryClient.invalidateQueries(['data_logging', serverID]);
                toast({
                    title: 'Filtered Log Removed',
                    description: `Successfully removed "${filtered
                        .split('_')
                        .map((i) => i[0] + i.slice(1).toLowerCase())
                        .join(' ')}" as a filtered log.`,
                    status: 'success',
                });
            })
            .catch(() => {});
    }
    return (
        <span
            className={
                'flex w-full flex-row items-center justify-center gap-2 text-base'
            }
        >
            {filtered
                .split('_')
                .map((i) => i[0] + i.slice(1).toLowerCase())
                .join(' ')}{' '}
            <span
                className={
                    'hover-gradient h-fit w-fit cursor-pointer rounded-2xl border p-1 text-sm text-white transition-all hover:border-black hover:text-black'
                }
                onClick={() => deleteReaction()}
            >
                <BsX />
            </span>
        </span>
    );
}
