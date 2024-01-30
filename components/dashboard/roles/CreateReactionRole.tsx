"use client";
import MockEmbed from '@/components/MockEmbed';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useContext, useState } from 'react';
import { APIEmbed } from 'discord-api-types/v10';
import { BsChatLeftDots, BsMegaphone, BsPerson, BsPersonVcard, BsPlus, BsTag, BsTextCenter, BsTextLeft, BsX } from 'react-icons/bs';
import DashboardActionContext from '@/context/DashboardActionContext';
import Channels from '@/components/input/Channels';
import TextBox from '@/components/input/TextBox';
import Roles from '@/components/input/Roles';
import EmbedSettings from '@/components/input/EmbedSettings';
import { ReactionRoleTypes } from '@/lib/types/ReactionRoleTypes';
import EmojiPicker from '@/components/input/EmojiPicker';

type ReactionRoleBody = { message: string; title: string; channel: string; reactions: { emoji: string; roleID: string; }[]; embed: APIEmbed; type: ReactionRoleTypes; }
export default function CreateReactionRole({ serverID }: { serverID: string }) {
    const { register, watch, control, handleSubmit, reset } = useForm<ReactionRoleBody>();
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
    const [embedExpand, setEmbedExpand] = useState(false);
    const actionContext = useContext(DashboardActionContext);
    const queryClient = useQueryClient();
    function onSubmit(data: ReactionRoleBody) {
        let body = new URLSearchParams();
        body.append('channel', data.channel);
        body.append('reactions', JSON.stringify(data.reactions.map((i) => ({ emoji: i.emoji, roleID: i.roleID }))));
        body.append('message', data.message);
        body.append('title', data.title);
        body.append('type', data.type ?? '')
        if (data.embed.author?.name || data.embed.description || data.embed.title || data.embed.footer?.text || (data.embed.fields?.length || 0) > 0) {
            body.append('embed', JSON.stringify(data.embed));
        }
        fetch(`/api/v1/servers/${serverID}/reaction_roles`, { method: 'POST', body }).then(async (data) => {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            if (json && !json['error']) {
                if (actionContext)
                    actionContext.setAction({ status: `Successfully created a new reaction role.`, success: true })
                reset();
                removeReaction(fields.length);
                queryClient.invalidateQueries(["data_reaction_roles", serverID]);
                removeReaction(reactions.length);
            } else {
                if (actionContext)
                    actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false });
            }
        }).catch(() => {})
    }
    const embed = watch("embed");
    return <>
    <div className={"row-span-2 bg-gray-800 flex-1 flex-grow shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Create Reaction Role</h2>
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-2 md:m-5 my-5 p-1"}>
        <span className={"flex flex-row max-md:flex-col gap-2 items-center font-open-sans"}>
            <span className={"flex flex-row gap-2 items-center text-xl"}><span className={"text-red-500"}>*</span> <BsMegaphone/> Channel:</span> 
            <Controller name={'channel'} control={control} render={({ field }) => (
                <Channels serverID={serverID} value={field.value} onChange={(e) => field.onChange(e.channel)}  />
        )}/>
        </span>
        <label className={"flex flex-row max-xl:flex-col gap-2 items-center font-lato text-xl"}>
            <span className={"flex flex-row gap-2 items-center"}><span className={"text-red-500"}>*</span> <BsTag/> Type:</span> 
            <select className={"rounded-md font-roboto w-fit text-lg"} {...register("type", { required: true })}>
            <option value={'DEFAULT'}>Default</option>
            <option value={'SELECT_ONE'}>Select One</option>
            <option value={'STICKY'}>Sticky</option>
            <option value={'STICKY_SELECT_ONE'}>Sticky (Select One)</option>
            <option value={'BUTTON'}>Discord Button</option>
            <option value={'BUTTON_SELECT_ONE'}>Discord Button (Select One)</option>
            <option value={'SELECT_MENU'}>Select Menu</option>
            <option value={'SELECT_ONE_MENU'}>Select Menu (Select One)</option>
        </select></label>
        <label className={"flex flex-row max-xl:flex-col gap-2 items-center"}>
            <span className={"flex flex-row gap-2 items-center font-open-sans text-xl"}><BsTextCenter/> Title:</span> 
            <Controller control={control} name={'title'} render={({ field }) => {
                return <TextBox Icon={BsTextCenter} value={field.value} onChange={(e) => field.onChange(e.currentTarget.value)}/>;
            }}/>
        </label>
        
        <span className={"flex flex-row gap-2 items-center text-2xl mx-auto secondary my-5"}><BsPerson/> Roles</span>
        <span className={"secondary text-xl text-gray-300 flex flex-row items-center gap-2 my-3 mx-auto"}><span className={"border text-white rounded-2xl w-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-lg cursor-pointer"} onClick={() => reactions.length < 10 ? appendReaction({ name: "", value: "" }, { shouldFocus: false }) : {}}><BsPlus/></span> Add Role</span>
        <div className={"flex flex-col gap-4"}>
        {reactions.map((item, index) => <li key={item.id} className={"flex flex-col gap-2 items-center"}>
                <Controller name={`reactions.${index}.emoji`} control={control} render={({ field }) => {
                    return <EmojiPicker serverID={serverID  } value={field.value} onChange={(e) => field.onChange(e.emoji)} />
                } }/>
                <Controller control={control} name={`reactions.${index}.roleID`} render={({ field }) => {
                return <Roles serverID={serverID} onChange={(e) => field.onChange(e.role)} value={field.value}/>;
                }}/>
                <span className={"border text-white rounded-2xl w-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-lg cursor-pointer mx-auto"} onClick={() => removeReaction(index)}><BsX/></span>
            </li>)}
        </div>
        <label className={"flex flex-col gap-2 max-md:items-center font-lato text-xl"}>
            <span className={"flex flex-row gap-2 items-center"}><BsChatLeftDots/> Message:</span>
            <textarea className={"rounded-md font-roboto text-lg w-full"} cols={2} {...register("message")}/>
        </label>
        
        <span className={"flex flex-row gap-2 items-center mx-auto font-lato text-xl"}><BsTextLeft/> Embed Settings</span>
        <span className={"text text-gray-500 italic text-sm text-center"}>(leave empty for default reaction embed)</span>
        <Controller name={'embed'} control={control} render={({ field }) => {
                return <EmbedSettings control={control} addField={append} register={register} removeField={remove} value={field.value} />
        }}></Controller>
        <span className={"secondary text-xl text-gray-300 flex flex-row items-center gap-2 max-md:mx-auto"}><span className={"border text-white rounded-2xl w-fit p-2 hover-gradient transition-all hover:text-black hover:border-black text-xl cursor-pointer"} onClick={() => setEmbedExpand(!embedExpand)}><BsChatLeftDots/></span> View Embed</span>
        <span className={embedExpand ? "" : "hidden"}>
        {embed ? <MockEmbed embed={embed}/> : ""}
        </span>
        <button className={`secondary text-xl mx-auto hover-gradient border-white hover:text-black hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`} type="submit">
            <BsPersonVcard/> Create Reaction Role
        </button>
    </form>
    
    </div>
    </>;
}