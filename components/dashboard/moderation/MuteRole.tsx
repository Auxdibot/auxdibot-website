"use client";

import { BsCheckLg, BsMicMute } from "react-icons/bs";
import { useContext, useState } from 'react'; 
import { useQuery, useQueryClient } from "react-query";
import DashboardActionContext from "@/context/DashboardActionContext";
import Roles from "@/components/input/Roles";
export default function MuteRole({ server }: { server: { serverID: string}}) {
    let { data: roles } = useQuery(["data_roles", server.serverID], async () => await fetch(`/api/v1/servers/${server.serverID}/roles`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined))
    const [role, setRole] = useState<string | null>("");
    const actionContext = useContext(DashboardActionContext);
    const [success, setSuccess] = useState(false);
    function onMuteRoleChange(e: { role: string | null }) {
        if (success) setSuccess(false);

        setRole(e.role || null);
    }
    function setMuteRole() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append("new_mute_role", role || '');
        fetch(`/api/v1/servers/${server.serverID}/mute_role`, { method: "POST", body }).then(async (data) => {
            
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            if (json && !json['error']) {
                setSuccess(true)
                if (actionContext)
                    actionContext.setAction({ status: `Successfully updated mute role to:  ${roles.find((r: { id: string }) => role == r.id)?.name || "None. Muting will now timeout a user on Discord."}`, success: true });
            } else {
                if (actionContext)
                    actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false });
            }
            
            setRole("");
        }).catch(() => {});
    }
    if (!roles) return <></>;

    return <div className={"flex flex-col gap-3 w-fit mx-auto border-b p-4 border-gray-700"}>
    <span className={"secondary text-xl text-center flex flex-col"}>Set Mute Role</span>
    
    <span className={"flex flex-row max-md:flex-col gap-2"}>
        <span className={"mx-auto"}><Roles serverID={server.serverID} onChange={(e) => onMuteRoleChange(e)} value={role}/></span>
        <button onClick={() => setMuteRole()} className={`secondary text-md max-md:mx-auto ${success ? "bg-gradient-to-l from-green-400 to-green-600 text-black border-black" : "hover-gradient border-white"} hover:text-black hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsMicMute/> Change Mute Role</>) }
        </button></span>
    </div>
}