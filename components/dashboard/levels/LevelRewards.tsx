"use client";

import DashboardActionContext from "@/context/DashboardActionContext";
import DiscordGuild from "@/lib/types/DiscordGuild";
import { Suspense, useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { BsAward, BsCheckLg, BsPlus, BsX } from "react-icons/bs";
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

type LevelRewardBody = { level: number, roleID: string };
export default function LevelRewards({ server }: { server: DiscordGuild & { 
    data: {
        serverID: string, 
        level_rewards: { level: number, roleID: string }[],
    } 
}}) {
    let { data: roles } = useQuery(["data_roles", server.id], async () => await fetch(`/api/v1/servers/${server.id}/roles`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    const [success, setSuccess] = useState(false);
    const { register, handleSubmit, reset } = useForm<LevelRewardBody>();
    const actionContext = useContext(DashboardActionContext);
    const queryClient = useQueryClient();
    function addLevelReward(formData: LevelRewardBody) {
        if (!server) return;
        const body = new URLSearchParams();
        body.append("level", formData.level.toString());
        body.append("role", formData.roleID);
        fetch(`/api/v1/servers/${server.id}/levels/rewards`, { method: "PATCH", body }).then(async (data) => {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            queryClient.invalidateQueries(["data_levels", server.id])
            
            if (!json['error'])
                setSuccess(true);
            if (actionContext)
                json && json['error'] ? actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false }) : json ? actionContext.setAction({ status: `Added a level reward to Level ${formData.level}.`, success: true }) : "";
            reset();
        }).catch(() => {     
        });
    }
    if (!roles) return <></>;
    return <div className={"bg-gray-800 shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Level Rewards</h2>
    <ul className={"flex flex-col gap-4 my-4 items-center"}>
    <Suspense fallback={null}>
        {server?.data?.level_rewards?.map((i, index) => <li key={index}><Reward reward={i} role={roles.find((role: { id: string }) => i.roleID == role.id)} index={index} serverID={server.data.serverID} /></li>)}

    </Suspense>
    <select {...register("roleID", { required: true })} className={"font-roboto w-fit mx-auto rounded-md p-1 text-md"}>
            <option value={"null"}>Select a role...</option>
            {roles.map((i: any) => i.name != "@everyone" ? <option key={i.id} value={i.id}>{i.name}</option> : <></>)}
    </select> 
    <input type="number" required {...register("level", { required: true })} placeholder="Level" className={"placeholder:text-gray-500 px-1 rounded-md font-roboto text-md w-fit mx-auto"}/>
    <button onClick={handleSubmit(addLevelReward)} className={`secondary text-md max-md:mx-auto ${success ? "bg-gradient-to-l from-green-400 to-green-600 text-black border-black" : "hover-gradient border-white"} hover:text-black hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsPlus/> Add Level Reward</>) }
        </button>
    </ul>
    </div>;
}