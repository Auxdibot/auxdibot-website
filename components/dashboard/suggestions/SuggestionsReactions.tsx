'use client';

import EmojiPicker from '@/components/ui/emojis/emoji-picker';
import Twemoji from '@/components/ui/emojis/twemoji';
import { Button } from '@/components/ui/button/button';
import { useToast } from '@/components/ui/use-toast';
import { emojis } from '@/lib/constants/emojis';
import ServerEmojiBody from '@/lib/types/ServerEmojis';
import Image from 'next/image';
import { Suspense, useState } from 'react';
import { BsCheckLg, BsPlus, BsX } from 'react-icons/bs';
import { useQuery, useQueryClient } from 'react-query';

export function Reaction({
    reaction,
    index,
    serverID,
}: {
    reaction: string;
    index: number;
    serverID: string;
}) {
    const queryClient = useQueryClient();
    let { data: serverEmojis } = useQuery<ServerEmojiBody | undefined>(
        ['data_emojis', serverID],
        async () =>
            serverID &&
            (await fetch(`/bot/v1/servers/${serverID}/emojis`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined))
    );
    const { toast } = useToast();
    function deleteReaction() {
        if (!serverID) return;
        const body = new URLSearchParams();
        body.append('index', index.toString());
        fetch(`/bot/v1/servers/${serverID}/suggestions/reactions`, {
            method: 'DELETE',
            body,
        })
            .then(async (data) => {
                const json = await data
                    .json()
                    .then((data) => data?.data)
                    .catch(() => undefined);
                if (!json || json['error']) {
                    toast({
                        title: 'Failed to delete suggestions reaction',
                        description: json['error'] ?? 'An error occured',
                        status: 'error',
                    });
                    return;
                }
                queryClient.invalidateQueries(['data_suggestions', serverID]);
                toast({
                    title: 'Reaction Deleted',
                    description: `Successfully deleted reaction: ${reaction}`,
                    status: !json || json['error'] ? 'error' : 'success',
                });
            })
            .catch(() => {});
    }
    const serverEmojiValue = serverEmojis?.emojis.find(
        (i2) => i2.id == reaction
    );
    const emojiValue = !serverEmojiValue
        ? emojis
              .find((i2) => i2.emojis.find((emoji) => emoji.emoji == reaction))
              ?.emojis.find((emoji) => emoji.emoji == reaction)
        : undefined;
    return (
        <span className={'flex flex-row items-center gap-2 text-2xl'}>
            {serverEmojiValue ? (
                <Image
                    width={24}
                    height={24}
                    alt={serverEmojiValue.name}
                    draggable='false'
                    loading='lazy'
                    src={serverEmojiValue.image}
                />
            ) : (
                <Twemoji>{emojiValue?.hexcode.toLowerCase() ?? ''}</Twemoji>
            )}{' '}
            <span
                className={
                    'hover-gradient h-fit w-fit cursor-pointer rounded-2xl border border-gray-700 p-1 text-lg text-gray-700 transition-all hover:border-black hover:text-black'
                }
                onClick={() => deleteReaction()}
            >
                <BsX />
            </span>
        </span>
    );
}

export default function SuggestionsReactions({
    server,
}: {
    server: {
        serverID: string;
        suggestions_reactions: string[];
    };
}) {
    const [success, setSuccess] = useState(false);
    const [reaction, setReaction] = useState('');
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function addSuggestionReaction() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append('suggestion_reaction', reaction);
        fetch(`/bot/v1/servers/${server.serverID}/suggestions/reactions`, {
            method: 'PATCH',
            body,
        })
            .then(async (data) => {
                const json = await data.json().catch(() => undefined);
                if (!json || json['error']) {
                    toast({
                        title: 'Failed to add suggestions reaction',
                        description: json['error'] ?? 'An error occured',
                        status: 'error',
                    });
                    return;
                }
                toast({
                    title: 'Reaction Added',
                    description: `Successfully added reaction: ${reaction}`,
                    status: !json || json['error'] ? 'error' : 'success',
                });
                queryClient.invalidateQueries([
                    'data_suggestions',
                    server.serverID,
                ]);
                setSuccess(true);
                setReaction('');
            })
            .catch(() => {});
    }
    return (
        <div
            className={
                'flex h-fit w-full flex-col rounded-2xl border-2 border-gray-800 shadow-2xl max-md:mx-auto'
            }
        >
            <h2
                className={
                    'secondary rounded-2xl rounded-b-none p-4 text-center text-2xl'
                }
            >
                Suggestions Reactions
            </h2>
            <ul
                className={
                    'mx-auto my-4 grid max-w-sm grid-cols-3 items-center gap-4 max-md:grid-cols-2'
                }
            >
                <Suspense fallback={null}>
                    {server?.suggestions_reactions?.map((i, index) => (
                        <li key={index}>
                            <Reaction
                                reaction={i}
                                index={index}
                                serverID={server.serverID}
                            />
                        </li>
                    ))}
                </Suspense>
            </ul>
            <div className={'mx-auto my-5 flex gap-2 max-md:flex-col'}>
                <EmojiPicker
                    serverID={server?.serverID}
                    value={reaction}
                    onChange={(e) => setReaction(e.emoji ?? '')}
                />
                <Button
                    onClick={() => addSuggestionReaction()}
                    className={`flex w-fit flex-row items-center gap-2 max-md:mx-auto`}
                    variant={'outline'}
                    type='submit'
                >
                    {success ? (
                        <>
                            <BsCheckLg /> Updated!
                        </>
                    ) : (
                        <>
                            <BsPlus /> Add
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}
