import { BsAt } from 'react-icons/bs';
import { useQuery } from 'react-query';

export function Role({
    roleID,
    serverID,
}: {
    roleID: string;
    serverID: string;
}) {
    const roles = useQuery(
        ['channels', roleID],
        async () =>
            await fetch(`/bot/v1/servers/${serverID}/roles`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined)
    ).data;
    const role =
        roles?.find && roles?.find((role: { id: string }) => role.id == roleID);
    if (!role) return <>Unknown</>;
    return (
        <span className={'flex items-center gap-2'}>
            <BsAt
                className={'text-xl'}
                style={{
                    fill: role?.color ? '#' + role.color.toString(16) : '',
                }}
            />
            {role?.name || 'Unknown'}
        </span>
    );
}
