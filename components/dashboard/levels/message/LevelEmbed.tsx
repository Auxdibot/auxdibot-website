'use client';
import { useToast } from '@/components/ui/use-toast';
import { BsChevronBarUp } from 'react-icons/bs';
import { useQueryClient } from 'react-query';

export default function LevelEmbed({
    server,
}: {
    server: { serverID: string; level_embed: boolean };
}) {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    function handleClick() {
        fetch(`/bot/v1/servers/${server.serverID}/levels/embed`, {
            method: 'POST',
        })
            .then(async (res) => {
                const json = await res.json().catch(() => undefined);
                if (!json || json['error']) {
                    toast({
                        title: 'Failed to update level embed',
                        description: json['error'] ?? 'An error occured',
                        status: 'error',
                    });
                    return;
                }
                toast({
                    title: 'Level Embed Updated',
                    description: json['level_embed']
                        ? 'Auxdibot will post a level up embed when a member levels up.'
                        : 'Auxdibot will no longer post a level up embed when a member levels up.',
                    status: 'success',
                });
                queryClient.invalidateQueries(['data_levels', server.serverID]);
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
                className={`absolute bottom-1/2 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-gradient-to-l transition-all ${!server.level_embed ? '-translate-x-0.5 from-red-500 to-red-700' : 'translate-x-full from-green-500 to-green-700'}`}
            >
                <span className={'text-md text-white opacity-60'}>
                    <BsChevronBarUp />
                </span>
            </div>
        </div>
    );
}
