"use client";

import { Controller, useForm } from "react-hook-form";
import { BsShieldSlash } from "react-icons/bs";
import { useContext } from "react";
import DashboardActionContext from "@/context/DashboardActionContext";
import { useQueryClient } from "react-query";
import TextBox from "@/components/input/TextBox";
import BlacklistedPhrase from "./BlacklistedPhrase";
import BlacklistPunishment from "./BlacklistPunishment";
import { PunishmentType } from "@/lib/types/PunishmentType";

type BlacklistedPhrasesBody = { phrase: string };

export default function BlacklistedPhrases({ server }: { server: { readonly serverID: string, readonly automod_banned_phrases: string[]; readonly automod_banned_phrases_punishment: PunishmentType; }}) {
    

    const { control, reset, handleSubmit } = useForm<BlacklistedPhrasesBody>();
    
    const actionContext = useContext(DashboardActionContext);
    const queryClient = useQueryClient();
    function onSubmit(data: BlacklistedPhrasesBody) {
        let body = new URLSearchParams();
        body.append('blacklisted_phrase', data.phrase ?? '');

        fetch(`/api/v1/servers/${server.serverID}/moderation/blacklist`, { method: 'PATCH', body }).then(async (data) => {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            if (json && !json['error']) {
                queryClient.invalidateQueries(['data_moderation', server.serverID]);
                if (actionContext)
                    actionContext.setAction({ status: `Successfully updated the blacklisted phrases for this server.`, success: true })

            } else {
                reset();
                if (actionContext)
                    actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false });
            }
        }).catch(() => {})
    }
    return <div className={"bg-gray-800 shadow-2xl border-2 border-gray-800 rounded-2xl self-stretch w-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Blacklisted Phrases</h2>
    <ul className={"w-fit mx-auto my-2 md:columns-2"}>
        {server.automod_banned_phrases && server.automod_banned_phrases.map((i, index) => <BlacklistedPhrase serverID={server.serverID} phrase={i} index={index} key={index} />)}
    </ul>
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col items-center justify-center gap-3 py-2"}>
        <div className={"flex max-md:flex-col gap-2 justify-center flex-1 w-full md:px-20"}>
        <section className={"flex flex-col items-center justify-between flex-1"}>
            <Controller control={control} name={'phrase'} rules={{ required: true }} render={({ field }) => {
            return <TextBox Icon={BsShieldSlash} onChange={field.onChange} value={field.value} />
            } }/>
        </section>
        </div>

        <button type='submit' className={`secondary text-md max-md:mx-auto hover-gradient border-white hover:text-black hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`}>
        <BsShieldSlash/> Add Blacklisted Phrase
        </button>
    </form>
    <BlacklistPunishment server={server} />
    </div>;
}