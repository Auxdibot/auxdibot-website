'use client';
import { useToast } from '@/components/ui/use-toast';
import DisableableModules from '@/lib/constants/DisableableModules';
import {
    BsChat,
    BsHammer,
    BsPersonBadge,
    BsQuestionCircle,
    BsStar,
    BsTrophy,
} from 'react-icons/bs';
import { PiHandWaving } from 'react-icons/pi';
import { useQueryClient } from 'react-query';

let ModuleIcons: {
    [K in (typeof DisableableModules)[number]]: React.ReactElement;
} = {
    Messages: <BsChat />,
    Moderation: <BsHammer />,
    Roles: <BsPersonBadge />,
    Levels: <BsTrophy />,
    Suggestions: <BsQuestionCircle />,
    Starboard: <BsStar />,
    Greetings: <PiHandWaving />,
};
export default function ModuleSlider({
    module,
    server,
}: {
    module: keyof typeof ModuleIcons;
    server: { data: { serverID: string; disabled_modules: string[] } };
}) {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    function handleClick() {
        const body = new URLSearchParams();

        body.append('module', module);
        fetch(`/bot/v1/servers/${server.data.serverID}/modules`, {
            method: 'PATCH',
            body,
        })
            .then(async (data) => {
                const json = await data.json().catch(() => undefined);
                queryClient.invalidateQueries([
                    'data_settings',
                    server.data.serverID,
                ]);
                if (!json || json['error']) {
                    toast({
                        title: `Error`,
                        description: `An error occurred while updating modules!`,
                        status: 'error',
                        duration: 5000,
                    });
                } else {
                    toast({
                        title: `Toggled Module`,
                        description: `Successfully toggled ${module}. Its functionality is now ${server.data.disabled_modules.indexOf(module) == -1 ? 'disabled' : 'enabled'} and any commands for this module will be ${server.data.disabled_modules.indexOf(module) == -1 ? 'ignored' : 'accepted'}.`,
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
                className={`absolute bottom-1/2 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-gradient-to-l transition-all ${server.data.disabled_modules.indexOf(module) != -1 ? '-translate-x-0.5 from-red-500 to-red-700' : 'translate-x-full from-green-500 to-green-700'}`}
            >
                <span className={'text-md text-white opacity-60'}>
                    {ModuleIcons[module]}
                </span>
            </div>
        </div>
    );
}
