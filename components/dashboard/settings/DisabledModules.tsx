"use client";

import ModuleSlider from "./ModuleSlider";
import DisableableModules from "@/lib/constants/DisableableModules";
import { BsToggles } from "react-icons/bs";
import { useQueryClient } from "react-query";

export default function DisabledModules({ data }: { data: { serverID: string, disabled_modules: string[] }}) {
    const queryClient = useQueryClient();
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const disabled_module = formData.get("disabled_module");
        
        if (disabled_module == "null" || !disabled_module) return;
        const body = new URLSearchParams();

        body.append('disabled_module', disabled_module.toString());
        fetch(`/api/servers/${data.serverID}/settings`, { method: "PATCH", body }).then(() => queryClient.invalidateQueries(["data_settings", data.serverID])).catch(() => undefined);
    }
    if (!data?.disabled_modules) return <></>;
    return <div className={"shadow-2xl bg-gray-800 border-2 border-gray-800 rounded-2xl w-fit"}>
    <h2 className={"bg-gray-900 secondary text-3xl max-md:text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Disabled Modules</h2>
    {data?.disabled_modules ? <ul className={"flex flex-col justify-center text text-lg p-4 pt-0 mt-5 ml-5 gap-2"}>
    {DisableableModules.map((i) => <li key={i}><span className={"flex flex-row gap-2 items-center text-xl"}><ModuleSlider module={i} data={data}/> {i}</span></li>)}</ul> : ""}
</div>;
}