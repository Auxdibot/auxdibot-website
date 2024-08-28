import { useToast } from '@/components/ui/use-toast';
import { BsTrash } from 'react-icons/bs';
import { useQueryClient } from 'react-query';

export default function BlacklistedPhrase({
    phrase,
    serverID,
    index,
}: {
    readonly phrase: string;
    readonly serverID: string;
    readonly index: number;
}) {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    function deleteException() {
        const body = new URLSearchParams();
        body.append('index', index.toString());

        fetch(`/bot/v1/servers/${serverID}/moderation/blacklist/`, {
            method: 'DELETE',
            body,
        }).then(async (data) => {
            const json = await data.json().catch(() => undefined);
            if (!json || json['error']) {
                toast({
                    title: 'Failed to delete phrase',
                    description: json['error'] || 'An error occurred.',
                    status: 'error',
                });
                return;
            }
            toast({
                title: 'Phrase Deleted',
                description: `The phrase "${phrase}" has been deleted from the blacklist.`,
                status: 'success',
            });
            queryClient.invalidateQueries(['data_moderation', serverID]);
        });
    }
    return (
        <li className={'py-2'}>
            <div
                className={
                    'flex flex-row items-center gap-2 font-open-sans text-lg'
                }
            >
                <span
                    className={
                        'w-32 gap-1 overflow-hidden text-ellipsis whitespace-nowrap rounded-2xl border border-gray-800/50 bg-gray-900/70 p-0.5 px-1 text-center font-open-sans text-base hover:w-full hover:min-w-[128px] hover:max-w-[250px]'
                    }
                >
                    {phrase}
                </span>
                <span
                    className={
                        'secondary flex flex-row items-center gap-2 text-xl text-gray-300'
                    }
                >
                    <button
                        className={
                            'hover-gradient w-fit rounded-2xl border border-gray-700 p-1 text-xl text-gray-600 transition-all hover:border-black hover:text-black'
                        }
                        onClick={() => deleteException()}
                    >
                        <BsTrash />
                    </button>
                </span>
            </div>
        </li>
    );
}
