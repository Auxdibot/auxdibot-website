"use client";

import { Controller, useForm } from "react-hook-form";
import NumberBox from "@/components/input/NumberBox";
import { BsCheckLg, BsEnvelopeOpen } from "react-icons/bs";
import { useContext, useMemo, useState } from "react";
import DashboardActionContext from "@/context/DashboardActionContext";
import { useQueryClient } from "react-query";
import { AutomodSpamLimit } from "@/lib/types/AutomodSpamLimit";
import timestampToDuration from "@/lib/timestampToDuration";
import TimestampBox from "@/components/input/TimestampBox";
import { AutomodPunishment } from "@/lib/types/AutomodPunishment";
import InvitesSettingsPunishment from "./InvitesSettingsPunishment";

type InvitesSettingsBody = { invites: number, duration: string };

export default function InvitesSettings({ server }: { server: { readonly serverID: string, readonly automod_invites_punishment: AutomodPunishment; readonly automod_invites_limit: AutomodSpamLimit; }}) {
    const { control, reset, handleSubmit } = useForm<InvitesSettingsBody>({ defaultValues: useMemo(() => ({ 
        invites: server?.automod_invites_limit?.messages ?? 0, duration: ''
    }), [ server?.automod_invites_limit?.messages]) });
    const [success, setSuccess] = useState(false);
    const actionContext = useContext(DashboardActionContext);
    const queryClient = useQueryClient();
    function onSubmit(data: InvitesSettingsBody) {
        let body = new URLSearchParams();
        body.append('invites', data.invites?.toString() ?? '');
        if (!timestampToDuration(data.duration) || timestampToDuration(data.duration) == 'permanent') {
            if (actionContext) 
                    actionContext.setAction({ status: `This is not a valid timestamp!`, success: false })
            return;
        }
        const duration = Number(timestampToDuration(data.duration));
        console.log(duration + " " + timestampToDuration(data.duration))
        body.append('duration', duration ? duration.toString() : '0')

        fetch(`/api/v1/servers/${server.serverID}/moderation/invites/`, { method: 'POST', body }).then(async (data) => {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            if (json && !json['error']) {
                queryClient.invalidateQueries(['data_moderation', server.serverID]);
                setSuccess(true);
                if (actionContext) 
                    actionContext.setAction({ status: `Successfully updated the invites limit for this server.`, success: true })

            } else {
                reset();
                if (actionContext)
                    actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false });
            }
        }).catch(() => {})
    }
    return <>
    <div className={"bg-gray-800 shadow-2xl border-2 border-gray-800 rounded-2xl self-stretch w-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Invites Limit</h2>
    <span className={"text-sm text-gray-400 italic font-open-sans block py-2 text-center mx-auto"}>Accepts invites and timestamp. If invites or timestamp are not set, invites limit is disabled.</span>
    <section className={"my-2 flex flex-col"}>
    <h3 className={"text-2xl font-open-sans text-gray-300 text-center flex flex-col"}>Invites Limits Settings</h3>
    <section className={"my-2 flex flex-col gap-4"}>
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col items-center justify-center gap-4"}>
        <div className={"flex max-xl:flex-col justify-center flex-1 w-full py-2 gap-2 items-center"}>
        <Controller control={control} name={'invites'} render={({ field }) => {
            return <NumberBox className={"w-10"} max={999} min={0} Icon={BsEnvelopeOpen} onChange={field.onChange} value={field.value} />
            } }/>
        <span className={"font-open-sans"}> invites every </span>
         
         <Controller control={control} name={'duration'} render={({ field }) => {
            return <TimestampBox className={"w-12"} onChange={field.onChange} value={field.value} />
            } }/>

        </div>
        
        <button type='submit' className={`secondary text-md max-md:mx-auto ${success ? "bg-gradient-to-l from-green-400 to-green-600 text-black border-black" : "hover-gradient border-white"} hover:text-black  hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`}>
        {success ? (<><BsCheckLg/> Updated!</>) : (<><BsEnvelopeOpen/> Change Invites Limit</>) }
        </button>
    </form>
    <InvitesSettingsPunishment server={server} />
    </section>
    </section>
    </div>
    </>;
}