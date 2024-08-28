'use client';
import { useQuery } from 'react-query';
import DisabledModules from './bot/DisabledModules';
import AuxdibotSettings from './bot/AuxdibotSettings';
import ServerSettings from './server/ServerSettings';
import { Settings } from 'lucide-react';

export default function DashboardSettingsConfig({ id }: { id: string }) {
    let { data: settings } = useQuery(
        ['data_settings', id],
        async () =>
            await fetch(`/bot/v1/servers/${id}/modules`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined)
    );

    return (
        <main className={'flex-grow bg-gray-950'}>
            <div
                className={
                    'flex animate-fadeIn flex-col gap-5 py-5 max-md:items-center md:px-5'
                }
            >
                <span className='mb-5 mt-2 flex items-center gap-5 max-md:flex-col'>
                    <div className='flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-800 bg-gradient-to-bl from-gray-500/40 to-gray-900/40 shadow transition-colors hover:bg-gray-500/40'>
                        <Settings size={'48'} />
                    </div>
                    <div className='flex flex-col max-md:items-center max-md:text-center'>
                        <h1
                            className={
                                'font-raleway text-4xl font-bold text-white'
                            }
                        >
                            Settings
                        </h1>
                        <p className='max-w-4xl font-inter text-lg'>
                            Configure basic Auxdibot settings here, or reset
                            your server data.
                        </p>
                    </div>
                </span>
                <span
                    className={
                        'grid grid-flow-row grid-cols-3 gap-5 max-xl:grid-cols-2 max-lg:grid-cols-1'
                    }
                >
                    <DisabledModules server={settings} />
                    <AuxdibotSettings server={settings} />
                    <ServerSettings />
                </span>
            </div>
        </main>
    );
}
