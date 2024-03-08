"use client";
import MockEmbed from '@/components/ui/messages/mock-embed';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { APIEmbed } from 'discord-api-types/v10';
import { BsChatLeftDots, BsTextLeft } from 'react-icons/bs';
import { PiHandWavingLight } from 'react-icons/pi'; 
import JoinLeaveChannel from './JoinLeaveChannel';
import EmbedSettings from '@/components/ui/messages/embed-settings';
import { useToast } from '@/components/ui/use-toast';

enum GreetingType {
    JOIN = "join",
    JOIN_DM = "join_DM",
    LEAVE = "leave"
}

type GreetingBody = { message: string; greeting: GreetingType; embed: APIEmbed; }
export default function DashboardGreetingsConfig({ id }: { id: string }) {
    const { register, watch, control, handleSubmit, reset } = useForm<GreetingBody>();
    const { append, remove } = useFieldArray({
        name: "embed.fields",
        control,
        rules: {
            maxLength: 25
        }
    });
    const { toast } = useToast();
    function onSubmit(bodyData: GreetingBody) {
        let body = new URLSearchParams();
        body.append('message', bodyData.message);
        if (bodyData.embed.author?.name || bodyData.embed.description || bodyData.embed.title || bodyData.embed.footer?.text || (bodyData.embed.fields?.length || 0) > 0) {
            body.append('embed', JSON.stringify(bodyData.embed));
        }
        fetch(`/api/v1/servers/${id}/greetings/${bodyData.greeting}`, { method: 'POST', body }).then(async (data) => {
            const json = await data.json().catch(() => undefined);
            if (!json || json['error']) {
                toast({ title: `Failed to set greeting`, description: json['error'] ? json['error'] : `An error occurred while setting the greeting.`, status: 'error' })
                return;
            }
            toast({ title: `Greeting Set`, description: `The ${bodyData.greeting.replace('_', ' ') } greeting has been set successfully.`, status: 'success' })
            reset({ message: "", greeting: GreetingType.JOIN, embed: { fields: [] } });

        }).catch(() => {})
    }
    const embed = watch("embed");
    return (<main className={"bg-gray-950 flex-grow"}>
        <div className={"animate-fadeIn flex max-md:items-center flex-col py-5 md:px-5 gap-5"}>
        <h1 className={"header text-6xl max-md:text-5xl"}>greetings</h1>
        <span className={"grid grid-cols-2 max-md:grid-cols-1 grid-rows-2 max-md:grid-rows-none gap-10"}>
        <div className={"bg-gray-800 shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto row-span-2"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Set Greeting</h2>
    <span className={"text-lg font-open-sans ml-2"}><span className={"text-red-500"}>*</span> = required field</span>
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-2 md:m-5 my-5"}>
        <label className={"flex flex-row max-xl:flex-col gap-2 items-center font-lato text-xl"}>
            <span className={"flex flex-row gap-2 items-center"}><span className={"text-red-500"}>*</span> <PiHandWavingLight/> Greeting:</span> 
            <select className={"rounded-md font-roboto w-fit text-lg"} {...register("greeting", { required: true })}>
            <option value={GreetingType.JOIN}>Join Server</option>
            <option value={GreetingType.JOIN_DM}>Join Server (DM)</option> 
            <option value={GreetingType.LEAVE}>Leave Server</option> 
        </select></label>
        <label className={"flex flex-col gap-2 max-md:items-center font-lato text-xl"}>
            <span className={"flex flex-row gap-2 items-center"}><BsChatLeftDots/> Message:</span>
            <textarea className={"rounded-md font-roboto text-lg w-full"} cols={2} {...register("message")}/>
        </label>
        
        <span className={"flex flex-row gap-2 items-center mx-auto font-lato text-xl"}><BsTextLeft/> Embed Settings</span>
        <span className={"text text-gray-500 italic text-sm text-center"}>(leave empty for no embed)</span>
        <Controller name={'embed'} control={control} render={({ field }) => (
                <EmbedSettings control={control} addField={append} register={register} removeField={remove} value={field.value} />
        )}></Controller>
        <button className={`secondary text-xl mx-auto hover-gradient border-white hover:text-black hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`} type="submit">
            <PiHandWavingLight/> Set Greeting
        </button>
    </form>
    
    </div>
    <div className={"bg-gray-800 flex flex-col shadow-2xl border-2 border-gray-800 rounded-2xl max-md:h-fit w-full max-md:mx-auto h-fit"}>
        <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Embed Preview</h2>
        <span className={"md:p-5 mx-auto w-full"}>{embed?.author?.name || embed?.description || embed?.title || embed?.footer?.text || (embed?.fields?.length || 0) > 0 ? <MockEmbed embed={embed}/> : ""}</span>
    </div>
    <div className={"bg-gray-800 flex-1 flex-grow shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
        <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Greetings Settings</h2>
        <JoinLeaveChannel serverID={id}/>
    </div>
        </span>
        </div>
        
            
        </main>)
}