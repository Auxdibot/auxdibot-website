"use client";
import { useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from 'react-query';
import { useContext } from 'react';
import { BsDiscord, BsPeople, BsPerson, BsShield, BsShieldCheck } from 'react-icons/bs';
import DashboardActionContext from '@/context/DashboardActionContext';
type PermissionBody = { allowed: boolean, permission: string, user?: string, role?: string };
export default function CreatePermission({ serverID }: { serverID: string }) {
    let { data: roles } = useQuery(["data_roles", serverID], async () => await fetch(`/api/v1/servers/${serverID}/roles`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    const { register, handleSubmit, reset } = useForm<PermissionBody>();

    const queryClient = useQueryClient();
    const actionContext = useContext(DashboardActionContext);
    function onSubmit(data: PermissionBody) {
        let body = new URLSearchParams();
        console.log(String(data.allowed));
        body.append('allowed', String(data.allowed));
        body.append('permission', data.permission);
        body.append('user', data.user || "");
        body.append('role', data.role || "")
        fetch(`/api/v1/servers/${serverID}/permissions`, { method: 'POST', body }).then(async (data) => {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            if (json && !json['error']) {
                queryClient.invalidateQueries(['data_permissions', serverID]);
                if (actionContext)
                    actionContext.setAction({ status: `Successfully created a new permission override.`, success: true })
                reset();
            } else {
                if (actionContext)
                    actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false });
            }
        }).catch(() => {})
    }
    return <>
    <div className={"bg-gray-800 flex-1 flex-grow shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Create Permission Override</h2>
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-2 md:m-5 my-5"}>
        <section className={"my-4 w-full flex flex-col max-md:justify-center max-md:items-center"}>
        <label className={"flex flex-row max-md:flex-col gap-2 items-center font-lato text-xl"}>
            <span className={"flex flex-row gap-2 items-center"}><BsPeople/> Role:</span> 
            <select className={"rounded-md font-roboto w-fit text-lg"} {...register("role")}>
            <option value={"null"}>Select a role...</option>
            {roles?.filter((i: { permissions: number }) => !(i.permissions&0x8))?.map((i: { id: string, name: string }) => <option key={i.id} value={i.id}>{i.name}</option>)}
        </select></label>
        <span className={"font-lato font-bold text-2xl italic"}>OR</span>
        <label className={"flex flex-row max-md:flex-col gap-2 items-center font-lato text-xl"}>
            <span className={"flex flex-row gap-2 items-center"}><BsDiscord/> Discord User ID:</span>  
            <input className={"rounded-md font-roboto w-fit text-lg"} type="text" {...register("user")}/>
        </label>
        </section>
        
        <label className={"flex flex-row max-md:flex-col gap-2 items-center font-lato text-xl"}>
            <span className={"flex flex-row gap-2 items-center"}><BsShield/> Permission:</span>  
            <input className={"rounded-md font-roboto w-fit text-lg"} type="text" required {...register("permission", { required: true })}/>
            <label>Allowed? <input className={"rounded-md font-roboto w-fit text-lg"} type="checkbox" defaultChecked {...register("allowed")}/></label>
        </label>
        
        <button className={`secondary text-xl mx-auto hover-gradient border-white hover:text-black hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`} type="submit">
            <BsShieldCheck/> Submit Permission Override
        </button>
    </form>
    
    </div>
    </>;
}