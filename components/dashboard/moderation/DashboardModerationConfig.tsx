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

export default function DashboardModerationConfig({ id }: { id: string }) {
    let { data: moderation } = useQuery(
        ['data_moderation', id],
        async () =>
            await fetch(`/bot/v1/servers/${id}/moderation`)
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
                <h1 className={'header text-6xl max-md:text-5xl'}>
                    moderation
                </h1>
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
    );
}
