"use client";
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';

import { BsBell, BsChatLeftDots, BsEye, BsLink, BsMegaphone, BsRss, BsTextLeft, BsTwitch, BsWifi, BsYoutube } from 'react-icons/bs';

import { APIEmbed } from 'discord-api-types/v10';
import MockEmbed from '@/components/MockEmbed';
import EmbedSettings from '@/components/input/EmbedSettings';
import Channels from '@/components/ui/channels';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NotificationNames } from '@/lib/constants/NotificationNames';
import { Input } from '@/components/ui/input';
import { TextareaMessage } from '@/components/ui/textarea-message';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
type NotificationBody = { type: string, topic: string, embed: APIEmbed, message: string, channel: string };
const NotificationSelect = {
    'YOUTUBE': <><BsYoutube/> YouTube Handle</>,
    'TWITCH': <><BsTwitch/> Twitch Username</>,
    'RSS': <><BsRss/> RSS Feed URL</>
}
const FeedPlaceholders: { [key: string]: string } = {
    '{%feed_link%}': '[[ LINK TO CONTENT ]]',
    '{%feed_author%}': '[[ CONTENT AUTHOR ]]',
    '{%feed_title%}': '[[ CONTENT TITLE ]]',
    '{%feed_content%}': '[[ FEED CONTENT ]]'

}
export default function CreateNotification({ serverID }: { serverID: string }) {
    const { handleSubmit, reset, control, register, watch } = useForm<NotificationBody>({ defaultValues: { type: 'YOUTUBE', embed: { fields: [] }, channel: '', topic: '', message: '' }});
    const { append, remove } = useFieldArray({ name: 'embed.fields', control: control, rules: { maxLength: 25 } });
    const queryClient = useQueryClient();
    const embed = watch("embed");
    const type = watch("type");
    const { toast } = useToast();
    console.log(embed);         
    function onSubmit(data: NotificationBody) {
        let body = new URLSearchParams();
        body.append('channelID', data.channel);
        body.append('type', data.type);
        body.append('topicURL', data.topic);
        body.append('message', data.message);
        if (data.embed.author?.name || data.embed.description || data.embed.title || data.embed.footer?.text || (data.embed.fields?.length || 0) > 0) {
            body.append('embed', JSON.stringify(data.embed));
        }
        fetch(`/api/v1/servers/${serverID}/notifications`, { method: 'POST', body }).then(async (data) => {
            const json = await data.json().catch(() => undefined);
            if (!json || json['error']) {
                toast({ title: "Failed to create notification", description: json['error'] ?? "An error occured", status: "error" })
                return
            }
            queryClient.invalidateQueries(["data_notifications", serverID])
            toast({ title: "Notification Created", description: `Notification was created.`, status: "success" })
            reset();

        }).catch(() => {})
    }
    return <>
    <div className={"flex-1 flex-grow shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Create Notification Feed</h2>
    <p className={"text-gray-400 font-open-sans md:ml-4 max-md:w-full max-md:text-center text-base italic"}><span className={"text-red-500"}>*</span> = required field</p>
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-2 md:m-5 my-5"}>
        <label className={"flex flex-row max-md:flex-col gap-2 items-center font-open-sans"}>
            <span className={"flex flex-row gap-2 items-center text-xl"}><span className={"text-red-500"}>*</span> <BsMegaphone/> Channel:</span> 
            <Controller name={'channel'} control={control} render={({ field }) => (
                <Channels serverID={serverID} value={field.value} onChange={(e) => field.onChange(e.channel)}  />
        )}></Controller>
        </label>
        <label className={"flex flex-row max-md:flex-col gap-2 items-center font-open-sans"}>
            <span className={"flex flex-row gap-2 items-center text-xl"}><span className={"text-red-500"}>*</span> <BsWifi/> Type:</span>
            <Controller name={"type"} control={control} render={({ field }) => {
            return <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className={'w-fit'}>
                    <SelectValue placeholder={'Select a feed type'} />
                </SelectTrigger>
                <SelectContent>
                    {Object.keys(NotificationNames).map((i) => <SelectItem className={'group'} key={i} value={i}><span className={"flex items-center gap-2 group-hover:gap-3 px-2 transition-all"}>{NotificationNames[i as keyof typeof NotificationNames]}</span></SelectItem>)}

                </SelectContent>
            </Select>
            }}/>
        </label>
        <label className={"flex flex-row max-md:flex-col gap-2 items-center font-open-sans"}>
            <span className={"flex flex-row gap-2 items-center text-xl"}><span className={"text-red-500"}>*</span> {NotificationSelect[type as keyof typeof NotificationSelect] ?? <><BsLink/> Topic</>}:</span>
            <Input className='w-fit' {...register('topic', { required: true })}/>
        </label>

        <section className={"flex flex-col gap-2 max-md:items-center w-full font-open-sans text-xl"}>
            <span className={"flex flex-row gap-2 items-center"}><BsChatLeftDots/> Message:</span>
            <Controller name={'message'} control={control} render={({ field }) => (
                <TextareaMessage placeholderContext={['feed']} wrapperClass={'w-full'} maxLength={2000} serverID={serverID} {...field}/>
            )}></Controller>
        </section>
        <section className={"w-full flex flex-col max-md:justify-center max-md:items-center"}>
        <span className={'flex max-md:flex-col gap-5 justify-between items-center'}>
        <Dialog>
        <DialogTrigger asChild>
            <Button className={'w-fit gap-2 my-2'} variant={'secondary'}><BsTextLeft/> Edit Embed</Button>
        </DialogTrigger>
        <DialogContent className={'max-h-[98vh] overflow-y-scroll'}>
        <Controller name={'embed'} control={control} render={({ field }) => (
                <EmbedSettings placeholderContext={['feed']} serverID={serverID} addField={append} register={register} removeField={remove} control={control} value={field.value} />
        )}></Controller>
        </DialogContent>
        </Dialog>
        <Button className={`flex flex-row gap-2 items-center max-md:mx-auto w-fit`} variant={'outline'} type="submit">
            <BsBell/> Create Notification
        </Button>
        </span>
        <Separator className={'my-2'} />
        <span className={'max-md:px-2'}>
        <h1 className={'font-montserrat text-xl flex items-center gap-2 my-2'}><BsEye/> Embed Preview</h1>
        {embed ? <MockEmbed embed={JSON.parse(Object.keys(FeedPlaceholders).reduce((acc: string, i) => acc.replace(i, FeedPlaceholders[i]), JSON.stringify(embed)))}/> : ""}
        </span>
        
        </section>
        
        
       
    </form>
    
    </div>
    </>;

    
}
