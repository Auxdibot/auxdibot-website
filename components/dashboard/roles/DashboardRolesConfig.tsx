"use client";
import CreateReactionRole from './CreateReactionRole';
import { useQuery } from 'react-query';
import ReactionRoles from './ReactionRoles';
import Massrole from './Massrole';
import JoinRoles from './JoinRoles';
import StickyRoles from './StickyRoles';

export default function DashboardRolesConfig({ id }: { id: string }) {
    const { data: reactionRoles } = useQuery(["data_reaction_roles", id], async () => await fetch(`/api/v1/servers/${id}/reaction_roles`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    const { data: joinRoles } = useQuery(["data_join_roles", id], async () => await fetch(`/api/v1/servers/${id}/join_roles`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    const { data: stickyRoles } = useQuery(["data_sticky_roles", id], async () => await fetch(`/api/v1/servers/${id}/sticky_roles`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    return (<main className={"bg-gray-950 flex-grow"}>
        <div className={"animate-fadeIn flex max-md:items-center flex-col py-5 md:px-5 gap-5"}>
        <h1 className={"header text-6xl max-md:text-5xl"}>roles</h1>
        <span className={"grid grid-rows-3 max-md:grid-rows-none grid-cols-2 max-md:grid-cols-1 gap-10"}>
            {reactionRoles && reactionRoles?.data?.serverID ? <>
                { reactionRoles && reactionRoles?.data?.serverID ? <CreateReactionRole serverID={id} /> : ""}
                <div className={"flex flex-col row-span-2 gap-5"}>
                {joinRoles && joinRoles?.data?.serverID ? <JoinRoles server={joinRoles.data}/> : ""}
                {stickyRoles && stickyRoles?.data?.serverID ? <StickyRoles server={stickyRoles.data}/> : ""}
                <Massrole serverID={reactionRoles.data.serverID}/>
                </div>
                
                { reactionRoles && reactionRoles?.data?.serverID ? <ReactionRoles server={reactionRoles.data} /> : ""}

            </> : "" }
           
        </span>
        </div>
        
            
        </main>)
}