"use client";

import { Controller, useForm } from "react-hook-form";
import { PunishmentType } from "@/lib/types/PunishmentType";
import { BsCheckLg, BsHammer } from "react-icons/bs";
import PunishmentSelect from "@/components/input/PunishmentSelect";
import { useContext, useMemo, useState } from "react";
import DashboardActionContext from "@/context/DashboardActionContext";
import { useQueryClient } from "react-query";

type BlacklistPunishmentBody = { punishment: PunishmentType | null; };

export default function BlacklistPunishment({ server }: { server: { readonly serverID: string, readonly automod_banned_phrases_punishment: PunishmentType; }}) {
    const { control, reset, handleSubmit } = useForm<BlacklistPunishmentBody>({ defaultValues: useMemo(() => ({ 
        punishment: server.automod_banned_phrases_punishment ?? 'DELETE_MESSAGE' 
    }), [ server.automod_banned_phrases_punishment ]) });
    const [success, setSuccess] = useState(false);
    const actionContext = useContext(DashboardActionContext);
    const queryClient = useQueryClient();
    function onSubmit(data: BlacklistPunishmentBody) {
        let body = new URLSearchParams();
        body.append('punishment', data.punishment ?? '');

        fetch(`/api/v1/servers/${server.serverID}/moderation/blacklist/punishment`, { method: 'POST', body }).then(async (data) => {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            if (json && !json['error']) {
                queryClient.invalidateQueries(['data_moderation', server.serverID]);
                setSuccess(true);
                if (actionContext) 
                    actionContext.setAction({ status: `Successfully updated the blacklist punishment for this server.`, success: true })

            } else {
                reset();
                if (actionContext)
                    actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false });
            }
        }).catch(() => {})
    }
    return <section className={"my-2 flex flex-col gap-4 pt-2"}>
    <span className={"text-xl font-open-sans text-center"}>Blacklist Punishment</span>
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col items-center justify-center gap-2"}>
    <span className={"flex-1 flex items-center"}><Controller control={control} name={'punishment'} render={({ field }) => {
            return <PunishmentSelect deleteMessage onChange={(e) => { setSuccess(false); field.onChange(e.type) }} value={field.value} />
            } }/></span>
        
        <button type='submit' className={`secondary text-md max-md:mx-auto ${success ? "bg-gradient-to-l from-green-400 to-green-600 text-black border-black" : "hover-gradient border-white"} hover:text-black  hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`}>
        {success ? (<><BsCheckLg/> Updated!</>) : (<><BsHammer/> Change Blacklist Punishment</>) }
        </button>
    </form>
    </section>;
}