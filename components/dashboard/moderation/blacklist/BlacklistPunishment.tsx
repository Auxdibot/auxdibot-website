"use client";

import { Controller, useForm } from "react-hook-form";
import { PunishmentType } from "@/lib/types/PunishmentType";
import { BsCheckLg, BsHammer } from "react-icons/bs";
import PunishmentSelect from "@/components/ui/select/punishment-select";
import { useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { Button } from "@/components/ui/button/button";
import { useToast } from "@/components/ui/use-toast";
import { PunishmentNames } from "@/lib/constants/PunishmentNames";

type BlacklistPunishmentBody = { punishment: PunishmentType | null; };

export default function BlacklistPunishment({ server }: { server: { readonly serverID: string, readonly automod_banned_phrases_punishment: PunishmentType; }}) {
    const { control, reset, handleSubmit } = useForm<BlacklistPunishmentBody>({ defaultValues: useMemo(() => ({ 
        punishment: server.automod_banned_phrases_punishment ?? 'DELETE_MESSAGE' 
    }), [ server.automod_banned_phrases_punishment ]) });
    const [success, setSuccess] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function onSubmit(data: BlacklistPunishmentBody) {
        let body = new URLSearchParams();
        body.append('punishment', data.punishment ?? '');

        fetch(`/api/v1/servers/${server.serverID}/moderation/blacklist/punishment`, { method: 'POST', body }).then(async (res) => {
            const json = await res.json().catch(() => undefined);
            if (!json || json['error']) {
                toast({ title: 'Failed to update blacklist punishment', description: json?.error ?? 'An error occurred while updating blacklist punishment.', status: 'error' })
                return;
            }
            toast({ title: 'Updated Blacklist Punishment', description: `Users will now receive a ${PunishmentNames[data.punishment ?? 'DELETE_MESSAGE'].name} after breaking the blacklist limit.`, status: 'success' })
            queryClient.invalidateQueries(['data_moderation', server.serverID]);
            reset({ punishment: json.automod_banned_phrases_punishment.punishment });
            setSuccess(true);
            
        }).catch(() => {})
    }
    return <section className={"my-2 flex flex-col gap-4 pt-2"}>
    <span className={"text-xl font-open-sans text-center"}>Blacklist Punishment</span>
    <form onSubmit={handleSubmit(onSubmit)} className={"flex max-md:flex-col items-center justify-center w-fit mx-auto gap-2"}>
    <span className={"flex-1 flex items-center"}><Controller control={control} name={'punishment'} render={({ field }) => {
            return <PunishmentSelect  onChange={(e) => { setSuccess(false); field.onChange(e.type) }} value={field.value} />
            } }/></span>
        
        <Button variant={'outline'} type='submit' className={`flex flex-row gap-2 items-center w-fit mx-auto`}>
        {success ? (<><BsCheckLg/> Updated!</>) : (<><BsHammer/> Update</>) }
        </Button>
    </form>
    </section>;
}