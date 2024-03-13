"use client"
import { useToast } from "@/components/ui/use-toast";
import DisableableModules from "@/lib/constants/DisableableModules";
import { BsChat, BsHammer, BsPersonBadge, BsQuestionCircle, BsShieldCheck, BsStar, BsTrophy } from "react-icons/bs";
import { PiHandWaving } from "react-icons/pi";
import { useQueryClient } from "react-query";

let ModuleIcons: { [K in typeof DisableableModules[number]]: React.ReactElement } = {
    "Messages": <BsChat/>, "Moderation": <BsHammer/>, "Permissions": <BsShieldCheck/>, "Roles": <BsPersonBadge/>, "Levels": <BsTrophy/>, "Suggestions": <BsQuestionCircle/>, "Starboard": <BsStar/>, "Greetings": <PiHandWaving/>
}
export default function ModuleSlider({ module, server }: { module: keyof typeof ModuleIcons, server: { data: {serverID: string, disabled_modules: string[]} } }) {
    const queryClient = useQueryClient();
    const { toast} = useToast();
    function handleClick() {
        const body = new URLSearchParams();

        body.append('module', module);
        fetch(`/api/v1/servers/${server.data.serverID}/modules`, { method: "PATCH", body }).then(async (data) => 
        {
            const json = await data.json().catch(() => undefined);
            queryClient.invalidateQueries(["data_settings", server.data.serverID])
            if (!json || json['error']) {
                toast({
                    title: `Error`,
                    description: `An error occurred while updating modules!`,
                    status: 'error',
                    duration: 5000,
                });
            } else {
                toast({
                    title: `Toggled Module`,
                    description: `Successfully toggled ${module}. Its functionality is now ${server.data.disabled_modules.indexOf(module) == -1 ? "disabled" : "enabled"} and any commands for this module will be ${server.data.disabled_modules.indexOf(module) == -1 ? "ignored" : "accepted"}.`,
                    status: 'success',
                    duration: 5000,
                });
            }
        }).catch(() => undefined);
    }
    return (<div className={"w-16 h-8 border border-gray-700 rounded-full relative px-1 text-xl"} ><div onClick={() => handleClick()} className={`cursor-pointer absolute rounded-full top-1/2 bottom-1/2 -translate-y-1/2 h-7 w-7 transition-all bg-gradient-to-l flex items-center justify-center ${server.data.disabled_modules.indexOf(module) != -1 ? "from-red-500 to-red-700 -translate-x-0.5" : "translate-x-full from-green-500 to-green-700"}`}><span className={"text-white text-md opacity-60"}>{ModuleIcons[module]}</span></div></div>)
}