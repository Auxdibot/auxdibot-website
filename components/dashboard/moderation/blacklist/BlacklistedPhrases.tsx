'use client';

import { Controller, useForm } from 'react-hook-form';
import { BsShieldSlash } from 'react-icons/bs';
import { useQueryClient } from 'react-query';
import BlacklistedPhrase from './BlacklistedPhrase';
import BlacklistPunishment from './BlacklistPunishment';
import { PunishmentType } from '@/lib/types/PunishmentType';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { PunishmentNames } from '@/lib/constants/PunishmentNames';

type BlacklistedPhrasesBody = { phrase: string };

export default function BlacklistedPhrases({
    server,
}: {
    server: {
        readonly serverID: string;
        readonly automod_banned_phrases: string[];
        readonly automod_banned_phrases_punishment: PunishmentType;
    };
}) {
    const { control, reset, handleSubmit } = useForm<BlacklistedPhrasesBody>();

    const { toast } = useToast();
    const queryClient = useQueryClient();
    function onSubmit(data: BlacklistedPhrasesBody) {
        let body = new URLSearchParams();
        body.append('blacklisted_phrase', data.phrase ?? '');

        fetch(`/bot/v1/servers/${server.serverID}/moderation/blacklist`, {
            method: 'PATCH',
            body,
        })
            .then(async (res) => {
                const json = await res.json().catch(() => undefined);
                if (!json || json['error']) {
                    toast({
                        title: 'Failed to add blacklisted phrase',
                        description:
                            json?.error ??
                            'An error occurred while adding blacklisted phrase.',
                        status: 'error',
                    });
                    return;
                }
                queryClient.invalidateQueries([
                    'data_moderation',
                    server.serverID,
                ]);
                reset({ phrase: '' });
                toast({
                    title: 'Added Blacklisted Phrase',
                    description: `Users will now receive a ${PunishmentNames[server.automod_banned_phrases_punishment].name} after using the phrase "${data.phrase}"`,
                    status: 'success',
                });
            })
            .catch(() => {});
    }
    return (
        <div
            className={
                'w-full self-stretch rounded-2xl border-2 border-gray-800 shadow-2xl max-md:mx-auto'
            }
        >
            <h2
                className={
                    'secondary rounded-2xl rounded-b-none p-4 text-center text-2xl'
                }
            >
                Blacklisted Phrases
            </h2>

            {server.automod_banned_phrases &&
            server.automod_banned_phrases.length > 0 ? (
                <ul
                    className={
                        'mx-auto my-2 w-fit columns-3 rounded-2xl border border-gray-800 p-2 max-2xl:columns-2 max-[420px]:columns-1'
                    }
                >
                    {server.automod_banned_phrases &&
                        server.automod_banned_phrases.map((i, index) => (
                            <BlacklistedPhrase
                                serverID={server.serverID}
                                phrase={i}
                                index={index}
                                key={index}
                            />
                        ))}
                </ul>
            ) : (
                <h2
                    className={
                        'text-center font-open-sans text-xl text-gray-400'
                    }
                >
                    No banned phrases found.
                </h2>
            )}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={
                    'flex flex-col items-center justify-center gap-3 py-2'
                }
            >
                <div
                    className={
                        'flex w-full flex-1 justify-center gap-2 max-md:flex-col md:px-20'
                    }
                >
                    <section
                        className={
                            'flex flex-1 flex-col items-center justify-between'
                        }
                    >
                        <Controller
                            control={control}
                            name={'phrase'}
                            rules={{ required: true }}
                            render={({ field }) => {
                                return (
                                    <Input
                                        placeholder={'Banned phrase here...'}
                                        className={'w-48'}
                                        onChange={field.onChange}
                                        value={field.value}
                                    />
                                );
                            }}
                        />
                    </section>
                </div>

                <Button
                    variant={'outline'}
                    type='submit'
                    className={`mx-auto flex w-fit flex-row items-center gap-2`}
                >
                    <BsShieldSlash /> Add
                </Button>
            </form>
            <BlacklistPunishment server={server} />
        </div>
    );
}
