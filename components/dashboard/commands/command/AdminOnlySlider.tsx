'use client';
import { useToast } from '@/components/ui/use-toast';
import { BsPeople, BsShield } from 'react-icons/bs';
import { useQueryClient } from 'react-query';

export default function AdminOnlySlider({
    command,
    subcommand,
    admin_only,
    id,
}: {
    command: string;
    subcommand?: string[];
    admin_only?: boolean;
    id: string;
}) {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    function handleClick() {
        const body = new URLSearchParams();

        body.append(
            'command',
            command + (subcommand ? ' ' + subcommand.join(' ') : '')
        );

        body.append('admin_only', !admin_only + '');
        fetch(`/bot/v1/servers/${id}/commands/admin_only`, {
            method: 'POST',
            body,
        })
            .then(async (data) => {
                const json = await data.json().catch(() => undefined);
                queryClient.invalidateQueries(['data_command_permissions', id]);
                if (!json || json['error']) {
                    toast({
                        title: `Error`,
                        description: `An error occurred while updating this command permission!`,
                        status: 'error',
                        duration: 5000,
                    });
                } else {
                    toast({
                        title: `Toggled Command Admin Only`,
                        description: `The command "/${command + ' ' + subcommand?.join(' ')}" is now ${!admin_only ? 'only allowed for Discord administrators.' : 'allowed for everyone. (This will not include members/roles that are blacklisted from using the command.)'}`,
                        status: 'success',
                        duration: 5000,
                    });
                }
            })
            .catch(() => undefined);
    }
    return (
        <div
            className={
                'relative h-8 w-16 rounded-full border border-gray-700 px-1 text-xl'
            }
        >
            <div
                onClick={() => handleClick()}
                className={`absolute bottom-1/2 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-gradient-to-l transition-all ${!admin_only ? '-translate-x-0.5 from-blue-500 to-blue-700' : 'translate-x-full from-gray-500 to-gray-700'}`}
            >
                <span className={'text-md text-white opacity-60'}>
                    {!admin_only ? <BsPeople /> : <BsShield />}
                </span>
            </div>
        </div>
    );
}
