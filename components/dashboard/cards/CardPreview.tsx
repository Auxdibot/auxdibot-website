'use client';
import { BsEye } from 'react-icons/bs';
import { CardData } from '@/lib/types/CardData';
import { useQuery } from 'react-query';
import CardInfo from './CardInfo';
import { Button } from '@/components/ui/button/button';

export function CardPreview({ id, values }: { id: string; values: any }) {
    const { data: card } = useQuery<CardData | { error: string } | undefined>(
        [id, 'card'],
        async () =>
            await fetch(`/bot/v1/cards/${id}`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined)
    );
    function createLink() {
        window.open(
            `/dashboard/${id}/cardPreview?bg_color1=${values.background?.color1 ?? '000000'}&bg_color2=${values.background?.color2 ?? '000000'}&bg_gradient=${values.background?.gradient}&description=${values.description ?? ''}&dark=${values.dark ?? 'false'}&header_font=${values.header_font ?? 'BAUHAUS_93'}&text_font=${values.text_font ?? 'ROBOTO'}&description=${values.description ?? ''}&channelID=${values.channelID}${values.rulesField.map((i: { rule: string }) => `&rules=${i.rule}`).join('')}`,
            '_blank',
            'noreferrer'
        );
    }
    return (
        <div className={'flex h-fit w-fit max-w-full flex-col gap-20'}>
            <div
                className={
                    'h-fit w-full flex-1 flex-shrink-0 flex-grow rounded-2xl border-2 border-gray-800 pb-4 shadow-2xl max-md:mx-auto'
                }
            >
                <h2
                    className={
                        'secondary rounded-2xl rounded-b-none p-4 text-center text-2xl'
                    }
                >
                    Card Preview
                </h2>
                <p
                    className={
                        'text-md p-2 text-center font-open-sans text-base italic text-gray-400'
                    }
                >
                    You can go to your card preview link by clicking the button
                    down below. This will display a preview version of your Card
                    settings for you to look at and share with other
                    Administrators on your server.
                </p>
                <Button
                    variant={'outline'}
                    className={`mx-auto flex w-fit flex-row items-center gap-2`}
                    onClick={createLink}
                >
                    <BsEye /> Open Preview
                </Button>
            </div>
            {card && !('error' in card) && (
                <CardInfo server={{ name: card?.server?.name, id }} />
            )}
        </div>
    );
}
