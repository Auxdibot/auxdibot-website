"use client";

import ModuleSlider from "./ModuleSlider";
import DisableableModules from "@/lib/constants/DisableableModules";

export default function DisabledModules({ server }: { server: { data: {serverID: string, disabled_modules: string[]} }}) {
    if (!server?.data?.disabled_modules) return <></>;
    return <div className={"shadow-2xl bg-gray-800 border-2 border-gray-800 rounded-2xl w-fit max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Disabled Modules</h2>
    {server?.data?.disabled_modules ? <ul className={"flex flex-col justify-center text text-lg p-4 pt-0 mt-5 ml-5 gap-2"}>
    {DisableableModules.map((i) => <li key={i}><span className={"flex flex-row gap-2 items-center text-xl"}><ModuleSlider module={i} server={server}/> {i}</span></li>)}</ul> : ""}
</div>;
}