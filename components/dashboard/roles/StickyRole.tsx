import { useToast } from "@/components/ui/use-toast";
import { APIRole } from "discord-api-types/v10";
import { BsAt, BsTrash } from "react-icons/bs";
import { useQuery, useQueryClient } from "react-query";

export default function StickyRole({ roleID, serverID, index }: { readonly roleID: string, readonly serverID: string; readonly index: number; }) {
    const { data: roles } = useQuery(["data_roles", serverID], async () => await fetch(`/api/v1/servers/${serverID}/roles`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const role: APIRole | undefined = roles?.find((i: APIRole) => i.id == roleID);

    if (!role) return <></>;
    function deleteException() {
        const body = new URLSearchParams();
        fetch(`/api/v1/servers/${serverID}/sticky_roles/${roleID}`, { method: "DELETE", body }).then(async (data) => {
            const json = await data.json().catch(() => undefined);
            if (!json || json['error']) {
                toast({ title: `Failed to delete sticky role`, description: json['error'] ? json['error'] : `An error occurred while deleting the sticky role.`, status: 'error' })
                return;
            }
            toast({ title: `Sticky Role Deleted`, description: `Sticky Role #${index} has been deleted successfully.`, status: 'success' })

            queryClient.invalidateQueries(["data_sticky_roles", serverID])
        })
    }
    return <li className={"flex flex-row text-lg items-center font-open-sans gap-2 "}>
        
        <span className={"flex flex-row text-lg items-center font-open-sans gap-1 bg-gray-900 px-1 p-0.5 rounded-2xl"}><BsAt className={"text-xl"} style={{ fill: role.color ? '#' + role.color.toString(16) : '' }} /> {role.name}</span>
        <span className={"secondary text-xl text-gray-300 flex flex-row items-center gap-2"}><button className={"border text-white rounded-2xl w-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-xl"} onClick={() => deleteException()}><BsTrash/></button></span>
    </li>;
}