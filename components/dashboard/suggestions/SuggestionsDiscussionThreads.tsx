'use client';
import { useToast } from '@/components/ui/use-toast';

import { BsChatDots } from 'react-icons/bs';
import { useQueryClient } from 'react-query';

export default function SuggestionsDiscussionThreads({
    server,
}: {
    server: { serverID: string; suggestions_discussion_threads: boolean };
}) {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    function handleClick() {
        fetch(
            `/bot/v1/servers/${server.serverID}/suggestions/discussion_threads`,
            { method: 'POST' }
        )
            .then(async (data) => {
                const json = await data
                    .json()
                    .then((data) => data?.data)
                    .catch(() => undefined);
                toast({
                    title: 'Discussion Threads Updated',
                    description: json
                        ? json['suggestions_discussion_threads']
                            ? 'Suggestions will now automatically be created with a discussion thread for users to discuss the suggestion in.'
                            : 'Suggestions will no longer be created with a discussion thread.'
                        : 'An error occurred. Please try again.',
                    status: !json || json['error'] ? 'error' : 'success',
                });
                queryClient.invalidateQueries([
                    'data_suggestions',
                    server.serverID,
                ]);
            })
            .catch(() => undefined);
    }
    return (
        <div
            className={
                'relative h-8 w-16 rounded-full border border-gray-700 px-1'
            }
        >
            <div
                onClick={() => handleClick()}
                className={`absolute bottom-1/2 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-gradient-to-l transition-all ${!server.suggestions_discussion_threads ? '-translate-x-0.5 from-red-500 to-red-700' : 'translate-x-full from-green-500 to-green-700'}`}
            >
                <span className={'text-md text-white opacity-60'}>
                    <BsChatDots />
                </span>
            </div>
        </div>
    );
}
