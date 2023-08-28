import DashboardActionContext from "@/context/DashboardActionContext";
import PermissionType from "@/lib/types/PermissionType";
import Image from "next/image";
import { useContext } from 'react'; 
import { BsCardList, BsPeople, BsPerson, BsShieldCheck, BsShieldExclamation, BsShieldLock, BsTrash } from "react-icons/bs";
import { useQueryClient } from "react-query";

export default function Permission({ serverID, permission }: { serverID: string, permission: PermissionType }) {
    const actionContext = useContext(DashboardActionContext);
    const queryClient = useQueryClient();

    function deletePermission() {
        fetch(`/api/v1/servers/${serverID}/permissions/${permission.index}`, { method: "DELETE" }).then(async (data) => 
        {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            queryClient.invalidateQueries(["data_permissions", serverID])
            if (json && json['error']) {
                if (actionContext)
                    actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false });
                return;
            }
            if (actionContext)
                    actionContext.setAction({ status: `Successfully deleted permission #${permission.index+1}`, success: true })
        })
    }
    return <div className={"bg-gray-700 rounded-xl p-1 flex flex-col gap-2"}>
    <code className={"text-md flex flex-row justify-between max-md:flex-col gap-1 mb-4"}>
        <span className={"bg-gray-600 rounded-xl px-2 w-fit flex flex-row gap-2 items-center"}><BsCardList/> #{permission.index+1}</span> 
        <span className={"bg-gray-600 rounded-xl px-2 w-fit flex flex-row gap-2 items-center"}>{permission.allowed ? <><BsShieldCheck/> Allowed</> : <><BsShieldExclamation/> Denied</>}</span>
    </code>
    <span className={"flex flex-row gap-2 items-center text-lg"}><BsShieldLock/> Permission: {permission.permission}</span>
    {permission.user ? <span className={"flex flex-row gap-2 items-center text-lg"}><BsPerson/> User: {permission.user.avatar ? <Image
            src={`https://cdn.discordapp.com/avatars/${permission.user.id}/${permission.user.avatar}.png`}
            alt={"Discord profile icon"}
            className={"inline-block align-middle rounded-full"}
            width={32}
            height={32}
            quality="100"
            priority
            />  : ""}{permission.user.username}</span> : permission.role ? <span className={"flex flex-row gap-2 items-center text-lg"}><BsPeople/> Role: {permission.role.name}</span> : "" }
    <span className={"secondary text-xl text-gray-300 flex flex-row items-center gap-2"}><button className={"border text-white rounded-2xl w-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-xl"} onClick={() => deletePermission()}><BsTrash/></button> Delete</span>
    </div>;
}