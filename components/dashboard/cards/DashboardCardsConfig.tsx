'use client';
import { useForm } from 'react-hook-form';

import { CardPreview } from './CardPreview';
import { CardBody } from './CardBody';
import { CreateCard } from './CreateCard';
import { ImageIcon } from 'lucide-react';

export default function DashboardCardsConfig({ id }: { id: string }) {
    const form = useForm<CardBody>();

    return (
        <main className={'flex-grow bg-gray-950'}>
            <div
                className={
                    'flex animate-fadeIn flex-col gap-5 py-5 max-md:items-center md:px-5'
                }
            >
                <span className='mb-5 mt-2 flex items-center gap-5 max-md:flex-col'>
                    <div className='flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-800 bg-gradient-to-bl from-gray-500/40 to-gray-900/40 shadow transition-colors hover:bg-gray-500/40'>
                        <ImageIcon size={'48'} />
                    </div>
                    <div className='flex flex-col max-md:items-center max-md:text-center'>
                        <h1
                            className={
                                'font-raleway text-4xl font-bold text-white'
                            }
                        >
                            Cards
                        </h1>
                        <p className='max-w-4xl font-inter text-lg'>
                            A built-in Auxdibot system, allowing users to design
                            their own website for their Discord server.
                        </p>
                    </div>
                </span>
                <span className={'flex w-full flex-row gap-10 max-xl:flex-col'}>
                    <CreateCard form={form} id={id} />
                    <CardPreview id={id} values={form.getValues()} />
                </span>
            </div>
        </main>
    );
}
