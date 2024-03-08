"use client";

import { Controller, useForm } from "react-hook-form";
import { PunishmentType } from "@/lib/types/PunishmentType";
import { BsCheckLg, BsHammer } from "react-icons/bs";
import PunishmentSelect from "@/components/ui/select/punishment-select";
import { useMemo, useState } from "react";
import { PunishmentNames } from "@/lib/constants/PunishmentNames";
import { useQueryClient } from "react-query";
import { AutomodPunishment } from "@/lib/types/AutomodPunishment";
import { Button } from "@/components/ui/button/button";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

type AttachmentsLimitPunishmentBody = { punishment: PunishmentType | null; reason?: string; };

export default function AttachmentsSettingsPunishment({ server }: { server: { readonly serverID: string, readonly automod_attachments_punishment: AutomodPunishment; }}) {
    const { control, reset, handleSubmit } = useForm<AttachmentsLimitPunishmentBody>({ defaultValues: useMemo(() => ({ 
        punishment: server.automod_attachments_punishment?.punishment ?? 'WARN', reason: server.automod_attachments_punishment?.reason ?? 'You have been punished for breaking the attachments limit on this server.'
    }), [ server.automod_attachments_punishment ]) });
    const [success, setSuccess] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function onSubmit(data: AttachmentsLimitPunishmentBody) {
        let body = new URLSearchParams();
        body.append('punishment', data.punishment ?? '');
        body.append('reason', data.reason ?? '');
        fetch(`/api/v1/servers/${server.serverID}/moderation/attachments/punishment`, { method: 'POST', body }).then(async (res) => {
            const json = await res.json().catch(() => undefined);
            if (!json || json['error']) {
                toast({ title: 'Failed to update attachments punishment', description: json?.error ?? 'An error occurred while updating attachments punishment.', status: 'error' })
                return;
            }
            toast({ title: 'Updated Attachments Punishment', description: `Users will now receive a ${PunishmentNames[data.punishment ?? 'WARN'].name} after breaking the attachments limit.`, status: 'success' })
            setSuccess(true);
            queryClient.invalidateQueries(['data_moderation', server.serverID]);
            reset({ punishment: json.automod_attachments_punishment.punishment, reason: json.automod_attachments_punishment.reason }); 

        }).catch(() => {})
    }
    return <section className={"my-2 flex flex-col gap-2"}>
    <span className={"text-xl font-open-sans text-center"}>Attachments Limit Punishment</span>
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col w-full items-center justify-center gap-2"}>
        <section className={"flex flex-col w-full px-4 items-center justify-between gap-2"}>
            
            <span className={"flex-1 flex flex-col gap-1 items-center"}>
            <label className={"text-sm text-left font-montserrat w-full"}>Punishment</label>
                <Controller control={control} name={'punishment'} render={({ field }) => {
            return <PunishmentSelect disable={['DELETE_MESSAGE']} className={'w-48'} onChange={(e) => { setSuccess(false); field.onChange(e.type) }} value={field.value} />
            } }/></span>
            <span className={"w-full flex flex-col gap-1 items-center"}>
            <label className={"text-sm text-left font-montserrat w-full"}>Punishment Reason</label>
                <Controller control={control} name={'reason'} render={({ field }) => {
            return <>
                    <Textarea maxLength={200}  className={"w-full max-h-[100px]"} onChange={(e) => { setSuccess(false); field.onChange(e)} } value={field.value} />
                    <span className={"text-left w-full text-gray-400 pl-2 font-open-sans text-xs"}>{field.value?.length || 0}/200</span>
                   </>
            } }/>

            </span>
        </section>
        
        <Button variant={'outline'} type='submit' className={`flex flex-row gap-2 items-center w-fit mx-auto`}>
        {success ? (<><BsCheckLg/> Updated!</>) : (<><BsHammer/> Update</>) }
        </Button>
    </form>
    </section>;
}