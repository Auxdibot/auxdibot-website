"use client";
import MockEmbed from '@/components/ui/messages/mock-embed';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { APIEmbed } from 'discord-api-types/v10';
import { BsChatLeftDots } from 'react-icons/bs';
import { PiHandWavingLight } from 'react-icons/pi'; 
import JoinLeaveChannel from './JoinLeaveChannel';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select/select';
import { TextareaMessage } from '@/components/ui/messages/textarea-message';
import { Button } from '@/components/ui/button/button';
import { EmbedDialog } from '@/components/ui/dialog/embed-dialog';

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
            toast({ title: `Greeting Set`, description: `The "${bodyData.greeting.replace('_', ' ').split(' ').map((i) => i[0].toUpperCase() + i.slice(1).toLowerCase())}" greeting has been set successfully.`, status: 'success' })
            reset({ message: "", greeting: GreetingType.JOIN, embed: { fields: [] } });

        }).catch(() => {})
    }
    const embed = watch("embed");
    return (<main className={"bg-gray-950 flex-grow"}>
        <div className={"animate-fadeIn flex max-md:items-center flex-col py-5 xl:px-5 gap-5"}>
        <h1 className={"header text-6xl max-md:text-5xl"}>greetings</h1>
        <span className={"grid grid-cols-2 max-xl:grid-cols-1 grid-rows-2 max-xl:grid-rows-none gap-10 w-full"}>
        <div className={"shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto row-span-2"}>
    <h2 className={"secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Set Greeting</h2>
    <p className={"text-gray-400 font-open-sans md:ml-4 max-md:w-full max-md:text-center text-base italic"}><span className={"text-red-500"}>*</span> = required field</p>
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-2 md:m-5 my-5"}>
        <label className={"flex flex-row max-xl:flex-col gap-2 items-center font-lato text-xl"}>
            <span className={"flex flex-row gap-2 items-center"}><span className={"text-red-500"}>*</span> <PiHandWavingLight/> Greeting:</span> 
            <Controller control={control} name={'greeting'} render={({ field }) => 
            <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className={'w-fit min-w-[200px]'}>
                    <SelectValue placeholder={'Select a type'}/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={'JOIN'}>Join</SelectItem>
                    <SelectItem value={'JOIN_DM'}>Join (DM)</SelectItem>
                    <SelectItem value={'LEAVE'}>Leave</SelectItem>
                </SelectContent>
            </Select>
            }/>
        </label>
        <label className={"flex flex-col gap-2 max-md:items-center font-lato text-xl"}>
            <span className={"flex flex-row gap-2 items-center"}><BsChatLeftDots/> Message:</span>
            <Controller name={'message'} control={control} render={({ field }) => {
                return  <TextareaMessage serverID={id} wrapperClass={'w-full'} value={field.value} onChange={field.onChange} maxLength={2000}/>;
            }}/>
        </label>
        <section className={'flex justify-between gap-2 items-center max-md:flex-col'}>
        <EmbedDialog serverID={id} control={control} addField={append} register={register} removeField={remove} />
 
        <Button variant={'outline'} className={`flex flex-row gap-2 items-center`} type="submit">
            <PiHandWavingLight/> Set Greeting
        </Button>
        </section>
    </form>
    
    </div>
    <div className={"flex flex-col shadow-2xl border-2 border-gray-800 rounded-2xl max-md:h-fit w-full max-md:mx-auto h-fit"}>
        <h2 className={"secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Embed Preview</h2>
        <span className={"md:p-5 mx-auto justify-center w-full"}>{embed?.author?.name || embed?.description || embed?.title || embed?.footer?.text || (embed?.fields?.length || 0) > 0 ? <MockEmbed embed={embed}/> : ""}</span>
    </div>
    <div className={"flex-1 flex-grow shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
        <h2 className={"secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Greetings Settings</h2>
        <JoinLeaveChannel serverID={id}/>
    </div>
        </span>
        </div>
        
            
        </main>)
}