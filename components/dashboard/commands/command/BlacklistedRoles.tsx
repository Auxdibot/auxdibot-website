"use client";

import { useQuery, useQueryClient } from "react-query";
import { useToast } from "@/components/ui/use-toast";
import { BsTrash } from "react-icons/bs";
import { Role } from "@/components/ui/role";
import Roles from "@/components/ui/select/roles";

export default function BlacklistedRoles({ id, command, subcommand, blacklisted }: { readonly id: string, readonly command: string, readonly subcommand?: string[], readonly blacklisted: string[] }) {
    const { data: roles } = useQuery(["data_roles", id], async () => {
        const res = await fetch(`/api/v1/servers/${id}/roles`);
        return await res.json();
    });

    const { toast } = useToast();
    const queryClient = useQueryClient();
    function submit(role: string) {
        let body = new URLSearchParams();

        body.append('command', command + (subcommand ? " " + subcommand.join(" ") : ""));
        body.append('role', role ?? '');

        fetch(`/api/v1/servers/${id}/commands/blacklist_roles`, { method: 'PATCH', body }).then(async (res) => {
            const json = await res.json().catch(() => undefined);
            queryClient.invalidateQueries(["data_command_permissions", id])
            if (!json || json['error']) {
                toast({ title: 'Failed to add blacklisted role', description: json?.error ?? 'An error occurred while adding a blacklisted role.', status: 'error' })
                return;
            }
            toast({ title: 'Added Blacklisted Role', description: `The command "/${command + " " + subcommand?.join(' ')}" can no longer by users with the role @${roles?.find((i: { id: string, name: string }) => i.id == role)?.name ?? 'Unknown'}.`, status: 'success' })

        }).catch(() => {})
    }
    function deleteRole(role: string) {
        let body = new URLSearchParams();

        body.append('command', command + (subcommand ? " " + subcommand.join(" ") : ""));
        body.append('role', role ?? '');

        fetch(`/api/v1/servers/${id}/commands/blacklist_roles`, { method: 'DELETE', body }).then(async (res) => {
            const json = await res.json().catch(() => undefined);
            queryClient.invalidateQueries(["data_command_permissions", id])
            if (!json || json['error']) {
                toast({ title: 'Failed to remove blacklisted role', description: json?.error ?? 'An error occurred while removing a blacklisted role.', status: 'error' })
                return;
            }
            toast({ title: 'Removed Blacklisted Role', description: `Users with the role @${roles?.find((i: { id: string, name: string }) => i.id == role)?.name ?? 'Unknown'} are no longer blacklisted from using the command "/${command + " " + subcommand?.join(' ')}".`, status: 'success' })

        }).catch(() => {})
    }
    return <>
    <Roles serverID={id} onChange={({ role }) => role && submit(role)} required value={""} />
    {blacklisted && blacklisted.length > 0 ? <ul className={"flex flex-col justify-center items-center my-4 gap-1 border border-gray-800 p-2 w-fit mx-auto rounded-2xl"}>
        {blacklisted.map((i, index) => <span className={"flex gap-2 items-center"} key={index}><Role roleID={i} serverID={id} key={i}/>
        <span className={"secondary text-xl text-gray-300 flex flex-row items-center gap-2"}><button className={"border border-gray-700 text-gray-600 rounded-2xl w-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-xl"} onClick={() => deleteRole(i)}><BsTrash/></button></span></span>)} 
    </ul> : <span className={"text-gray-400 font-open-sans text-center"}>No blacklisted roles found.</span>}
    </>;
}