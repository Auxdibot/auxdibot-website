'use client';

import { BsCheckLg, BsStars } from 'react-icons/bs';
import { ChangeEvent, useState } from 'react';
import { useQueryClient } from 'react-query';

import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button/button';
export default function StarboardReactionCount({
    id,
    board,
}: {
    id: string;
    board: StarboardData;
}) {
    const [reactionCount, setReactionCount] = useState<
        number | string | undefined
    >(-1);
    const [success, setSuccess] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function onStarboardReactionCountChange(e: ChangeEvent<HTMLInputElement>) {
        if (success) setSuccess(false);

        setReactionCount(Number(e.target.value) ?? '');
    }
    function setStarboardReactionCount() {
        const body = new URLSearchParams();
        body.append(
            'reaction_count',
            reactionCount ? reactionCount.toString() : ''
        );
        body.append('board_name', board.board_name);
        fetch(`/bot/v1/servers/${id}/starboard/reaction_count`, {
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
                    description: `Starboard reaction count has been updated to ${reactionCount?.toLocaleString()}.`,
                    status: 'success',
                });
                queryClient.invalidateQueries(['data_starboard', id]);
                setSuccess(true);
            })
            .catch(() => {});
    }

    return (
        <div className={'mx-auto flex w-fit flex-col gap-3 p-4'}>
            <span className={'secondary flex flex-col text-center text-xl'}>
                Set Starboard Reaction Count
            </span>
            <span
                className={
                    'flex flex-row items-center justify-center gap-2 max-xl:flex-col'
                }
            >
                <Input
                    className={'w-16'}
                    type={'number'}
                    max={100}
                    value={
                        reactionCount == -1
                            ? board.count
                            : Number(reactionCount) || 0
                    }
                    onChange={onStarboardReactionCountChange}
                />
                <Button
                    onClick={() => setStarboardReactionCount()}
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
                            <BsStars /> Change Count
                        </>
                    )}
                </Button>
            </span>
        </div>
    );
}
