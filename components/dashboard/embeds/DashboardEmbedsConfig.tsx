"use client";
import MockEmbed from '@/components/MockEmbed';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { APIEmbed } from 'discord-api-types/v10';
import { BsBroadcast, BsChatLeftDots, BsMegaphone, BsTextLeft } from 'react-icons/bs';
import EmbedSettings from '@/components/input/EmbedSettings';
import Channels from '@/components/ui/channels';
import { TextareaMessage } from '@/components/ui/textarea-message';
import { useToast } from '@/components/ui/use-toast';
import { useQuery } from 'react-query';

type EmbedBody = { message: string; channel: string; embed: APIEmbed; }
export default function DashboardEmbedsConfig({ id }: { id: string }) {
    const { register, watch, control, handleSubmit, reset } = useForm<EmbedBody>({ defaultValues: { embed: { fields: [] }, channel: '', message: '' } });
    const { fields, append, remove } = useFieldArray({
        name: "embed.fields",
        control,
        rules: {
            maxLength: 25,
        }
    });
    const { data: channels } = useQuery(["data_channels", id], async () => await fetch(`/api/v1/servers/${id}/channels`).then(async (data) => await data.json().catch(() => undefined)).catch(() => undefined));
    const { toast } = useToast();
    function onSubmit(data: EmbedBody) {
        let body = new URLSearchParams();
        console.log(data.embed);
        body.append('channel', data.channel || '');
        body.append('message', data.message || '');
        if (data.embed.author?.name || data.embed.description || data.embed.title || data.embed.footer?.text || (data.embed.fields?.length || 0) > 0) {
            body.append('embed', JSON.stringify(data.embed));
        }
        fetch(`/api/v1/servers/${id}/embeds`, { method: 'POST', body }).then(async (res) => {
            const json = await res.json().catch(() => undefined);
            if (!json || json['error']) {
                toast({ title: "Failed to create embed", description: json['error'] ?? "An error occured", status: "error" })
                return;
            }
            toast({ title: "Embed Created", description: `Posted an embed in #${channels.find((i: { id: string, name: string }) => i.id == data.channel)?.name ?? 'Unknown'}`, status: "success" })
            reset();

        }).catch(() => {})
    }
    console.log(fields);
    const embed = watch("embed");
    return (<main className={"bg-gray-950 flex-grow"}>
        <div className={"animate-fadeIn flex max-md:items-center flex-col py-5 md:px-5 gap-5"}>
        <h1 className={"header text-6xl max-md:text-5xl"}>embeds</h1>
        <span className={"flex flex-row max-xl:flex-col gap-10 w-full"}>
        <div className={"flex-1 flex-grow flex-shrink-0 shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Create Embed</h2>
    <span className={"text-lg font-open-sans ml-2"}><span className={"text-red-500"}>*</span> = required field</span>
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-2 md:m-5 my-5"}>
        <label className={"flex flex-row max-xl:flex-col gap-2 items-center"}>
            <span className={"flex flex-row gap-2 items-center font-open-sans text-xl"}><span className={"text-red-500"}>*</span> <BsMegaphone/> Channel:</span> 
            <Controller name={'channel'} control={control} render={({ field }) => (
                <Channels required serverID={id} value={field.value} onChange={(e) => field.onChange(e.channel)}  />
        )}></Controller></label>
        <section className={"flex flex-col gap-2 w-full max-md:items-center"}>
            <span className={"flex flex-row gap-2 items-center font-open-sans text-xl"}><BsChatLeftDots/> Message:</span>
            <Controller name={'message'} control={control} render={({ field }) => (
                <TextareaMessage className={'w-full'} serverID={id} {...field}/>
            )}/>
        </section>
        
        <span className={"flex flex-row gap-2 items-center mx-auto font-open-sans text-xl"}><BsTextLeft/> Embed Settings</span>
        <span className={"text text-gray-500 italic text-sm text-center"}>(lexve empty for no embed)</span>
        <Controller name={'embed'} control={control} render={({ field }) => {
            console.log(' embed');
            console.log(field.value);
            console.log(' embed');
            return <EmbedSettings  serverID={id}  control={control} addField={append} register={register} removeField={remove} value={({...field.value, fields})} />;
        }}/>
        <button className={`secondary text-xl mx-auto hover-gradient border-white hover:text-black hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`} type="submit">
            <BsBroadcast/> Send Embed
        </button>
    </form>
    
    </div>
    <div className={"flex-1 flex-grow flex-shrink-0 shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
        <h2 className={" secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Embed Preview</h2>
        <span className={"md:p-5 w-full flex justify-center"}>{embed?.author?.name || embed?.description || embed?.title || embed?.footer?.text || (embed?.fields?.length || 0) > 0 ? <MockEmbed embed={embed}/> : ""}</span>
    </div>
        </span>
        </div>
        
            
        </main>)
}