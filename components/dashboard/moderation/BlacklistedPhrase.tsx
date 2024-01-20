import DashboardActionContext from "@/context/DashboardActionContext";
import { useContext } from "react";
import { BsTrash } from "react-icons/bs";
import { useQueryClient } from "react-query";

export default function BlacklistedPhrase({ phrase, serverID, index }: { readonly phrase: string, readonly serverID: string; readonly index: number; }) {
    const actionContext = useContext(DashboardActionContext);
    const queryClient = useQueryClient();

    function deleteException() {
        const body = new URLSearchParams();
        body.append('index', index.toString())

        fetch(`/api/v1/servers/${serverID}/moderation/blacklist/`, { method: "DELETE", body }).then(async (data) => {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            queryClient.invalidateQueries(["data_moderation", serverID])

            if (actionContext)
                json && json['error'] ? actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false }) : json ? actionContext.setAction({ status: `Successfully deleted blacklisted phrase #${index+1}`, success: true }) : ""
        })
    }
    return <li className={"py-2"}>
        <div className={"flex flex-row text-lg items-center font-open-sans gap-2"}>
        
        <span className={" text-lg font-open-sans gap-1 bg-gray-900 px-1 p-0.5 rounded-2xl w-40 text-ellipsis whitespace-nowrap overflow-hidden"}>{phrase}</span>
        <span className={"secondary text-xl text-gray-300 flex flex-row items-center gap-2"}><button className={"border text-white rounded-2xl w-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-xl"} onClick={() => deleteException()}><BsTrash/></button></span>
    </div>
        </li>;
}