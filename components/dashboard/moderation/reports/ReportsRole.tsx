"use client";

import { BsAt, BsCheckLg } from "react-icons/bs";
import { useState } from 'react'; 
import { useQuery } from "react-query";
import Roles from "@/components/ui/select/roles";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button/button";
export default function ReportsRole({ server }: { server: { readonly serverID: string, readonly report_role: string }}) {
    let { data: roles } = useQuery(["data_roles", server.serverID], async () => await fetch(`/api/v1/servers/${server.serverID}/roles`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined))
    const [role, setRole] = useState<string | undefined>(server.report_role ?? undefined);
    const { toast } = useToast();
    const [success, setSuccess] = useState(false);
    function onReportsRoleChange(e: { role?: string }) {
        if (success) setSuccess(false);
        if (e.role == 'null') return setRole(undefined);
        
        setRole(e.role ?? undefined);
    }
    function setReportsRole() {
        if (!server) return;
        const body = new URLSearchParams();
        body.append("new_reports_role", role || '');
        fetch(`/api/v1/servers/${server.serverID}/moderation/reports/role`, { method: "POST", body }).then(async (data) => {
            
            const json = await data.json().catch(() => undefined);
            if (!json || json['error']) {
                toast({
                    title: "Failed to set reports role",
                    description: json['error'] || "Couldn't find error.",
                    status: "error",
                })
                return;
            }
            setSuccess(true);
            toast({
                title: "Reports Role Updated",
                description: role ? `The reports role has been updated to @${roles?.find((i: { id: string }) => i.id === role)?.name ?? "Unknown"}.` : "Reports role is now disabled for this server.",
                status: "success",
            })
    
        }).catch(() => {});
    }
    if (!roles) return <></>;

    return <div className={"flex flex-col md:items-start flex-1 flex-shrink-0 gap-3 md:w-fit p-4"}>
    <h3 className={"text-xl mx-auto font-open-sans text-gray-300 text-center flex flex-col"}>Reports Role</h3>
    
    <span className={"flex flex-col justify-center items-center mx-auto max-md:flex-col gap-2"}>
        <span className={"mx-auto"}><Roles serverID={server.serverID} onChange={onReportsRoleChange} value={role}/></span>
        <Button onClick={setReportsRole} className={`flex items-center gap-2 w-fit mx-auto`} variant={"outline"} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsAt/> Update</>) }
        </Button>
        </span>
    </div>
}