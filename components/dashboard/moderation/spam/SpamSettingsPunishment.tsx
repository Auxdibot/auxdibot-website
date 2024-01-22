"use client";

import { Controller, useForm } from "react-hook-form";
import { PunishmentType } from "@/lib/types/PunishmentType";
import { BsChatQuote, BsCheckLg, BsHammer } from "react-icons/bs";
import PunishmentSelect from "@/components/input/PunishmentSelect";
import { useContext, useMemo, useState } from "react";
import DashboardActionContext from "@/context/DashboardActionContext";
import { useQueryClient } from "react-query";
import { AutomodPunishment } from "@/lib/types/AutomodPunishment";
import TextBox from "@/components/input/TextBox";

type SpamLimitPunishmentBody = { punishment: PunishmentType | null; reason?: string; };

export default function SpamSettingsPunishment({ server }: { server: { readonly serverID: string, readonly automod_spam_punishment: AutomodPunishment; }}) {
    const { control, reset, handleSubmit } = useForm<SpamLimitPunishmentBody>({ defaultValues: useMemo(() => ({ 
        punishment: server.automod_spam_punishment?.punishment ?? 'WARN', reason: server.automod_spam_punishment?.reason ?? 'You have been punished for breaking the spam limit on this server.'
    }), [ server.automod_spam_punishment ]) });
    const [success, setSuccess] = useState(false);
    const actionContext = useContext(DashboardActionContext);
    const queryClient = useQueryClient();
    function onSubmit(data: SpamLimitPunishmentBody) {
        let body = new URLSearchParams();
        body.append('punishment', data.punishment ?? '');
        body.append('reason', data.reason ?? '');
        fetch(`/api/v1/servers/${server.serverID}/moderation/spam/punishment`, { method: 'POST', body }).then(async (data) => {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            if (json && !json['error']) {
                queryClient.invalidateQueries(['data_moderation', server.serverID]);
                setSuccess(true);
                if (actionContext) 
                    actionContext.setAction({ status: `Successfully updated the spam limit punishment for this server.`, success: true })

            } else {
                reset();
                if (actionContext)
                    actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false });
            }
        }).catch(() => {})
    }
    return <section className={"my-2 flex flex-col gap-2"}>
    <span className={"text-xl font-open-sans text-center"}>Spam Limit Punishment</span>
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col items-center justify-center gap-4"}>
        <section className={"flex max-md:flex-col items-center justify-between gap-2"}>
            <span className={"flex-1 flex items-center"}><Controller control={control} name={'punishment'} render={({ field }) => {
            return <PunishmentSelect onChange={(e) => { setSuccess(false); field.onChange(e.type) }} value={field.value} />
            } }/></span>
            <span className={"flex-1 flex items-center"}><Controller control={control} name={'reason'} render={({ field }) => {
            return <TextBox Icon={BsChatQuote} maxLength={200} onChange={field.onChange} value={field.value} />
            } }/></span>
        </section>
        
        <button type='submit' className={`secondary text-md max-md:mx-auto ${success ? "bg-gradient-to-l from-green-400 to-green-600 text-black border-black" : "hover-gradient border-white"} hover:text-black  hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`}>
        {success ? (<><BsCheckLg/> Updated!</>) : (<><BsHammer/> Change Spam Punishment</>) }
        </button>
    </form>
    </section>;
}