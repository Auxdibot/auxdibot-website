"use client";

import NumberBox from "@/components/input/NumberBox";
import Roles from "@/components/input/Roles";
import DashboardActionContext from "@/context/DashboardActionContext";
import { Suspense, useContext, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { BsAward, BsCheckLg, BsPeople, BsPlus, BsX } from "react-icons/bs";
import { useQuery, useQueryClient } from "react-query";

export function Reward({ reward, role, index, serverID }: { role: { name: string }, reward: { level: number, roleID: string }, index: number, serverID: string }) {
    const actionContext = useContext(DashboardActionContext);
    const queryClient = useQueryClient();
    function deleteReward() {
        if (!serverID) return;
        const body = new URLSearchParams();
        body.append("index", index.toString());
        fetch(`/api/v1/servers/${serverID}/levels/rewards`, { method: "DELETE", body }).then(async (data) => {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            queryClient.invalidateQueries(["data_levels", serverID])
            
            if (actionContext)
            json && json['error'] ? actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false }) : json ? actionContext.setAction({ status: `Removed Level ${reward.level}'s reward from the level rewards.`, success: true }) : "";
            
        }).catch(() => {     
        });
    }
    return (<span className={"flex flex-row gap-2 text-xl items-center"}>{role.name} - <BsAward/> Level {reward.level} <span className={"border text-white rounded-2xl w-fit h-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-lg cursor-pointer"} onClick={() => deleteReward()}><BsX/></span></span>);
}

type LevelRewardBody = { level: string | number, roleID: string };
export default function LevelRewards({ server }: { server: { 
    serverID: string, 
    level_rewards: { level: number, roleID: string }[],
}}) {
    let { data: roles } = useQuery(["data_roles", server.serverID], async () => await fetch(`/api/v1/servers/${server.serverID}/roles`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    const [success, setSuccess] = useState(false);
    const { handleSubmit, reset, control } = useForm<LevelRewardBody>({ defaultValues: { level: 1, roleID: "" }});
    const actionContext = useContext(DashboardActionContext);
    const queryClient = useQueryClient();
    function addLevelReward(formData: LevelRewardBody) {
        if (!server) return;
        const body = new URLSearchParams();
        body.append("level", formData.level?.toString() ?? '');
        body.append("role", formData.roleID);
        fetch(`/api/v1/servers/${server.serverID}/levels/rewards`, { method: "PATCH", body }).then(async (data) => {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            queryClient.invalidateQueries(["data_levels", server.serverID])
            
            if (!json['error'])
                setSuccess(true);
            if (actionContext)
                json && json['error'] ? actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false }) : json ? actionContext.setAction({ status: `Added a level reward to Level ${formData.level}.`, success: true }) : "";
            reset();
        }).catch(() => {     
        });
    }
    return <div className={"bg-gray-800 shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Level Rewards</h2>
    <ul className={"flex flex-col gap-4 my-4 items-center"}>
    <Suspense fallback={null}>
        {server?.level_rewards?.map((i, index) => <li key={index}><Reward reward={i} role={roles.find((role: { id: string }) => i.roleID == role.id)} index={index} serverID={server.serverID} /></li>)}

    </Suspense>
    <label className={"flex flex-row max-md:flex-col gap-2 items-center"}>
            <span className={"flex flex-row gap-2 items-center font-open-sans text-xl"}><BsPeople/> Role:</span>
            <Controller control={control} name={"roleID"} render={({ field }) => {
                return <Roles serverID={server.serverID} onChange={(e) => field.onChange(e.role)} value={field.value}/>;
            }}/>
    </label>
    <label className={"flex flex-row max-md:flex-col gap-2 items-center"}>
            <span className={"flex flex-row gap-2 items-center font-open-sans text-xl"}><BsAward/> Level:</span>
            <Controller control={control} name={"level"} render={({ field }) => {
                return <NumberBox className={'w-10'} Icon={BsAward} value={Number(field.value) || 0} max={999} min={1} onChange={field.onChange}/>;
            }}/>
    </label>
    
    <button onClick={handleSubmit(addLevelReward)} className={`secondary text-md max-md:mx-auto ${success ? "bg-gradient-to-l from-green-400 to-green-600 text-black border-black" : "hover-gradient border-white"} hover:text-black hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsPlus/> Add Level Reward</>) }
        </button>
    </ul>
    </div>;
}