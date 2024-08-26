'use client';
import { useQuery } from 'react-query';
import DisabledModules from './bot/DisabledModules';
import AuxdibotSettings from './bot/AuxdibotSettings';
import ServerSettings from './server/ServerSettings';

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
                <h1 className={'header text-6xl max-md:text-5xl'}>settings</h1>
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
