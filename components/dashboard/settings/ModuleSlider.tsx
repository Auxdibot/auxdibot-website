"use client"
import DashboardActionContext from "@/context/DashboardActionContext";
import DisableableModules from "@/lib/constants/DisableableModules";
import { useContext } from "react";
import { BsChat, BsHammer, BsList, BsPersonBadge, BsQuestionCircle, BsShieldCheck, BsStar, BsTrophy } from "react-icons/bs";
import { PiHandWaving } from "react-icons/pi";
import { useQueryClient } from "react-query";

let ModuleIcons: { [K in typeof DisableableModules[number]]: React.ReactElement } = {
    "Messages": <BsChat/>, "Moderation": <BsHammer/>, "Permissions": <BsShieldCheck/>, "Roles": <BsPersonBadge/>, "Levels": <BsTrophy/>, "Suggestions": <BsQuestionCircle/>, "Starboard": <BsStar/>, "Greetings": <PiHandWaving/>
}
export default function ModuleSlider({ module, server }: { module: string, server: { data: {serverID: string, disabled_modules: string[]} } }) {
    const queryClient = useQueryClient();
    const actionContext = useContext(DashboardActionContext);
    function handleClick() {
        const body = new URLSearchParams();

        body.append('module', module);
        fetch(`/api/v1/servers/${server.data.serverID}/modules`, { method: "PATCH", body }).then(async (data) => 
        {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            queryClient.invalidateQueries(["data_settings", server.data.serverID])
            if (actionContext)
                json && json['error'] ? actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false }) : json ? actionContext.setAction({ status: `Successfully toggled module ${module}.`, success: true }) : ""
        }).catch(() => undefined);
    }
    return (<div className={"w-16 h-8 border rounded-full relative px-1 bg-gray-700"} ><div onClick={() => handleClick()} className={`cursor-pointer absolute rounded-full top-1/2 bottom-1/2 -translate-y-1/2 h-7 w-7 transition-all bg-gradient-to-l flex items-center justify-center ${server.data.disabled_modules.indexOf(module) != -1 ? "from-red-500 to-red-700 -translate-x-0.5" : "translate-x-full from-green-500 to-green-700"}`}><span className={"text-white text-md opacity-60"}>{ModuleIcons[module]}</span></div></div>)
}