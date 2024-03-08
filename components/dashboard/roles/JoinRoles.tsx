"use client";

import { Controller, useForm } from "react-hook-form";
import { BsDoorOpen } from "react-icons/bs";
import { useQueryClient } from "react-query";
import Roles from "@/components/ui/select/roles";
import JoinRole from "./JoinRole";
import { useToast } from "@/components/ui/use-toast";

type JoinRolesBody = { role: string };

export default function JoinRoles({ server }: { server: { readonly serverID: string, readonly join_roles: string[] }}) {
    
    
    const { control, reset, handleSubmit } = useForm<JoinRolesBody>();
    
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function onSubmit(data: JoinRolesBody) {
        let body = new URLSearchParams();
        body.append('roleID', data.role ?? '');

        fetch(`/api/v1/servers/${server.serverID}/join_roles`, { method: 'POST', body }).then(async (data) => {
            const json = await data.json().catch(() => undefined);
           if (!json || json['error']) {
               toast({ title: `Failed to add join role`, description: json['error'] ? json['error'] : `An error occurred while adding the join role.`, status: 'error' })
               return;
           }
            toast({ title: `Join Role Added`, description: `The join role has been added successfully.`, status: 'success' })
            reset({ role: undefined });
            queryClient.invalidateQueries(["data_join_roles", server.serverID]);
        }).catch(() => {})
    }
    return <>
    <div className={"bg-gray-800 self-stretch shadow-2xl border-2 border-gray-800 rounded-2xl w-full flex flex-col max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Join Roles</h2>
    <div className={"flex flex-col h-full justify-between"}>
    <ul className={"flex flex-col justify-center items-center my-4 gap-1"}>
        {server.join_roles && server.join_roles.map((i, index) => <JoinRole roleID={i} serverID={server.serverID} key={i} index={index}/>)}
    </ul>
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col items-center justify-center gap-3 py-2"}>
    <span className={"italic text-gray-500 w-fit mx-auto text-center font-open-sans"}>Join roles added to your server will be given to any member that joins your server.</span>
        <div className={"flex max-md:flex-col gap-2 justify-center flex-1 w-full md:px-20"}>
        <section className={"flex flex-col items-center justify-between flex-1"}>
            <Controller control={control} name={'role'} rules={{ required: true }} render={({ field }) => {
            return <Roles serverID={server.serverID} onChange={({ role }) => field.onChange(role)} required value={field.value} />
            } }/>
        </section>
        </div>

        <button type='submit' className={`secondary text-md max-md:mx-auto hover-gradient border-white hover:text-black hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`}>
        <BsDoorOpen/> Add Join Role
        </button>
    </form>
    </div>
    
    </div>
    </>;
}