"use client"
import DisableableModules from "@/lib/constants/DisableableModules";
import { BsHammer, BsList, BsPersonBadge, BsQuestionCircle, BsShieldCheck, BsStar, BsTrophy } from "react-icons/bs";
import { useQueryClient } from "react-query";

let ModuleIcons: { [K in typeof DisableableModules[number]]: React.ReactElement } = {
    "Messages": <BsList/>, "Moderation": <BsHammer/>, "Permissions": <BsShieldCheck/>, "Roles": <BsPersonBadge/>, "Levels": <BsTrophy/>, "Suggestions": <BsQuestionCircle/>, "Starboard": <BsStar/>
}
export default function ModuleSlider({ module, data }: { module: string, data: { serverID: string, disabled_modules: string[] } }) {
    const queryClient = useQueryClient();
    function handleClick() {
        const body = new URLSearchParams();

        body.append('disabled_module', module);
        fetch(`/api/servers/${data.serverID}/settings`, { method: "PATCH", body }).then(() => queryClient.invalidateQueries(["data_settings", data.serverID])).catch(() => undefined);
    }
    return (<div className={"w-16 h-8 border rounded-full relative px-1 bg-gray-700"} ><div onClick={() => handleClick()} className={`cursor-pointer absolute rounded-full top-1/2 bottom-1/2 -translate-y-1/2 h-7 w-7 transition-all bg-gradient-to-l flex items-center justify-center ${data.disabled_modules.indexOf(module) != -1 ? "from-red-500 to-red-700 translate-x-full" : "-translate-x-0.5 from-green-500 to-green-700"}`}><span className={"text-white text-md opacity-60"}>{ModuleIcons[module]}</span></div></div>)
}