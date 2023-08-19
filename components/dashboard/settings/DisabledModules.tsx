"use client";

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
    return <div className={"shadow-2xl bg-gray-800 border-2 border-gray-800 rounded-2xl"}>
    <h2 className={"bg-gray-900 secondary text-3xl max-md:text-2xl p-4 md:pl-1 max-md:text-center rounded-2xl rounded-b-none"}>Disabled Modules</h2>
    {data?.disabled_modules ? <ul className={"flex flex-col text text-lg p-4 pt-0 mt-5 list-disc ml-5 gap-2"}>{data.disabled_modules.length ? data.disabled_modules.map((i: string) => <li key={i}><span>{i}</span></li>) : "No modules disabled."}</ul> : ""}
    <form className={"flex flex-col p-2 gap-2 max-md:items-center"} method={"PATCH"} onSubmit={(e) => handleSubmit(e)}>
        <select className={"rounded-lg w-fit text border border-gray-700"} name={"disabled_module"}>
            <option value={"null"}>Select a module.</option>
            {DisableableModules.map((i) => <option key={i} value={i}>{i}</option>)}
        </select>
        <button className={"secondary hover-gradient hover:text-black text-lg hover:border-black transition-all w-fit border-white border rounded-xl p-1 flex flex-row gap-2 items-center"} type="submit"><BsToggles/> Toggle Module</button>
    </form>
</div>;
}