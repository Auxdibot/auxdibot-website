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
    return <section className={"my-2 flex flex-col"}>
    <h3 className={"text-2xl font-open-sans text-gray-300 text-center"}>Warns Threshold</h3>
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col items-center justify-center gap-4"}>
        <div className={"flex flex-row justify-center flex-1 w-full py-2 gap-10"}>
        <div className={"self-stretch "}>
        <section className={"flex flex-col items-center justify-between gap-2"}>
            <span className={"text-xl font-open-sans my-3 text-center"}>Punishment</span>
            <span className={"flex-1 flex items-center"}><Controller control={control} name={'punishment'} render={({ field }) => {
            return <PunishmentSelect onChange={(e) => { setSuccess(false); field.onChange(e.type) }} value={field.value} />
            } }/></span>
        </section>
        </div>
         
        <div className={" self-stretch"}>
        <section className={"flex flex-col items-center justify-between gap-2"}>
            <span className={"text-xl font-open-sans my-3 text-center"}>Warn Count</span>
            <span className={"flex-1 flex items-center"}><Controller control={control} name={'warns'} render={({ field }) => {
            return <NumberBox className={"w-10"} max={999} Icon={BsExclamationTriangle}  onChange={(e) => { setSuccess(false); field.onChange(e)}} value={field.value} />
            } }/></span>
        </section>
        </div>

        </div>
        
        <button type='submit' className={`secondary text-md max-md:mx-auto ${success ? "bg-gradient-to-l from-green-400 to-green-600 text-black border-black" : "hover-gradient border-white"} hover:text-black  hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`}>
        {success ? (<><BsCheckLg/> Updated!</>) : (<><BsExclamationTriangle/> Change Warns Threshold</>) }
        </button>
    </form>
    </section>;
}