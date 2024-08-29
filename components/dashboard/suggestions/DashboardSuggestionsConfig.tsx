'use client';

import { useQuery } from 'react-query';
import SuggestionsSettings from './SuggestionsSettings';
import { Suspense } from 'react';
import SuggestionsReactions from './SuggestionsReactions';
import Suggestions from './Suggestions';
import { MessageCircleQuestionIcon } from 'lucide-react';
import { Button } from '@/components/ui/button/button';
import Link from 'next/link';
import { ModuleDisableOverlay } from '../ModuleDisableOverlay';

export default function DashboardSuggestionsConfig({ id }: { id: string }) {
    let { data: suggestions } = useQuery(
        ['data_suggestions', id],
        async () =>
            await fetch(`/bot/v1/servers/${id}/suggestions`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined)
    );
    return (
        <>
            <ModuleDisableOverlay id={id} module={'Suggestions'} />
            <main className={'flex-grow bg-gray-950'}>
                <div
                    className={
                        'flex animate-fadeIn flex-col gap-5 py-5 max-md:items-center md:px-5'
                    }
                >
                    <span className='mb-5 mt-2 flex items-center gap-5 max-md:flex-col'>
                        <div className='flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-800 bg-gradient-to-bl from-gray-500/40 to-gray-900/40 shadow transition-colors hover:bg-gray-500/40'>
                            <MessageCircleQuestionIcon size={'48'} />
                        </div>
                        <div className='flex flex-col max-md:items-center max-md:text-center'>
                            <h1
                                className={
                                    'header flex items-center font-raleway text-4xl font-bold'
                                }
                            >
                                Suggestions
                                <Link
                                    href={
                                        process.env
                                            .NEXT_PUBLIC_DOCUMENTATION_LINK +
                                        '/modules/suggestions'
                                    }
                                >
                                    <Button className='text-sm' variant='link'>
                                        [docs]
                                    </Button>
                                </Link>
                            </h1>
                            <p className='max-w-4xl font-inter text-lg'>
                                Allows users to setup and configure a
                                suggestions system that can be utilized on their
                                server.
                            </p>
                        </div>
                    </span>
                    <span
                        className={'grid grid-cols-2 gap-10 max-lg:grid-cols-1'}
                    >
                        <Suspense fallback={null}>
                            <SuggestionsSettings server={suggestions} />
                            <SuggestionsReactions server={suggestions} />
                            <Suggestions server={suggestions} />
                        </Suspense>
                    </span>
                </div>
            </main>
        </>
    );
}
