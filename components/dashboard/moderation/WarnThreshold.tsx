"use client";

import { Controller, useForm } from "react-hook-form";
import { PunishmentType } from "@/lib/types/PunishmentType";
import NumberBox from "@/components/input/NumberBox";
import { BsCheckLg, BsExclamationTriangle } from "react-icons/bs";
import PunishmentSelect from "@/components/input/PunishmentSelect";
import { useContext, useMemo, useState } from "react";
import DashboardActionContext from "@/context/DashboardActionContext";
import { useQueryClient } from "react-query";

type ThresholdFormBody = { punishment: PunishmentType | null, warns: number };

export default function WarnThreshold({ server }: { server: { readonly serverID: string, readonly automod_threshold_punishment: PunishmentType; readonly automod_punish_threshold_warns: number }}) {
    const { control, reset, handleSubmit } = useForm<ThresholdFormBody>({ defaultValues: useMemo(() => ({ 
        warns: server?.automod_punish_threshold_warns ?? 0, punishment: server.automod_threshold_punishment ?? 'WARN' 
    }), [ server.automod_punish_threshold_warns, server.automod_threshold_punishment ]) });
    const [success, setSuccess] = useState(false);
    const actionContext = useContext(DashboardActionContext);
    const queryClient = useQueryClient();
    function onSubmit(data: ThresholdFormBody) {
        let body = new URLSearchParams();
        body.append('punishment', data.punishment ?? '');
        body.append('warns', data.warns.toString() ?? '')

        fetch(`/api/v1/servers/${server.serverID}/moderation/threshold`, { method: 'POST', body }).then(async (data) => {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            if (json && !json['error']) {
                queryClient.invalidateQueries(['data_moderation', server.serverID]);
                setSuccess(true);
                if (actionContext) 
                    actionContext.setAction({ status: `Successfully updated the warns threshold for this server.`, success: true })

            } else {
                reset();
                if (actionContext)
                    actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false });
            }
        }).catch(() => {})
    }
    return <>
    <div className={"bg-gray-800 shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Warn Threshold</h2>
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col items-center justify-center py-2 gap-4"}>
        <div className={"flex max-md:flex-col gap-2 justify-center flex-1 w-full md:px-20 py-2"}>
        <section className={"flex flex-col items-center justify-between"}>
            <span className={"text-xl font-open-sans my-3"}>Punishment Type</span>
            <Controller control={control} name={'punishment'} render={({ field }) => {
            return <PunishmentSelect onChange={(e) => { setSuccess(false); field.onChange(e.type) }} value={field.value} />
            } }/>
        </section>
        <div className={"flex-1 self-center max-md:hidden flex justify-center items-center"}><div className={"h-24 border w-fit"}/></div>
        <section className={"flex flex-col items-center justify-between flex-1"}>
            <span className={"text-xl font-open-sans my-3"}>Warn Count</span>
            <Controller control={control} name={'warns'} render={({ field }) => {
            return <NumberBox className={"w-10"} max={999} Icon={BsExclamationTriangle}  onChange={(e) => { setSuccess(false); field.onChange(e)}} value={field.value} />
            } }/>
        </section>
        </div>
        
        <button type='submit' className={`secondary text-md max-md:mx-auto ${success ? "bg-gradient-to-l from-green-400 to-green-600 text-black border-black" : "hover-gradient border-white"} hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`}>
        {success ? (<><BsCheckLg/> Updated!</>) : (<><BsExclamationTriangle/> Change Warns Threshold</>) }
        </button>
    </form>
    </div>
    </>;
}