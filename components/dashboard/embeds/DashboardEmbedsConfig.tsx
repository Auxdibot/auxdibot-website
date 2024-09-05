'use client';
import { useQuery } from 'react-query';

import { Button } from '@/components/ui/button/button';

import { Text } from 'lucide-react';
import Link from 'next/link';

import { ModuleDisableOverlay } from '../ModuleDisableOverlay';

import StoredEmbeds from './StoredEmbeds';
import { StoredEmbed } from '@/lib/types/StoredEmbed';
import { EmbedForm } from './form/EmbedForm';

export default function DashboardEmbedsConfig({ id }: { id: string }) {
    const { data: embeds } = useQuery<
        { data: { stored_embeds: StoredEmbed[] } } | undefined
    >(
        ['data_embeds', id],
        async () =>
            await fetch(`/bot/v1/servers/${id}/embeds`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined)
    );

    return (
        <>
            <ModuleDisableOverlay id={id} module={'Messages'} />
            <main className={'flex-grow bg-gray-950'}>
                <div
                    className={
                        'flex max-w-full animate-fadeIn flex-col gap-5 py-5 max-md:items-center md:px-5'
                    }
                >
                    <span className='mb-5 mt-2 flex items-center gap-5 max-md:flex-col'>
                        <div className='flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-800 bg-gradient-to-bl from-gray-500/40 to-gray-900/40 shadow transition-colors hover:bg-gray-500/40'>
                            <Text size={'48'} />
                        </div>
                        <div className='flex flex-col max-md:items-center max-md:text-center'>
                            <h1
                                className={
                                    'header flex items-center font-raleway text-4xl font-bold'
                                }
                            >
                                Embeds
                                <Link
                                    target='_blank'
                                    href={
                                        process.env
                                            .NEXT_PUBLIC_DOCUMENTATION_LINK +
                                        '/modules/embeds'
                                    }
                                >
                                    <Button className='text-sm' variant='link'>
                                        [docs]
                                    </Button>
                                </Link>
                            </h1>
                            <p className='max-w-4xl font-inter text-lg'>
                                Allows users to create complex Discord Embeds
                                and store them for use in other Auxdibot
                                modules.
                            </p>
                        </div>
                    </span>
                    <div
                        className={
                            'grid h-full w-full flex-auto grid-cols-2 flex-row gap-10 max-xl:flex max-xl:flex-col'
                        }
                    >
                        <EmbedForm id={id} />
                        <StoredEmbeds
                            serverID={id}
                            stored_embeds={embeds?.data?.stored_embeds}
                        />
                    </div>
                </div>
            </main>
        </>
    );
}
