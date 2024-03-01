"use client";

import { BsCheckLg, BsPersonAdd, BsPersonDown, BsTag, BsX } from "react-icons/bs";
import { useContext, useState } from 'react'; 
import { useQuery } from "react-query";
import DashboardActionContext from "@/context/DashboardActionContext";
import { Controller, useForm } from "react-hook-form";
import Roles from "@/components/ui/roles";

type MassroleBody = { roleID: string, give: boolean }
export default function Massrole({ serverID }: { serverID: string }) {
    let { data: roles } = useQuery(["data_roles", serverID], async () => await fetch(`/api/v1/servers/${serverID}/roles`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined))
    const { control, handleSubmit, reset, watch } = useForm<MassroleBody>();
    const actionContext = useContext(DashboardActionContext);
    const [success, setSuccess] = useState(false);

    const give = watch("give");
    function setMassrole(data: MassroleBody) {
        if (!serverID) return;
        const body = new URLSearchParams();
        body.append("roleID", data.roleID);
        body.append("give", data.give + "");
        fetch(`/api/v1/servers/${serverID}/massrole`, { method: "POST", body }).then(() => {
            setSuccess(true)
            if (actionContext)
                actionContext.setAction({ status: `Successfully massrole ${data.give ? "gave" : "took"} ${roles.find((r: { id: string }) => data.roleID == r.id)?.name || ""}.`, success: true });
            reset({ roleID: '', give: true });
        }).catch(() => {});
    }
    if (!roles) return <></>;

    return <div className={"bg-gray-800 shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Massrole</h2>
    <div className={"flex flex-col gap-3 w-fit mx-auto border-b p-4 border-gray-700"}>
    
    <span className={"flex flex-col gap-2 items-center"}>
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
        <button onClick={handleSubmit(setMassrole)}  className={`secondary text-md mx-auto ${success ? "bg-gradient-to-l from-green-400 to-green-600 text-black border-black" : "hover-gradient border-white"} hover:text-black hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<>{give ? <BsPersonAdd/> : <BsPersonDown/> } Massrole {give ? "Give" : "Take"}</>) }
        </button></span>
    </div>
    </div>
}