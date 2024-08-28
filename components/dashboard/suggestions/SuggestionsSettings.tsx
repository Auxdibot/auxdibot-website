'use client';

import SuggestionsChannel from './SuggestionsChannel';
import { Suspense } from 'react';
import SuggestionsUpdateChannel from './SuggestionsUpdateChannel';
import SuggestionsAutoDelete from './SuggestionsAutoDelete';
import SuggestionsDiscussionThreads from './SuggestionsDiscussionThreads';
import { Separator } from '@/components/ui/separator';

export default function SuggestionsSettings({
    server,
}: {
    server: {
        serverID: string;
        suggestions_channel: string;
        suggestions_updates_channel: string;
        suggestions_reactions: string[];
        suggestions_auto_delete: boolean;
        suggestions_discussion_threads: boolean;
    };
}) {
    return (
        <>
            <div
                className={
                    'h-fit w-full rounded-2xl border-2 border-gray-800 shadow-2xl max-md:mx-auto'
                }
            >
                <h2
                    className={
                        'secondary rounded-2xl rounded-b-none p-4 text-center text-2xl'
                    }
                >
                    Suggestions Settings
                </h2>
                <div className={'flex flex-col gap-4'}>
                    <Suspense fallback={null}>
                        {server ? (
                            <>
                                <SuggestionsChannel server={server} />
                                <Separator
                                    className={'mx-auto my-4 max-w-xs'}
                                />
                                <SuggestionsUpdateChannel server={server} />
                                <div
                                    className={
                                        'text mx-auto flex w-fit flex-row gap-10 p-4 max-xl:flex-col xl:justify-between'
                                    }
                                >
                                    <span
                                        className={
                                            'flex flex-row items-center gap-2 text-xl'
                                        }
                                    >
                                        <SuggestionsAutoDelete
                                            server={server}
                                        />{' '}
                                        Auto Delete
                                    </span>
                                    <span
                                        className={
                                            'flex flex-row items-center gap-2 text-xl'
                                        }
                                    >
                                        <SuggestionsDiscussionThreads
                                            server={server}
                                        />{' '}
                                        Discussion Threads
                                    </span>
                                </div>
                            </>
                        ) : (
                            ''
                        )}
                    </Suspense>
                </div>
            </div>
        </>
    );
}
