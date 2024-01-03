import DashboardActionContext from "@/context/DashboardActionContext";
import PermissionType from "@/lib/types/PermissionType";
import Image from "next/image";
import { useContext } from 'react'; 
import { BsCardList, BsPeople, BsPerson, BsShieldCheck, BsShieldExclamation, BsShieldLock, BsShieldX, BsTrash } from "react-icons/bs";
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
    return <span className={"flex gap-2"}>
    <tr className={"border w-full max-md:w-full flex justify-between items-center px-2 max-md:flex-col group"}>

    <td className="flex-1 flex items-center gap-2">{permission.allowed ? <BsShieldCheck/> : <BsShieldX/>} {permission.permission}</td> 

        <td className="flex-1 justify-center flex items-center gap-1">
    {permission.role ? permission.role.name : permission.user ? <>{permission.user?.avatar ? <Image
        src={`https://cdn.discordapp.com/avatars/${permission.user.id}/${permission.user.avatar}.png`}
        alt={"Discord profile icon"}
        className={"inline-block align-middle rounded-full"}
        width={24}
        height={24}
        quality="100"
        priority
        /> : ""}{permission.user.username}</> : "Not Found"}</td>
    <td className="flex-1 text-center">#{permission.index+1}</td>
    </tr>
    <span className={"secondary text-xl text-gray-300 flex flex-row items-center gap-2"}>
        <button className={"border text-white rounded-2xl w-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-xl"} onClick={() => deletePermission()}><BsTrash/></button>
        </span></span>;
}