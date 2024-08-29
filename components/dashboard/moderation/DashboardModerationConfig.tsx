'use client';
import { useQuery } from 'react-query';
import { Suspense } from 'react';
import LatestPunishments from './LatestPunishments';
import ModerationSettings from './ModerationSettings';
import RoleExceptions from './exceptions/RoleExceptions';
import BlacklistedPhrases from './blacklist/BlacklistedPhrases';
import SpamSettings from './spam/SpamSettings';
import AttachmentsSettings from './attachments/AttachmentsSettings';
import InvitesSettings from './invites/InvitesSettings';
import { ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button/button';
import { ModuleDisableOverlay } from '../ModuleDisableOverlay';

export default function DashboardModerationConfig({ id }: { id: string }) {
    let { data: moderation } = useQuery(
        ['data_moderation', id],
        async () =>
            await fetch(`/bot/v1/servers/${id}/moderation`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined)
    );

    return (
        <>
            <ModuleDisableOverlay id={id} module={'Moderation'} />
            <main className={'flex-grow bg-gray-950'}>
                <div
                    className={
                        'flex animate-fadeIn flex-col gap-5 py-5 max-md:items-center md:px-5'
                    }
                >
                    <span className='mb-5 mt-2 flex items-center gap-5 max-md:flex-col'>
                        <div className='flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-800 bg-gradient-to-bl from-gray-500/40 to-gray-900/40 shadow transition-colors hover:bg-gray-500/40'>
                            <ShieldAlert size={'48'} />
                        </div>
                        <div className='flex flex-col max-md:items-center max-md:text-center'>
                            <h1
                                className={
                                    'header flex items-center font-raleway text-4xl font-bold'
                                }
                            >
                                Moderation
                                <Link
                                    target='_blank'
                                    href={
                                        process.env
                                            .NEXT_PUBLIC_DOCUMENTATION_LINK +
                                        '/modules/moderation'
                                    }
                                >
                                    <Button className='text-sm' variant='link'>
                                        [docs]
                                    </Button>
                                </Link>
                            </h1>
                            <p className='max-w-4xl font-inter text-lg'>
                                Allows users to utilize various punishment and
                                reporting tools, auto-moderation utilities, and
                                more.
                            </p>
                        </div>
                    </span>
                    <span className={'flex w-full gap-5 max-xl:flex-col'}>
                        <Suspense fallback={null}>
                            <LatestPunishments serverID={id} />
                            {moderation?.data && (
                                <ModerationSettings server={moderation?.data} />
                            )}
                        </Suspense>
                    </span>

                    <span className={'flex gap-5 max-xl:flex-col'}>
                        {moderation?.data && (
                            <SpamSettings server={moderation?.data} />
                        )}
                        {moderation?.data && (
                            <AttachmentsSettings server={moderation?.data} />
                        )}
                        {moderation?.data && (
                            <InvitesSettings server={moderation?.data} />
                        )}
                    </span>
                    <span className={'flex gap-5 max-xl:flex-col'}>
                        {moderation?.data && (
                            <BlacklistedPhrases server={moderation?.data} />
                        )}
                        {moderation?.data && (
                            <RoleExceptions server={moderation?.data} />
                        )}
                    </span>
                </div>
            </main>
        </>
    );
}
