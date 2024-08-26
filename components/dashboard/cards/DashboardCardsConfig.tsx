'use client';
import { useForm } from 'react-hook-form';

import { CardPreview } from './CardPreview';
import { CardBody } from './CardBody';
import { CreateCard } from './CreateCard';

export default function DashboardCardsConfig({ id }: { id: string }) {
    const form = useForm<CardBody>();

    return (
        <main className={'flex-grow bg-gray-950'}>
            <div
                className={
                    'flex animate-fadeIn flex-col gap-5 py-5 max-md:items-center md:px-5'
                }
            >
                <h1 className={'header text-6xl max-md:text-5xl'}>cards</h1>
                <span className={'flex w-full flex-row gap-10 max-xl:flex-col'}>
                    <CreateCard form={form} id={id} />
                    <CardPreview id={id} values={form.getValues()} />
                </span>
            </div>
        </main>
    );
}
