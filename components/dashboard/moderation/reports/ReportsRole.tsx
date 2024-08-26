'use client';

import { BsAt, BsCheckLg } from 'react-icons/bs';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Roles from '@/components/ui/select/roles';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button/button';
export default function ReportsRole({
    server,
}: {
    server: { readonly serverID: string; readonly report_role: string };
}) {
    let { data: roles } = useQuery(
        ['data_roles', server.serverID],
        async () =>
            await fetch(`/bot/v1/servers/${server.serverID}/roles`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined)
    );
    const [role, setRole] = useState<string | undefined>(
        server.report_role ?? undefined
    );
    const { toast } = useToast();
    const [success, setSuccess] = useState(false);
    function onReportsRoleChange(e: { role?: string }) {
        if (success) setSuccess(false);
        if (e.role == 'null') return setRole(undefined);

        setRole(e.role ?? undefined);
    }
    function setReportsRole() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append('new_reports_role', role || '');
        fetch(`/bot/v1/servers/${server.serverID}/moderation/reports/role`, {
            method: 'POST',
            body,
        })
            .then(async (data) => {
                const json = await data.json().catch(() => undefined);
                if (!json || json['error']) {
                    toast({
                        title: 'Failed to set reports role',
                        description: json['error'] || "Couldn't find error.",
                        status: 'error',
                    });
                    return;
                }
                setSuccess(true);
                toast({
                    title: 'Reports Role Updated',
                    description: role
                        ? `The reports role has been updated to @${roles?.find((i: { id: string }) => i.id === role)?.name ?? 'Unknown'}.`
                        : 'Reports role is now disabled for this server.',
                    status: 'success',
                });
            })
            .catch(() => {});
    }
    if (!roles) return <></>;

    return (
        <div
            className={
                'flex flex-1 flex-shrink-0 flex-col gap-3 p-4 md:w-fit md:items-start'
            }
        >
            <h3
                className={
                    'mx-auto flex flex-col text-center font-open-sans text-xl text-gray-300'
                }
            >
                Reports Role
            </h3>

            <span
                className={
                    'mx-auto flex flex-col items-center justify-center gap-2 max-md:flex-col'
                }
            >
                <span className={'mx-auto'}>
                    <Roles
                        serverID={server.serverID}
                        onChange={onReportsRoleChange}
                        value={role}
                    />
                </span>
                <Button
                    onClick={setReportsRole}
                    className={`mx-auto flex w-fit items-center gap-2`}
                    variant={'outline'}
                    type='submit'
                >
                    {success ? (
                        <>
                            <BsCheckLg /> Updated!
                        </>
                    ) : (
                        <>
                            <BsAt /> Update
                        </>
                    )}
                </Button>
            </span>
        </div>
    );
}
