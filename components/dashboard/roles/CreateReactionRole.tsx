"use client";
import MockEmbed from '@/components/ui/messages/mock-embed';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { APIEmbed } from 'discord-api-types/v10';
import { BsChatLeftDots, BsEye, BsMegaphone, BsPerson, BsPersonVcard, BsPlus, BsTag, BsTextCenter, BsTextLeft, BsX } from 'react-icons/bs';
import Channels from '@/components/ui/select/channels';
import Roles from '@/components/ui/select/roles';
import EmbedSettings from '@/components/ui/messages/embed-settings';
import { ReactionRoleTypes } from '@/lib/types/ReactionRoleTypes';
import EmojiPicker from '@/components/ui/emojis/emoji-picker';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select/select';
import { TextareaMessage } from '@/components/ui/messages/textarea-message';
import { Button } from '@/components/ui/button/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog/dialog';

type ReactionRoleBody = { message: string; title: string; channel: string; reactions: { emoji: string; roleID: string; }[]; embed: APIEmbed; type: ReactionRoleTypes; }
export default function CreateReactionRole({ serverID }: { serverID: string }) {
    const { register, watch, control, handleSubmit, reset } = useForm<ReactionRoleBody>({ defaultValues: {
        message: "", title: "", channel: "", reactions: [], embed: { fields: [] }, type: "DEFAULT"
    
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
        body.append('type', data.type ?? '')
        if (data.embed.author?.name || data.embed.description || data.embed.title || data.embed.footer?.text || (data.embed.fields?.length || 0) > 0) {
            body.append('embed', JSON.stringify(data.embed));
        }
        fetch(`/api/v1/servers/${serverID}/reaction_roles`, { method: 'POST', body }).then(async (data) => {
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
    const embed = watch("embed");
    return <>
    <div className={"row-span-1 flex-1 flex-grow shadow-2xl border-2 border-gray-800 rounded-2xl w-full max-md:mx-auto"}>
    <h2 className={"secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Create Reaction Role</h2>
    <p className={"text-gray-400 font-open-sans md:ml-4 max-md:w-full max-md:text-center text-base italic"}><span className={"text-red-500"}>*</span> = required field</p>
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-2 md:m-5 my-5 p-1"}>
        <span className={"flex flex-row max-xl:flex-col gap-2 items-center font-open-sans"}>
            <span className={"flex flex-row gap-2 items-center text-xl"}><span className={"text-red-500"}>*</span> <BsMegaphone/> Channel:</span> 
            <Controller name={'channel'} control={control} render={({ field }) => (
                <Channels required serverID={serverID} value={field.value} onChange={(e) => field.onChange(e.channel)}  />
        )}></Controller>
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
                    <SelectItem value={'BUTTON'}>Discord Button</SelectItem>
                    <SelectItem value={'BUTTON_SELECT_ONE'}>Discord Button (Select One)</SelectItem>
                    <SelectItem value={'SELECT_MENU'}>Select Menu</SelectItem>
                    <SelectItem value={'SELECT_ONE_MENU'}>Select Menu (Select One)</SelectItem>
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
        <label className={"flex flex-col gap-2 max-md:items-center font-lato text-xl"}>
            <span className={"flex flex-row gap-2 items-center"}><BsChatLeftDots/> Message:</span>
            <Controller name={'message'} control={control} render={({ field }) => {
                return  <TextareaMessage serverID={serverID} wrapperClass={'w-full'} value={field.value} onChange={field.onChange} maxLength={2000}/>;
            }}/>
        </label>
        <section className={'flex justify-between gap-2 items-center max-md:flex-col'}>
        <Dialog>
        <DialogTrigger asChild>
            <Button className={'w-fit gap-2 my-2'} variant={'secondary'}><BsTextLeft/> Edit Embed</Button>
        </DialogTrigger>
        <DialogContent className={'max-h-[98vh] overflow-y-scroll'}>
        <Controller name={'embed'} control={control} render={({ field }) => {
            return <EmbedSettings  serverID={serverID} control={control} addField={append} register={register} removeField={remove} value={({...field.value, fields})} />;
        }}/>
        </DialogContent>
        </Dialog>

        <Button variant={'outline'} className={`flex flex-row gap-2 items-center`} type="submit">
            <BsPersonVcard/> Create
        </Button>
        </section>
        <span className={'max-md:px-2'}>
        <h1 className={'font-montserrat text-xl flex items-center gap-2 my-2'}><BsEye/> Embed Preview</h1>
        {embed ? <MockEmbed embed={embed}/> : ""}
        </span>
    </form>
    
    </div>
    
    </>;
}