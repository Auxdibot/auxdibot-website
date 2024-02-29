import { useToast } from "@/components/ui/use-toast";
import { BsTrash } from "react-icons/bs";
import { useQueryClient } from "react-query";

export default function BlacklistedPhrase({ phrase, serverID, index }: { readonly phrase: string, readonly serverID: string; readonly index: number; }) {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    function deleteException() {
        const body = new URLSearchParams();
        body.append('index', index.toString())

        fetch(`/api/v1/servers/${serverID}/moderation/blacklist/`, { method: "DELETE", body }).then(async (data) => {
            const json = await data.json().catch(() => undefined);
            if (!json || json['error']) {
                toast({
                    title: "Failed to delete phrase",
                    description: json['error'] || "An error occurred.",
                    status: "error",
                })
                return;
            }
            toast({
                title: "Phrase Deleted",
                description: `The phrase has been deleted from the blacklist.`,
                status: "success",
            })
            queryClient.invalidateQueries(['data_moderation', serverID]);
            
        })
    }
    return <li className={"py-2"}>
        <div className={"flex flex-row text-lg items-center font-open-sans gap-2"}>
        
        <span className={"text-center text-base font-open-sans gap-1 bg-gray-900/70 border-gray-800/50 border px-1 p-0.5 rounded-2xl w-32 hover:w-full hover:max-w-[250px] text-ellipsis whitespace-nowrap overflow-hidden"}>{phrase}</span>
        <span className={"secondary text-xl text-gray-300 flex flex-row items-center gap-2"}><button className={"border border-gray-700 text-gray-600 rounded-2xl w-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-xl"} onClick={() => deleteException()}><BsTrash/></button></span>
    </div>
        </li>;
}