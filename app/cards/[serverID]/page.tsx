'use client';

import NotFound from '@/app/not-found';
import { CardLeaderboard } from '@/components/public/cards/CardLeaderboard';
import LatestMessages from '@/components/public/cards/LatestMessages';
import ServerInfo from '@/components/public/cards/ServerInfo';
import ServerRules from '@/components/public/cards/ServerRules';
import { GradientTemplates } from '@/lib/constants/GradientTemplates';
import { CardData } from '@/lib/types/CardData';
import { useQuery } from 'react-query';
import { useMediaQuery } from 'react-responsive';

export default function ServerCardPage({
    params,
}: {
    params: { serverID: string };
}) {
    const { data, status, error } = useQuery<
        CardData | { error: string } | undefined
    >(
        [params.serverID, 'card'],
        async () =>
            await fetch(`/bot/v1/cards/${params.serverID}`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined)
    );
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    if ((!data && status != 'loading') || error || (data && 'error' in data)) {
        return <NotFound />;
    }

    if (status == 'loading') return <></>;
    const gradient =
        GradientTemplates?.[
            (data as CardData)?.background?.gradient || 'BACKGROUND'
        ] ?? undefined;
    return (
        <main
            className={`${data?.dark ? 'bg-black' : 'bg-gray-100'} ${data?.dark ? 'text-gray-100' : 'text-gray-800'} flex flex-col items-center justify-center overflow-x-hidden max-md:p-1`}
            style={{
                backgroundImage:
                    gradient &&
                    gradient(
                        data?.background?.color1,
                        data?.background?.color2
                    ),
            }}
        >
            <div
                className={
                    'mx-auto flex min-h-screen w-full animate-fadeIn items-center justify-center gap-20 p-1 max-md:mt-12 max-md:flex-col'
                }
            >
                {isMobile ? (
                    <>
                        {data && (
                            <ServerInfo
                                data={data}
                                serverID={params.serverID}
                            />
                        )}
                        {data?.rules && <ServerRules data={data} />}
                        {data?.channel && <LatestMessages data={data} />}
                    </>
                ) : (
                    <>
                        <div className={'flex flex-1 justify-center'}>
                            {data?.channel && <LatestMessages data={data} />}
                        </div>
                        <div className={'flex flex-1 justify-center'}>
                            {data && (
                                <ServerInfo
                                    data={data}
                                    serverID={params.serverID}
                                />
                            )}
                        </div>
                        <div className={'flex flex-1 justify-center'}>
                            {data?.rules && data.rules.length > 0 && (
                                <ServerRules data={data} />
                            )}
                        </div>
                    </>
                )}
            </div>
            {data && <CardLeaderboard data={data} serverID={params.serverID} />}
        </main>
    );
}
