"use client";

import { BsCheckLg, BsPersonAdd, BsPersonDown } from "react-icons/bs";
import { useContext, useState } from 'react'; 
import { useQuery } from "react-query";
import DashboardActionContext from "@/context/DashboardActionContext";
import { useForm } from "react-hook-form";

type MassroleBody = { roleID: string, give: boolean }
export default function Massrole({ serverID }: { serverID: string }) {
    let { data: roles } = useQuery(["data_roles", serverID], async () => await fetch(`/api/v1/servers/${serverID}/roles`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined))
    const { register, handleSubmit, reset, watch } = useForm<MassroleBody>();
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
            reset();
        }).catch(() => {});
    }
    if (!roles) return <></>;

    return <div className={"bg-gray-800 shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Massrole</h2>
    <div className={"flex flex-col gap-3 w-fit mx-auto border-b p-4 border-gray-700"}>
    
    <span className={"flex flex-col gap-2"}>
        <select {...register("roleID", { required: true })} required className={"font-roboto w-fit mx-auto rounded-md p-1 text-md"}>
            <option value={"null"}>Select a role...</option>
            {roles?.map((i: any) => i.name != "@everyone" ? <option key={i.id} value={i.id}>{i.name}</option> : <></>)}
        </select> 
        <label className={"secondary text-xl flex flex-row gap-2 items-center mx-auto"}><input className={"placeholder:text-gray-500 px-1 rounded-md font-roboto text-md"} defaultChecked type="checkbox" {...register("give")}/> Give Role?</label>
        <button onClick={handleSubmit(setMassrole)}  className={`secondary text-md mx-auto ${success ? "bg-gradient-to-l from-green-400 to-green-600 text-black border-black" : "hover-gradient border-white"} hover:text-black hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<>{give ? <BsPersonAdd/> : <BsPersonDown/> } Massrole {give ? "Give" : "Take"}</>) }
        </button></span>
    </div>
    </div>
}