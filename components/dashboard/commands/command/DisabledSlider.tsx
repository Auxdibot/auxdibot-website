'use client';
import { useToast } from '@/components/ui/use-toast';
import { BsCheck, BsX } from 'react-icons/bs';
import { useQueryClient } from 'react-query';

export default function DisabledSlider({
    command,
    subcommand,
    disabled,
    id,
}: {
    command: string;
    subcommand?: string[];
    disabled?: boolean;
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

        body.append('disabled', !disabled + '');
        fetch(`/bot/v1/servers/${id}/commands/disable`, {
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
                        title: `Toggled Command`,
                        description: `Successfully toggled the command "/${command + ' ' + subcommand?.join(' ')}". Its functionality is now ${!disabled ? 'disabled' : 'enabled'}.`,
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
                className={`absolute bottom-1/2 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-gradient-to-l transition-all ${disabled ? '-translate-x-0.5 from-red-500 to-red-700' : 'translate-x-full from-green-500 to-green-700'}`}
            >
                <span className={'text-md text-white opacity-60'}>
                    {disabled ? <BsX /> : <BsCheck />}
                </span>
            </div>
        </div>
    );
}
