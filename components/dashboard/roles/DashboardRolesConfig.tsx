"use client";
import CreateReactionRole from './CreateReactionRole';
import { useQuery } from 'react-query';
import ReactionRoles from './ReactionRoles';
import Massrole from './Massrole';

export default function DashboardRolesConfig({ id }: { id: string }) {
    let { data: reactionRoles } = useQuery(["data_reaction_roles", id], async () => await fetch(`/api/v1/servers/${id}/reaction_roles`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));

    return (<main className={"bg-gray-700 flex-grow"}>
        <div className={"animate-fadeIn flex max-md:items-center flex-col py-5 md:px-5 gap-5"}>
        <h1 className={"header text-6xl max-md:text-5xl"}>Roles</h1>
        <span className={"grid grid-rows-2 max-md:grid-rows-none grid-cols-2 max-md:grid-cols-1 gap-10"}>
            {reactionRoles ? <>
                <CreateReactionRole serverID={id} />
                <ReactionRoles server={reactionRoles} />
                <Massrole server={reactionRoles}/>
            </> : "" }
        </span>
        </div>
        
            
        </main>)
}