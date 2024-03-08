import PermissionType from "@/lib/types/PermissionType";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { BsShieldCheck, BsShieldX, BsTrash } from "react-icons/bs";
import { useQueryClient } from "react-query";

export default function Permission({ serverID, permission }: { serverID: string, permission: PermissionType }) {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    function deletePermission() {
        fetch(`/api/v1/servers/${serverID}/permissions/${permission.index}`, { method: "DELETE" }).then(async (data) => 
        {
            const json = await data.json().catch(() => undefined);
            
            if (!json || json['error']) {
                toast({ title: `Failed to delete permission override`, description: json['error'] ? json['error'] : `An error occurred while deleting the permission override.`, status: 'error' })
                return;
            }
            toast({ title: `Permission Override Deleted`, description: `The permission override has been deleted successfully.`, status: 'success' })
            queryClient.invalidateQueries(["data_permissions", serverID])

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