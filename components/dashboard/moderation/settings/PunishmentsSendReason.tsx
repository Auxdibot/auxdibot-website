'use client';
import { useToast } from '@/components/ui/use-toast';

import { BsChatDots } from 'react-icons/bs';
import { useQueryClient } from 'react-query';

export default function PunishmentsSendReason({
    server,
}: {
    server: { serverID: string; punishment_send_reason: boolean };
}) {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    function handleClick() {
        fetch(`/bot/v1/servers/${server.serverID}/moderation/send_reason`, {
            method: 'POST',
        })
            .then(async (data) => {
                const json = await data.json().catch(() => undefined);
                if (!json || json['error']) {
                    toast({
                        title: 'Failed to update punishments',
                        description: json['error'] ?? 'An error occured',
                        status: 'error',
                    });
                    return;
                }
                toast({
                    title: 'Punishment Settings Updated',
                    description: json['data']?.punishment_send_reason
                        ? 'Auxdibot will send the punishment reason to the user when a punishment is issued.'
                        : 'Auxdibot will no longer send the punishment reason to the user when a punishment is issued.',

                    status: 'success',
                });
                queryClient.invalidateQueries([
                    'data_moderation',
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
                className={`absolute bottom-1/2 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-gradient-to-l transition-all ${!server.punishment_send_reason ? '-translate-x-0.5 from-red-500 to-red-700' : 'translate-x-full from-green-500 to-green-700'}`}
            >
                <span className={'text-md text-white opacity-60'}>
                    <BsChatDots />
                </span>
            </div>
        </div>
    );
}
