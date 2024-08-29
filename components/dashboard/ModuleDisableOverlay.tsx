import { useQuery, useQueryClient } from 'react-query';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { CircleOff } from 'lucide-react';
import { Button } from '../ui/button/button';
import { useToast } from '../ui/use-toast';
import Link from 'next/link';

export function ModuleDisableOverlay({
    module,
    id,
}: {
    module: string;
    id: string;
}) {
    let { data: settings } = useQuery(
        ['data_settings', id],
        async () =>
            await fetch(`/bot/v1/servers/${id}/modules`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined)
    );
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function handleClick() {
        const body = new URLSearchParams();

        body.append('module', module);
        fetch(`/bot/v1/servers/${id}/modules`, {
            method: 'PATCH',
            body,
        })
            .then(async (data) => {
                const json = await data.json().catch(() => undefined);
                queryClient.invalidateQueries(['data_settings', id]);
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
                        description: `Successfully toggled ${module}. Its functionality is now ${settings.data.disabled_modules.indexOf(module) == -1 ? 'disabled' : 'enabled'} and any commands for this module will be ${settings.data.disabled_modules.indexOf(module) == -1 ? 'ignored' : 'accepted'}.`,
                        status: 'success',
                        duration: 5000,
                    });
                }
            })
            .catch(() => undefined);
    }
    if (
        !settings?.data?.disabled_modules ||
        !settings.data?.disabled_modules?.includes(module)
    )
        return <></>;
    return (
        <section className='absolute z-30 flex h-full w-full flex-grow overflow-visible md:left-64 md:w-[calc(100%-256px)]'>
            <div className='relative w-full self-stretch backdrop-blur-sm'>
                <Alert
                    variant={'destructive'}
                    className='absolute left-1/2 top-[calc(50vh-64px)] flex max-w-lg -translate-x-1/2 flex-col gap-2 bg-gray-950 max-md:w-full max-md:text-center'
                >
                    <AlertTitle className='flex items-center gap-2 font-raleway text-3xl font-bold max-md:justify-center'>
                        <CircleOff /> Module Disabled
                    </AlertTitle>
                    <AlertDescription className='text-base'>
                        This module is currently disabled. Its features are
                        inaccessible and its functionalities are turned off. Run
                        the <code>/modules enable {module}</code> command, or go
                        to &quot;Settings&quot; to enable it!
                    </AlertDescription>
                    <span className='flex w-full justify-between px-3 text-gray-50'>
                        <Link href={`/dashboard/${id}`}>
                            <Button
                                variant='outline'
                                className='w-full max-w-[5rem]'
                            >
                                Home
                            </Button>
                        </Link>
                        <Button
                            onClick={handleClick}
                            variant='success'
                            className='w-full max-w-[5rem]'
                        >
                            Enable
                        </Button>
                    </span>
                </Alert>
            </div>
        </section>
    );
}
