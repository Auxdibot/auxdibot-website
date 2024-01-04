"use client";
import { Controller, useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from 'react-query';
import { useContext, useState } from 'react';
import { BsCheck, BsDiscord, BsPeople, BsPerson, BsShield, BsShieldCheck, BsX } from 'react-icons/bs';
import DashboardActionContext from '@/context/DashboardActionContext';
import Roles from '@/components/input/Roles';
import TextBox from '@/components/input/TextBox';
type PermissionBody = { allowed: boolean, permission: string, user?: string, role?: string };
export default function CreatePermission({ serverID }: { serverID: string }) {
    const { register, handleSubmit, reset, control, setValue } = useForm<PermissionBody>();

    const queryClient = useQueryClient();
    const [usingRole, setUsingRole] = useState(true);
    const actionContext = useContext(DashboardActionContext);
    function switchUsingRole() {
        setValue(usingRole ? 'role' : 'user', '');
        setUsingRole(!usingRole);
    }
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
                reset({ user: '', role: '', allowed: true, permission: ''});
            } else {
                if (actionContext)
                    actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false });
            }
        }).catch(() => {})
    }
    return <>
    <div className={"bg-gray-800 flex-1 flex-grow shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Create Permission Override</h2>
    <span className={"text-lg font-open-sans ml-2"}><span className={"text-red-500"}>*</span> = required field</span>
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-2 md:m-5 my-5"}>
        <section className={"my-4 w-full flex flex-col max-lg:justify-center max-lg:items-center"}>
        <span className={"flex flex-row max-md:flex-col gap-4"}>
        <label className={`flex flex-row max-lg:flex-col gap-2 items-center font-lato ${usingRole ? "" : "hidden"}`}>
            <span className={"flex flex-row gap-2 items-center  text-xl"}><span className={"text-red-500"}>*</span> <BsPeople/> Role:</span> 
            <Controller name="role" control={control} render={({ field }) => {
                return <Roles serverID={serverID} required value={field.value || null} onChange={(e) => field.onChange(e.role)} />
            } }/>
        </label> 
        <label className={`flex flex-row max-lg:flex-col gap-2 items-center font-lato ${!usingRole ? "" : "hidden"}`}>
            <span className={"flex flex-row gap-2 items-center text-xl"}><span className={"text-red-500"}>*</span> <BsDiscord/> Discord User ID:</span>  
            <Controller name="user" control={control} render={({ field }) => {
                return <TextBox Icon={BsDiscord} value={field.value} onChange={field.onChange} />
            } }/>
        </label>
        <span onClick={() => switchUsingRole()} className={"cursor-pointer flex gap-4 items-center flex-row justify-center font-open-sans text-lg"}>
            <span className={"text-xl border rounded-xl p-2 hover:hover-gradient hover:border-black hover:text-black transition-all"}>{!usingRole ? <BsPeople /> : <BsDiscord/>}</span>
            {usingRole ? 'Discord User ID' : 'Role'}</span>
        </span>
        
        </section>
        
        <label className={"flex flex-row max-lg:flex-col gap-2 items-center font-lato text-xl"}>
            <span className={"flex flex-row gap-2 items-center"}><span className={"text-red-500"}>*</span> <BsShield/> Permission:</span>  
            <Controller name="permission" control={control} render={({ field }) => {
                return <TextBox Icon={BsShield} value={field.value} onChange={field.onChange} />
            } }/>
            <Controller control={control} name={'allowed'} render={({ field }) => {
                return  <span onClick={() => field.onChange(!field.value)} className={"cursor-pointer flex gap-4 items-center flex-row justify-center font-open-sans text-lg"}>
                <span className={`text-2xl border rounded-xl p-1 bg-gradient-to-l ${field.value ? "from-green-400 to-green-700" : "from-red-400 to-red-700"} border-black select-none text-black transition-all`}>{field.value ? <BsCheck /> : <BsX/>}</span>
                    {field.value ? 'Allowed' : 'Denied'}
                </span>;
            }}/>
        </label>
        
        <button className={`secondary text-xl mx-auto hover-gradient border-white hover:text-black hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`} type="submit">
            <BsShieldCheck/> Create Permission Override
        </button>
    </form>
    
    </div>
    </>;
}