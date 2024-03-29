"use client";
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useState } from 'react';
import { BsCheck, BsDiscord, BsPeople, BsShield, BsShieldCheck, BsX } from 'react-icons/bs';
import { useToast } from '@/components/ui/use-toast';
import Roles from '@/components/ui/select/roles';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button/button';

type PermissionBody = { allowed: boolean, permission: string, user?: string, role?: string };
export default function CreatePermission({ serverID }: { serverID: string }) {
    const { handleSubmit, reset, control, setValue } = useForm<PermissionBody>();

    const queryClient = useQueryClient();
    const [usingRole, setUsingRole] = useState(true);
    const { toast } = useToast();
    function switchUsingRole() {
        setValue(usingRole ? 'role' : 'user', '');
        setUsingRole(!usingRole);
    }
    function onSubmit(data: PermissionBody) {
        let body = new URLSearchParams();
        body.append('allowed', String(data.allowed));
        body.append('permission', data.permission);
        body.append('user', data.user || "");
        body.append('role', data.role || "")
        fetch(`/api/v1/servers/${serverID}/permissions`, { method: 'POST', body }).then(async (data) => {
            const json = await data.json().catch(() => undefined);
            if (!json || json['error']) {
                toast({ title: `Failed to create permission override`, description: json['error'] ? json['error'] : `An error occurred while creating the permission override.`, status: 'error' })
                return;
            }
            toast({ title: `Permission Override Created`, description: `The permission override has been created successfully.`, status: 'success' })
            reset({ allowed: false, permission: "", user: "" });
            queryClient.invalidateQueries(["data_permissions", serverID]);
        }).catch(() => {})
    }
    return <>
    <div className={"flex-1 flex-grow shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Create Permission Override</h2>
    <p className={"text-gray-400 font-open-sans md:ml-4 max-md:w-full max-md:text-center text-base italic"}><span className={"text-red-500"}>*</span> = required field</p>
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-2 md:m-5 my-5"}>
        <section className={"my-4 w-full flex flex-col max-lg:justify-center max-lg:items-center"}>
        <span className={"flex flex-row max-md:flex-col gap-4"}>
        <label className={`flex flex-row max-lg:flex-col gap-2 items-center font-lato ${usingRole ? "" : "hidden"}`}>
            <span className={"flex flex-row gap-2 items-center  text-xl"}><span className={"text-red-500"}>*</span> <BsPeople/> Role:</span> 
            <Controller name="role" control={control} render={({ field }) => {
                return <Roles serverID={serverID} value={field.value} onChange={(e) => field.onChange(e.role)} />
            } }/>
        </label> 
        <label className={`flex flex-row max-lg:flex-col gap-2 items-center font-lato ${!usingRole ? "" : "hidden"}`}>
            <span className={"flex flex-row gap-2 items-center text-xl"}><span className={"text-red-500"}>*</span> <BsDiscord/> Discord User ID:</span>  
            <Controller name="user" control={control} render={({ field }) => {
                return <Input className={'max-w-[150px]'} value={field.value} onChange={field.onChange} />
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
                return <Input className={'max-w-[200px]'} value={field.value} onChange={field.onChange} />
            } }/>
            <Controller control={control} name={'allowed'} render={({ field }) => {
                return  <span onClick={() => field.onChange(!field.value)} className={"cursor-pointer flex gap-4 items-center flex-row justify-center font-open-sans text-lg"}>
                <span className={`text-2xl border rounded-xl p-1 bg-gradient-to-l ${field.value ? "from-green-400 to-green-700" : "from-red-400 to-red-700"} border-black select-none text-black transition-all`}>{field.value ? <BsCheck /> : <BsX/>}</span>
                    {field.value ? 'Allowed' : 'Denied'}
                </span>;
            }}/>
        </label>
        
        <Button className={`flex flex-row gap-2 items-center mx-auto w-fit`} variant={'outline'}  type="submit">
            <BsShieldCheck/> Create
        </Button>
    </form>
    
    </div>
    </>;
}