"use client";
import MockEmbed from '@/components/MockEmbed';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from 'react-query';
import { useContext, useEffect, useRef, useState } from 'react';
import { APIEmbed } from 'discord-api-types/v10';
import { BsBroadcast, BsChatLeftDots, BsImage, BsListTask, BsMegaphone, BsPencil, BsPerson, BsPlus, BsTextCenter, BsTextLeft, BsTextarea, BsX } from 'react-icons/bs';
import { SketchPicker } from 'react-color';
import DashboardActionContext from '@/context/DashboardActionContext';
import EmbedSettings from '@/components/input/EmbedSettings';
import Channels from '@/components/input/Channels';

type EmbedBody = { message: string; channel: string; embed: APIEmbed; }
export default function DashboardEmbedsConfig({ id }: { id: string }) {
    const { register, watch, control, handleSubmit, reset, setValue } = useForm<EmbedBody>();
    const { append, remove } = useFieldArray({
        name: "embed.fields",
        control,
        rules: {
            maxLength: 25
        }
    });
    const actionContext = useContext(DashboardActionContext);
    function onSubmit(data: EmbedBody) {
        let body = new URLSearchParams();
        body.append('channel', data.channel);
        body.append('message', data.message);
        if (data.embed.author?.name || data.embed.description || data.embed.title || data.embed.footer?.text || (data.embed.fields?.length || 0) > 0) {
            body.append('embed', JSON.stringify(data.embed));
        }
        fetch(`/api/v1/servers/${id}/embeds`, { method: 'POST', body }).then(async (data) => {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            if (json && !json['error']) {
                if (actionContext)
                    actionContext.setAction({ status: `Successfully sent an embed.`, success: true })
                reset();
            } else {
                if (actionContext)
                    actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false });
            }
        }).catch(() => {})
    }
    const embed = watch("embed");   
    return (<main className={"bg-gray-950 flex-grow"}>
        <div className={"animate-fadeIn flex max-md:items-center flex-col py-5 md:px-5 gap-5"}>
        <h1 className={"header text-6xl max-md:text-5xl"}>embeds</h1>
        <span className={"flex flex-row max-md:flex-col gap-10 w-full"}>
        <div className={"bg-gray-800 flex-1 flex-grow flex-shrink-0 shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Create Embed</h2>
    <span className={"text-lg font-open-sans ml-2"}><span className={"text-red-500"}>*</span> = required field</span>
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-2 md:m-5 my-5"}>
        <label className={"flex flex-row max-xl:flex-col gap-2 items-center font-lato text-xl"}>
            <span className={"flex flex-row gap-2 items-center"}><span className={"text-red-500"}>*</span> <BsMegaphone/> Channel:</span> 
            <Controller name={'channel'} control={control} render={({ field }) => (
                <Channels required serverID={id} value={field.value} onChange={(e) => field.onChange(e.channel)}  />
        )}></Controller></label>
        <label className={"flex flex-col gap-2 max-md:items-center font-lato text-xl"}>
            <span className={"flex flex-row gap-2 items-center"}><BsChatLeftDots/> Message:</span>
            <textarea className={"rounded-md font-roboto text-lg w-full"} cols={2} {...register("message")}/>
        </label>
        
        <span className={"flex flex-row gap-2 items-center mx-auto font-open-sans text-xl"}><BsTextLeft/> Embed Settings</span>
        <span className={"text text-gray-500 italic text-sm text-center"}>(leave empty for no embed)</span>
        <Controller name={'embed'} control={control} render={({ field }) => (
                <EmbedSettings addField={append} register={register} removeField={remove} setValue={setValue} value={field.value} />
        )}/>
        <button className={`secondary text-xl mx-auto hover-gradient border-white hover:text-black hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`} type="submit">
            <BsBroadcast/> Send Embed
        </button>
    </form>
    
    </div>
    <div className={"bg-gray-800 flex-1 flex-grow flex-shrink-0 shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
        <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Embed Preview</h2>
        <span className={"p-5 w-fit max-w-full"}>{embed?.author?.name || embed?.description || embed?.title || embed?.footer?.text || (embed?.fields?.length || 0) > 0 ? <MockEmbed embed={embed}/> : ""}</span>
    </div>
        </span>
        </div>
        
            
        </main>)
}