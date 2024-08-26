'use client';

import { BsCheckLg, BsStarFill } from 'react-icons/bs';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import EmojiPicker from '@/components/ui/emojis/emoji-picker';
import { Button } from '@/components/ui/button/button';
import { useToast } from '@/components/ui/use-toast';
export default function StarboardReaction({
    id,
    board,
}: {
    id: string;
    board: StarboardData;
}) {
    const [reaction, setReaction] = useState('');
    const [success, setSuccess] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function onStarboardReactionChange(e: { emoji: string | null }) {
        if (success) setSuccess(false);

        setReaction(e.emoji ?? '');
    }
    function setStarboardReaction() {
        const body = new URLSearchParams();
        body.append('starboard_reaction', reaction);
        body.append('board_name', board.board_name);
        fetch(`/bot/v1/servers/${id}/starboard/reaction`, {
            method: 'POST',
            body,
        })
            .then(async (data) => {
                const json = await data.json().catch(() => undefined);

                if (!json || json['error']) {
                    toast({
                        title: 'Failed to update starboard',
                        description: json['error'] ?? 'An error occured',
                        status: 'error',
                    });
                    return;
                }
                toast({
                    title: 'Starboard Updated',
                    description: `Starboard reaction has been updated to ${reaction}.`,
                    status: 'success',
                });
                setSuccess(true);
                queryClient.invalidateQueries(['data_starboard', id]);
            })
            .catch(() => {});
    }

    return (
        <div
            className={
                'mx-auto flex w-fit flex-col gap-3 border-b border-gray-700 p-4'
            }
        >
            <span className={'secondary flex flex-col text-center text-xl'}>
                Set Starboard Reaction
            </span>
            <span
                className={
                    'flex flex-row items-center justify-center gap-2 max-xl:flex-col'
                }
            >
                <EmojiPicker
                    serverID={id}
                    value={reaction == '' ? board.reaction : reaction}
                    onChange={onStarboardReactionChange}
                />
                <Button
                    onClick={() => setStarboardReaction()}
                    className={`flex w-fit flex-row items-center gap-2 max-xl:mx-auto`}
                    variant={'outline'}
                    type='submit'
                >
                    {success ? (
                        <>
                            <BsCheckLg /> Updated!
                        </>
                    ) : (
                        <>
                            <BsStarFill /> Change Reaction
                        </>
                    )}
                </Button>
            </span>
        </div>
    );
}
