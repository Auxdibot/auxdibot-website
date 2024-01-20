"use client";

import { Controller, useForm } from "react-hook-form";
import { BsTag } from "react-icons/bs";
import { useContext } from "react";
import DashboardActionContext from "@/context/DashboardActionContext";
import { useQueryClient } from "react-query";
import Roles from "@/components/input/Roles";
import RoleException from "./RoleException";

type RoleExceptionsBody = { role: string };

export default function RoleExceptions({ server }: { server: { readonly serverID: string, readonly automod_role_exceptions: string[] }}) {
    

    const { control, reset, handleSubmit } = useForm<RoleExceptionsBody>();
    
    const actionContext = useContext(DashboardActionContext);
    const queryClient = useQueryClient();
    function onSubmit(data: RoleExceptionsBody) {
        let body = new URLSearchParams();
        body.append('role', data.role ?? '');

        fetch(`/api/v1/servers/${server.serverID}/moderation/exceptions`, { method: 'PATCH', body }).then(async (data) => {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            if (json && !json['error']) {
                queryClient.invalidateQueries(['data_moderation', server.serverID]);
                if (actionContext)
                    actionContext.setAction({ status: `Successfully updated the role exceptions for this server.`, success: true })

            } else {
                reset();
                if (actionContext)
                    actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false });
            }
        }).catch(() => {})
    }
    return <>
    <div className={"bg-gray-800 self-stretch shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Automod Role Exceptions</h2>
    <ul className={"flex flex-col justify-center items-center my-4 gap-1"}>
        {server.automod_role_exceptions && server.automod_role_exceptions.map((i, index) => <RoleException roleID={i} serverID={server.serverID} key={i} index={index}/>)}
    </ul>
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col items-center justify-center gap-3 py-2"}>
    <span className={"italic text-gray-500 w-fit mx-auto text-center font-open-sans"}>Once a role is added as a role exception, every member with this role will not receive automod punishments.</span>
        <div className={"flex max-md:flex-col gap-2 justify-center flex-1 w-full md:px-20"}>
        <section className={"flex flex-col items-center justify-between flex-1"}>
            <Controller control={control} name={'role'} rules={{ required: true }} render={({ field }) => {
            return <Roles serverID={server.serverID} onChange={({ role }) => field.onChange(role)} required value={field.value} />
            } }/>
        </section>
        </div>

        <button type='submit' className={`secondary text-md max-md:mx-auto hover-gradient border-white hover:text-black hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`}>
        <BsTag/> Add Role Exception
        </button>
    </form>
    </div>
    </>;
}