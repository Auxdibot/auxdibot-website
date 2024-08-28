'use client';

import ModuleSlider from './ModuleSlider';
import DisableableModules from '@/lib/constants/DisableableModules';

export default function DisabledModules({
    server,
}: {
    server: { data: { serverID: string; disabled_modules: string[] } };
}) {
    if (!server?.data?.disabled_modules) return <></>;
    return (
        <div
            className={
                'w-full rounded-2xl border-2 border-gray-800 shadow-2xl max-md:mx-auto'
            }
        >
            <h2
                className={
                    'secondary rounded-2xl rounded-b-none p-4 text-center text-2xl'
                }
            >
                Disabled Modules
            </h2>
            {server?.data?.disabled_modules ? (
                <ul
                    className={
                        'text ml-5 mt-5 flex flex-col justify-center gap-2 p-4 pt-0 text-lg'
                    }
                >
                    {DisableableModules.map((i) => (
                        <li key={i}>
                            <span
                                className={
                                    'flex flex-row items-center gap-2 text-xl'
                                }
                            >
                                <ModuleSlider module={i} server={server} />
                                <span
                                    className={`flex flex-row max-md:flex-col md:gap-2 ${server.data.disabled_modules.includes(i) ? 'line-through' : ''}`}
                                >
                                    {i}
                                </span>
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                ''
            )}
        </div>
    );
}
