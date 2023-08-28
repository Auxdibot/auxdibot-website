"use client";

import { BsCheckLg, BsMicMute } from "react-icons/bs";
import { useContext, useState } from 'react'; 
import { useQuery, useQueryClient } from "react-query";
import DashboardActionContext from "@/context/DashboardActionContext";
export default function MuteRole({ server }: { server: { id: string}}) {
    let { data: roles } = useQuery(["data_roles", server.id], async () => await fetch(`/api/v1/servers/${server.id}/roles`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined))
    const [role, setRole] = useState("");
    const actionContext = useContext(DashboardActionContext);
    const [success, setSuccess] = useState(false);
    function onMuteRoleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        if (success) setSuccess(false);
        if (e.currentTarget.value == "null") return;

        setRole(e.currentTarget.value);
    }
    function setLogChannel() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append("new_mute_role", role);
        fetch(`/api/v1/servers/${server.id}/mute_role`, { method: "POST", body }).then(() => {
            setSuccess(true)
            if (actionContext)
                actionContext.setAction({ status: `Successfully updated mute role to:  ${roles.find((r: { id: string }) => role == r.id)?.name || "None. Muting will now timeout a user on Discord."}`, success: true });
            setRole("");
        }).catch(() => {});
    }
    if (!roles) return <></>;

    return <div className={"flex flex-col gap-3 w-fit mx-auto border-b p-4 border-gray-700"}>
    <span className={"secondary text-xl text-center flex flex-col"}>Set Mute Role</span>
    
    <span className={"flex flex-row max-md:flex-col gap-2"}>
        <select onChange={(e) => onMuteRoleChange(e)} value={role} className={"font-roboto w-fit mx-auto rounded-md p-1 text-md"}>
            <option value={"null"}>Timeout (No role)</option>
            {roles.map((i: any) => i.name != "@everyone" ? <option key={i.id} value={i.id}>{i.name}</option> : <></>)}
        </select> 
        <button onClick={() => setLogChannel()} className={`secondary text-md max-md:mx-auto ${success ? "bg-gradient-to-l from-green-400 to-green-600 text-black border-black" : "hover-gradient border-white"} hover:text-black hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsMicMute/> Change Mute Role</>) }
        </button></span>
    </div>
}