"use client";
import { BsEye } from 'react-icons/bs';
import { CardData } from '@/lib/types/CardData';
import { useQuery } from 'react-query';
import CardInfo from './CardInfo';
import { Button } from '@/components/ui/button';

export function CardPreview({ id, values }: { id: string, values: any }) {
    const { data: card } = useQuery<CardData | { error: string; } | undefined>([id, 'card'], async () => await fetch(`/api/v1/cards/${id}`).then(async (data) => await data.json().catch(() => undefined)).catch(() => undefined));
    function createLink() {

        console.log(values.rulesField)
        window.open(`/dashboard/${id}/cardPreview?bg_color1=${values.background?.color1 ?? '000000'}&bg_color2=${values.background?.color2 ?? '000000'}&bg_gradient=${values.background?.gradient}&description=${values.description?? ""}&dark=${values.dark ?? "false"}&header_font=${values.header_font ?? "BAUHAUS_93"}&text_font=${values.text_font ?? "ROBOTO"}&description=${values.description ?? ""}&channelID=${values.channelID}${values.rulesField.map((i: { rule: string }) => `&rules=${i.rule}`).join('')}`, "_blank", "noreferrer")
    }
    return <div className={"flex flex-col gap-20 h-fit max-w-full w-fit"}>
        <div className={"flex-1 flex-grow flex-shrink-0 shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto pb-4"}>
            <h2 className={"secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Card Preview</h2>
            <p className={"text-md font-open-sans text-gray-400 italic text-base text-center p-2"}>You can go to your card preview link by clicking the button down below. This will display a preview version of your Card settings for you to look at and share with other Administrators on your server.</p>
            <Button variant={'outline'} className={`flex flex-row gap-2 mx-auto w-fit items-center`} onClick={createLink}><BsEye /> Open Preview</Button>
        </div>
        {card && !('error' in card) && <CardInfo server={{ name: card?.server?.name, id }} />}
    </div>;
}
