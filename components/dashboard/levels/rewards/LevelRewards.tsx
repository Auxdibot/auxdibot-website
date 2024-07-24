"use client";


import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input";
import Roles from "@/components/ui/select/roles";
import { useToast } from "@/components/ui/use-toast";
import { Suspense, useMemo, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { BsAt, BsAward, BsCheckLg, BsPeople, BsPlus, BsTrash } from "react-icons/bs";
import { useQuery, useQueryClient } from "react-query";
import { LevelPayload } from "../DashboardLevelsConfig";
import _ from 'lodash';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowDown, ArrowUp } from "lucide-react";
export function Reward({ reward, role, serverID }: { role: { name: string, color: number }, reward: { level: number, roleID: string, index: number }, serverID: string }) {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function deleteReward() {
        if (!serverID) return;
        const body = new URLSearchParams();
        body.append("index", reward.index.toString());
        fetch(`/bot/v1/servers/${serverID}/levels/rewards`, { method: "DELETE", body }).then(async (data) => {
            const json = await data.json().catch(() => undefined);
            if (!json || json['error']) {
                toast({ title: "Failed to delete level reward", description: json['error'] ?? "An error occured", status: "error" })
                return
            }
            toast({ title: "Level Reward Deleted", description: `Successfully deleted a level reward from Level ${reward.level}.`, status: "success" })
            queryClient.invalidateQueries(["data_levels", serverID])
            
        }).catch(() => {     
        });
    }
    return (<span className={'flex gap-2 items-center self-stretch justify-between'}>
    <span className={"flex flex-row gap-2 text-xl max-md:text-base items-center font-open-sans bg-gray-900/70 border-gray-800/50 border px-1 p-0.5 rounded-2xl w-full"}>
        <code>#{reward.index+1}</code>
        <BsAt className={"text-xl"} style={{ fill: role?.color ? '#' + role.color.toString(16) : '' }} /> {role?.name ?? "Deleted Role"}
    </span>
    <span className={"border text-gray-700 border-gray-700 rounded-2xl w-fit h-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-lg cursor-pointer"} onClick={() => deleteReward()}><BsTrash/></span>
     </span>);
}
function LevelsReward({ server, rewards }: { server: LevelPayload, rewards: { level: number, index: number, roleID: string }[] }) {
    let { data: roles } = useQuery(["data_roles", server.serverID], async () => await fetch(`/bot/v1/servers/${server.serverID}/roles`).then(async (data) => 
        await data.json().catch(() => undefined)).catch(() => undefined));
    const [isOpen, setIsOpen] = useState(false);
    return <Collapsible
        open={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
    >
    <CollapsibleTrigger asChild>
        <h3 className="font-bold text-lg cursor-pointer flex gap-2 items-center">Level {rewards[0].level} {isOpen ? <ArrowDown width={16}/> : <ArrowUp width={16}/>}</h3>
    </CollapsibleTrigger>
    <Reward key={0} reward={rewards[0]} role={roles?.find((role: { id: string }) => rewards[0].roleID == role.id)} serverID={server.serverID} />
    <CollapsibleContent className="flex flex-col gap-2 mt-2">
    {roles && rewards.slice(1).map((reward, index) => <Reward key={index} reward={reward} role={roles.find((role: { id: string }) => reward.roleID == role.id)} serverID={server.serverID} />)}
    </CollapsibleContent>
    {!isOpen && rewards.length > 1 && <span className="text-base italic font-lato text-gray-400">and {rewards.length-1} more...</span>}
    

    </Collapsible>
}
type LevelRewardBody = { level: string | number, roleID: string };
export default function LevelRewardsList({ server }: { server: LevelPayload }) {
    const [success, setSuccess] = useState(false);
    const { handleSubmit, reset, control } = useForm<LevelRewardBody>({ defaultValues: { level: 1, roleID: "" }});
    const  { toast } = useToast();
    const queryClient = useQueryClient();
    function addLevelReward(formData: LevelRewardBody) {
        if (!server) return;
        const body = new URLSearchParams();
        body.append("level", formData.level?.toString() ?? '');
        body.append("role", formData.roleID);
        fetch(`/bot/v1/servers/${server.serverID}/levels/rewards`, { method: "PATCH", body }).then(async (data) => {
            const json = await data.json().catch(() => undefined);
            if (!json || json['error']) {
                toast({ title: "Failed to add level reward", description: json['error'] ?? "An error occured", status: "error" })
                return
            }
            toast({ title: "Level Reward Added", description: `Successfully added a level reward to Level ${formData.level}.`, status: "success" })
            queryClient.invalidateQueries(["data_levels", server.serverID])
            setSuccess(true);   
                

            reset();
        }).catch(() => {     
        });
    }
    const rewards = useMemo(() => _.chain(server.level_rewards).groupBy('level').toArray(), [server]);

    return <div className={"shadow-2xl border-2 border-gray-800 rounded-2xl self-stretch w-full max-md:mx-auto"}>
    <h2 className={"secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Level Rewards</h2>
    {rewards && server.level_rewards.length > 0 ? <ul className={"flex flex-col my-4 gap-2 border border-gray-800 p-2 max-md:w-[98%] w-fit mx-auto rounded-2xl"}>
    <Suspense fallback={null}>
        {rewards.map((i, index) => <LevelsReward key={index} rewards={i} server={server}/>).value()}
    </Suspense>
    
    </ul> : <h2 className={"text-xl text-gray-400 font-open-sans text-center"}>No level rewards found.</h2>}

    <div className={'flex flex-col mx-auto items-center justify-center gap-2 py-6'}>
    <label className={"flex flex-row max-md:flex-col gap-2 items-center"}>
            <span className={"flex flex-row gap-2 items-center font-open-sans text-xl"}><BsPeople/> Role:</span>
            <Controller control={control} name={"roleID"} render={({ field }) => {
                return <Roles serverID={server.serverID} onChange={(e) => field.onChange(e.role)} value={field.value}/>;
            }}/>
    </label>
    <label className={"flex flex-row max-md:flex-col gap-2 items-center"}>
            <span className={"flex flex-row gap-2 items-center font-open-sans text-xl"}><BsAward/> Level:</span>
            <Controller control={control} name={"level"} render={({ field }) => {
                return <Input className={'w-16'} value={Number(field.value) || 0} max={999} min={1} onChange={field.onChange}/>;
            }}/>
    </label>
    
    <Button onClick={handleSubmit(addLevelReward)} className={`flex flex-row gap-2 items-center max-md:mx-auto w-fit`} variant={'outline'} type="submit">
            {success ? (<><BsCheckLg/> Updated!</>) : (<><BsPlus/> Add</>) }
        </Button>
    </div>
    </div>;
}