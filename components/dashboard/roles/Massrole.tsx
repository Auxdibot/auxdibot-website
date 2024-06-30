"use client";

import { BsCheckLg, BsPersonAdd, BsPersonDown, BsTag, BsX } from "react-icons/bs";
import { useState } from 'react'; 
import { useQuery } from "react-query";
import { Controller, useForm } from "react-hook-form";
import Roles from "@/components/ui/select/roles";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button/button";

type MassroleBody = { roleID: string, give: boolean }
export default function Massrole({ serverID }: { serverID: string }) {
    let { data: roles } = useQuery(["data_roles", serverID], async () => await fetch(`/bot/v1/servers/${serverID}/roles`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined))
    const { control, handleSubmit, reset, watch } = useForm<MassroleBody>();
    const { toast } = useToast();
    const [success, setSuccess] = useState(false);

    const give = watch("give");
    function setMassrole(data: MassroleBody) {
        if (!serverID) return;
        const body = new URLSearchParams();
        body.append("roleID", data.roleID);
        body.append("give", data.give + "");
        fetch(`/bot/v1/servers/${serverID}/massrole`, { method: "POST", body }).then(async (res) => {
            const json = await res.json().catch(() => undefined);
            if (!json || json['error']) {
                toast({ title: `Failed to finish massrole`, description: json['error'] ? json['error'] : `An error occurred while finishing the massrole process.`, status: 'error' })
                return;
            }
            toast({ title: `Massrole ${data.give ? 'Gave' : 'Took'}`, description: `Successfully ${data.give ? 'gave' : 'took'} the role @${roles?.find((i: any) => i.id == data.roleID)?.name ?? 'Unknown'} ${data.give ? 'to' : 'from'} every user in the server.`, status: 'success' })
            reset({ give: true, roleID: '' });
            setSuccess(true);
        }).catch(() => {});
    }
    if (!roles) return <></>;

    return <div className={"shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Massrole</h2>
    <div className={"flex flex-col gap-3 py-2 w-fit mx-auto "}>
    
    <span className={"flex gap-2 items-center"}>
    <Controller control={control} name={"roleID"} render={({ field }) => {
                return <Roles serverID={serverID} onChange={(e) => {
                    setSuccess(false)
                    field.onChange(e.role)
                }} value={field.value}/>;
                }}/>
        <label className={"secondary text-xl flex flex-row gap-2 items-center mx-auto"}><Controller control={control} name={'give'} render={({ field }) => {
                return  <span onClick={() => field.onChange(!field.value)} className={"cursor-pointer flex gap-4 items-center flex-row justify-center font-open-sans text-lg"}>
                <span className={`text-2xl border rounded-xl p-1 bg-gradient-to-l ${field.value ? "from-green-400 to-green-700" : "from-red-400 to-red-700"} border-black select-none text-black transition-all`}>{field.value ? <BsTag /> : <BsX/>}</span>
                    {field.value ? 'Give' : 'Take'}
                </span>;
            }}/></label>
        </span>
        <Button onClick={handleSubmit(setMassrole)}  className={`flex flex-row gap-2 items-center mx-auto w-fit`} variant={'outline'} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<>{give ? <BsPersonAdd/> : <BsPersonDown/> } Massrole {give ? "Give" : "Take"}</>) }
        </Button>
    </div>
    </div>
}