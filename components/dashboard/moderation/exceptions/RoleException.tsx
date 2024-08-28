import { useToast } from '@/components/ui/use-toast';
import { APIRole } from 'discord-api-types/v10';
import { BsAt, BsTrash } from 'react-icons/bs';
import { useQuery, useQueryClient } from 'react-query';

export default function RoleException({
    roleID,
    serverID,
    index,
}: {
    readonly roleID: string;
    readonly serverID: string;
    readonly index: number;
}) {
    const { data: roles } = useQuery(
        ['data_roles', serverID],
        async () =>
            await fetch(`/bot/v1/servers/${serverID}/roles`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined)
    );
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const role: APIRole | undefined = roles?.find(
        (i: APIRole) => i.id == roleID
    );

    function deleteException() {
        const body = new URLSearchParams();
        body.append('index', index.toString());

        fetch(`/bot/v1/servers/${serverID}/moderation/exceptions/`, {
            method: 'DELETE',
            body,
        }).then(async (data) => {
            const json = await data.json().catch(() => undefined);
            if (!json || json['error']) {
                toast({
                    title: 'Failed to delete role exception',
                    description: json['error'] || 'An error occurred.',
                    status: 'error',
                });
                return;
            }
            toast({
                title: 'Role Exception Deleted',
                description: `The role exception has been deleted.`,
                status: 'success',
            });
            queryClient.invalidateQueries(['data_moderation', serverID]);
        });
    }
    return (
        <li
            className={
                'flex flex-row items-center gap-2 font-open-sans text-lg'
            }
        >
            <span
                className={
                    'flex flex-row items-center gap-1 rounded-2xl border-gray-800/50 bg-gray-900/70 p-0.5 px-1 font-open-sans text-lg'
                }
            >
                <BsAt
                    className={'text-xl'}
                    style={{
                        fill: role?.color ? '#' + role.color.toString(16) : '',
                    }}
                />{' '}
                {role?.name ?? roleID}
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
        </li>
    );
}
