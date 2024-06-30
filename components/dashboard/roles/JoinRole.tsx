import { useToast } from "@/components/ui/use-toast";
import { APIRole } from "discord-api-types/v10";
import { BsAt, BsTrash } from "react-icons/bs";
import { useQuery, useQueryClient } from "react-query";

export default function JoinRole({ roleID, serverID, index }: { readonly roleID: string, readonly serverID: string; readonly index: number; }) {
    const { data: roles } = useQuery(["data_roles", serverID], async () => await fetch(`/bot/v1/servers/${serverID}/roles`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const role: APIRole | undefined = roles?.find((i: APIRole) => i.id == roleID);

    if (!role) return <></>;
    function deleteException() {
        const body = new URLSearchParams();
        body.append('index', index.toString())

        fetch(`/bot/v1/servers/${serverID}/join_roles/${roleID}`, { method: "DELETE", body }).then(async (data) => {
            const json = await data.json().catch(() => undefined);
            if (!json || json['error']) {
                toast({ title: `Failed to delete join role`, description: json['error'] ? json['error'] : `An error occurred while deleting the join role.`, status: 'error' })
                return;
            }
            toast({ title: `Join Role Deleted`, description: `The join role has been deleted successfully.`, status: 'success' })
            
            queryClient.invalidateQueries(["data_join_roles", serverID])
        })
    }
    return <li className={"flex gap-2 items-center self-stretch justify-between font-open-sans"}>
        
        <span className={"flex flex-row text-lg items-center font-open-sans gap-1 bg-gray-900/70 border-gray-800/50 px-1 p-0.5 rounded-2xl"}><BsAt className={"text-xl"} style={{ fill: role.color ? '#' + role.color.toString(16) : '' }} /> {role.name}</span>
        <span className={"secondary text-xl flex flex-row items-center gap-2"}><button className={"border text-gray-700 border-gray-700 rounded-2xl w-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-xl"} onClick={() => deleteException()}><BsTrash/></button></span>
    </li>;
}