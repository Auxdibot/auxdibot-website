"use client";
import MockEmbed from '@/components/ui/messages/mock-embed';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { APIEmbed } from 'discord-api-types/v10';
import { BsChatLeftDots, BsEye, BsMegaphone, BsPerson, BsPersonVcard, BsPlus, BsRobot, BsTag, BsTextCenter, BsX } from 'react-icons/bs';
import Channels from '@/components/ui/select/channels';
import Roles from '@/components/ui/select/roles';

import { ReactionRoleTypes } from '@/lib/types/ReactionRoleTypes';
import EmojiPicker from '@/components/ui/emojis/emoji-picker';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select/select';
import { TextareaMessage } from '@/components/ui/messages/textarea-message';
import { Button } from '@/components/ui/button/button';
import { EmbedDialog } from '@/components/ui/dialog/embed-dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import { testWebhook } from '@/lib/testWebhook';

type ReactionRoleBody = { message?: string; title: string; channel: string; webhook_url?: string; reactions: { emoji: string; roleID: string; }[]; embed?: APIEmbed; messageID?: string; type: ReactionRoleTypes; }
export default function CreateReactionRole({ serverID }: { serverID: string }) {
    const { register, watch, control, handleSubmit, reset, setValue } = useForm<ReactionRoleBody>({ defaultValues: {
        message: "", title: "", channel: "", reactions: [], embed: { fields: [] }, type: "DEFAULT", webhook_url: '',
    
    }});
    const { fields, append, remove } = useFieldArray({
        name: "embed.fields",
        control,
        rules: {
            maxLength: 25
        }
    });
    const { fields: reactions, append: appendReaction, remove: removeReaction } = useFieldArray({
        name: "reactions",
        control,
        rules: {
            maxLength: 10
        }
    } as never);

    const { toast } = useToast();
    const queryClient = useQueryClient();

    function onSubmit(data: ReactionRoleBody) {
        let body = new URLSearchParams();
        body.append('channel', data.channel ?? '');
        body.append('reactions', JSON.stringify(data.reactions.map((i) => ({ emoji: i.emoji, roleID: i.roleID }))));
        body.append('message', data.message ?? '');
        body.append('title', data.title ?? '');
        body.append('type', data.type ?? '');
        body.append('messageID', data.messageID ?? '');
        body.append('webhook_url', data.webhook_url ?? '');
        if (data.embed && (data.embed.author?.name || data.embed.description || data.embed.title || data.embed.footer?.text || (data.embed.fields?.length || 0) > 0)) {
            body.append('embed', JSON.stringify(data.embed));
        }
        fetch(`/bot/v1/servers/${serverID}/reaction_roles`, { method: 'POST', body }).then(async (data) => {
            const json = await data.json().catch(() =>  undefined);
            if (!json || json['error']) {
                toast({ title: `Failed to create reaction role`, description: json['error'] ? json['error'] : `An error occurred while creating the reaction role.`, status: 'error' })
                return;
            }
            toast({ title: `Reaction Role Created`, description: `The reaction role has been created successfully.`, status: 'success' })

            removeReaction(fields.length);
            queryClient.invalidateQueries(["data_reaction_roles", serverID]);
            removeReaction(reactions.length);
            reset({ channel: undefined });
            
        }).catch(() => {})
    }
    const embed = watch("embed"),
    messageID = watch("messageID");
    return <>
    <div className={"row-span-1 flex-1 flex-grow shadow-2xl border-2 border-gray-800 rounded-2xl w-full max-md:mx-auto"}>
    <h2 className={"secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Create Reaction Role</h2>
    <p className={"text-gray-400 font-open-sans md:ml-4 max-md:w-full max-md:text-center text-base italic"}><span className={"text-red-500"}>*</span> = required field</p>
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-2 md:m-5 my-5 p-1"}>
        <span className={"flex flex-row max-xl:flex-col gap-2 items-center font-open-sans"}>
            {!messageID && <><span className={"flex flex-row gap-2 items-center text-xl"}><span className={"text-red-500"}>*</span> <BsMegaphone/> Channel:</span> 
            <Controller name={'channel'} control={control} render={({ field }) => (
                <Channels required serverID={serverID} value={field.value} onChange={(e) => field.onChange(e.channel)}  />
        )}></Controller></>}
        </span>
        <label className={"flex flex-row max-xl:flex-col gap-2 items-center font-lato text-xl"}>
            <span className={"flex flex-row gap-2 items-center"}><span className={"text-red-500"}>*</span> <BsTag/> Type:</span>
            <Controller control={control} name={'type'} render={({ field }) => 
            <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className={'w-fit min-w-[200px]'}>
                    <SelectValue placeholder={'Select a type'}/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={'DEFAULT'}>Default</SelectItem>
                    <SelectItem value={'SELECT_ONE'}>Select One</SelectItem>
                    <SelectItem value={'STICKY'}>Sticky</SelectItem>
                    <SelectItem value={'STICKY_SELECT_ONE'}>Sticky (Select One)</SelectItem>
                    {!messageID && <><SelectItem value={'BUTTON'}>Discord Button</SelectItem>
                    <SelectItem value={'BUTTON_SELECT_ONE'}>Discord Button (Select One)</SelectItem>
                    <SelectItem value={'SELECT_MENU'}>Select Menu</SelectItem>
                    <SelectItem value={'SELECT_ONE_MENU'}>Select Menu (Select One)</SelectItem>
                    </>}
                </SelectContent>
            </Select>
            }/>
        </label>
        
        <label className={"flex flex-row max-xl:flex-col gap-2 items-center"}>
            <span className={"flex flex-row gap-2 items-center font-open-sans text-xl"}><BsTextCenter/> Title:</span> 
            <Controller control={control} name={'title'} render={({ field }) => {
                return <Input className={'w-fit'} value={field.value} onChange={(e) => field.onChange(e.currentTarget.value)}/>;
            }}/>
        </label>
        
        <span className={"flex flex-row gap-2 items-center text-2xl mx-auto secondary my-5"}><BsPerson/> Roles</span>
        <span className={"secondary text-xl text-gray-300 flex flex-row items-center gap-2 my-3 mx-auto"}><span className={"border text-white rounded-2xl w-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-lg cursor-pointer"} onClick={() => reactions.length < 10 ? appendReaction({ name: "", value: "" }, { shouldFocus: false }) : {}}><BsPlus/></span> Add Role</span>
       
        <div className={"flex flex-col gap-4"}>
        {reactions.map((item, index) => <li key={item.id} className={"flex w-fit mx-auto max-md:flex-col gap-2 items-center"}>
                <Controller name={`reactions.${index}.emoji`} control={control} render={({ field }) => {
                    return <EmojiPicker serverID={serverID  } value={field.value} onChange={(e) => field.onChange(e.emoji)} />
                } }/>
                <Controller control={control} name={`reactions.${index}.roleID`} render={({ field }) => {
                return <Roles serverID={serverID} onChange={(e) => field.onChange(e.role)} value={field.value}/>;
                }}/>
                <span className={"border text-gray-700 border-gray-700 rounded-2xl w-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-lg cursor-pointer mx-auto"} onClick={() => removeReaction(index)}><BsX/></span>
            </li>)}
        </div>
        <Tabs onValueChange={(val) => val != 'attach' ? setValue("messageID", undefined) : setValue("type", "DEFAULT")}  defaultValue='create'>
        <TabsList className={'flex mx-auto w-fit my-2'}>
            <TabsTrigger value='create'>Embed</TabsTrigger>
            <TabsTrigger value='attach'>Attach to Message</TabsTrigger>
        </TabsList>
        <TabsContent value='create'>
        <label className={"flex flex-row max-xl:flex-col gap-2 items-center"}>
            <span className={"flex flex-row gap-2 items-center font-open-sans text-xl"}><BsRobot/> Webhook URL:</span> 
            <Controller name={`webhook_url`} control={control} render={({ field }) => {
                        const tested = testWebhook(field.value ?? '');
                        return <span className={`w-fit ${tested ? 'text-green-500' : (field.value?.length || 0) > 10 ? 'text-red-500' : ''}`}><Input className={"w-64 text-sm"} value={field.value} onChange={(e) => field.onChange(e.currentTarget.value)} /></span>;
        }} /></label>
        <label className={"flex flex-col gap-2 max-md:items-center font-lato text-xl"}>
            <span className={"flex flex-row gap-2 items-center"}><BsChatLeftDots/> Message:</span>
            <Controller name={'message'} control={control} render={({ field }) => {
                return  <TextareaMessage serverID={serverID} wrapperClass={'w-full'} value={field.value} onChange={field.onChange} maxLength={2000}/>;
            }}/>
        </label>
        <section className={'flex justify-between gap-2 items-center max-md:flex-col'}>
        <EmbedDialog serverID={serverID} control={control} addField={append} register={register} removeField={remove}/>

        <Button variant={'outline'} className={`flex flex-row gap-2 items-center`} type="submit">
            <BsPersonVcard/> Create
        </Button>
        </section>
        </TabsContent>
        <TabsContent value='attach'>
        <section className={'flex justify-center gap-2 items-end max-md:flex-col max-md:items-center'}>
        <span className={'flex flex-col'}>
        <label className={'secondary'}>Message ID:</label>
        <Input className={'w-fit'} {...register("messageID")} />
        </span>
        

        <Button variant={'outline'} className={`flex flex-row gap-2 items-center`} type="submit">
            <BsPersonVcard/> Create
        </Button>
        </section>
        </TabsContent>
       </Tabs>
        
        <span className={'max-md:px-2'}>
        <h1 className={'font-montserrat text-xl flex items-center gap-2 my-2'}><BsEye/> Embed Preview</h1>
        {embed ? <MockEmbed embed={embed}/> : ""}
        </span>
    </form>
    
    </div>
    
    </>;
}