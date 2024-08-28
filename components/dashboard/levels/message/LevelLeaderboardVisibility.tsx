'use client';
import { useToast } from '@/components/ui/use-toast';
import { BsTrophy } from 'react-icons/bs';
import { useQueryClient } from 'react-query';

export default function LevelLeaderboardVisibility({
    server,
}: {
    server: { serverID: string; publicize_leaderboard: boolean };
}) {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    function handleClick() {
        fetch(
            `/bot/v1/servers/${server.serverID}/levels/leaderboard_visibility`,
            { method: 'POST' }
        )
            .then(async (res) => {
                const json = await res.json().catch(() => undefined);
                if (!json || json['error']) {
                    toast({
                        title: 'Failed to update leaderboard visibility',
                        description: json['error'] ?? 'An error occured',
                        status: 'error',
                    });
                    return;
                }
                toast({
                    title: 'Level Embed Updated',
                    description: json['publicize_leaderboard']
                        ? "The leaderboard will now be publicly accessible on Auxdibot's website."
                        : "The leaderboard will no longer be publicly accessible on Auxdibot's website.",
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
                className={`absolute bottom-1/2 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-gradient-to-l transition-all ${!server.publicize_leaderboard ? '-translate-x-0.5 from-red-500 to-red-700' : 'translate-x-full from-green-500 to-green-700'}`}
            >
                <span className={'text-md text-white opacity-60'}>
                    <BsTrophy />
                </span>
            </div>
        </div>
    );
}
