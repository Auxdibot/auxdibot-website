"use client";

import { BsCheckLg, BsMegaphone } from "react-icons/bs";
import { useContext, useState } from 'react'; 
import { useQuery } from "react-query";
import DashboardActionContext from "@/context/DashboardActionContext";
import Roles from "@/components/input/Roles";
export default function ReportsRole({ server }: { server: { readonly serverID: string, readonly report_role: string }}) {
    let { data: roles } = useQuery(["data_roles", server.serverID], async () => await fetch(`/api/v1/servers/${server.serverID}/roles`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined))
    const [role, setRole] = useState<string | null>(server.report_role);
    const actionContext = useContext(DashboardActionContext);
    const [success, setSuccess] = useState(false);
    function onReportsRoleChange(e: { role: string | null }) {
        if (success) setSuccess(false);

        setRole(e.role || null);
    }
    function setReportsRole() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append("new_reports_role", role || '');
        fetch(`/api/v1/servers/${server.serverID}/moderation/reports/role`, { method: "POST", body }).then(async (data) => {
            
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            if (json && !json['error']) {
                setSuccess(true)
                if (actionContext)
                    actionContext.setAction({ status: `Successfully updated reports role to: ${roles.find((r: { id: string }) => role == r.id)?.name || "None. No role will be pinged when a report is created."}`, success: true });
            } else {
                setRole('');
                if (actionContext)
                    actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false });
            }
    
        }).catch(() => {});
    }
    if (!roles) return <></>;

    return <div className={"flex flex-col gap-3 w-fit mx-auto p-4"}>
    <h3 className={"text-2xl font-open-sans text-gray-300 text-center flex flex-col"}>Set Reports Role</h3>
    
    <span className={"flex flex-row max-md:flex-col gap-2"}>
        <span className={"mx-auto"}><Roles serverID={server.serverID} onChange={(e) => onReportsRoleChange(e)} value={role}/></span>
        <button onClick={() => setReportsRole()} className={`secondary text-md max-md:mx-auto ${success ? "bg-gradient-to-l from-green-400 to-green-600 text-black border-black" : "hover-gradient border-white"} hover:text-black hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsMegaphone/> Change Reports Role</>) }
        </button>
        </span>
    </div>
}