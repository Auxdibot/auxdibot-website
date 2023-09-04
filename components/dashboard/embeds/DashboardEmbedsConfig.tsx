"use client";
import MockEmbed from '@/components/MockEmbed';
import { useFieldArray, useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from 'react-query';
import { useContext, useState } from 'react';
import { APIEmbed } from 'discord-api-types/v10';
import { BsBroadcast, BsChatLeftDots, BsImage, BsListTask, BsMegaphone, BsPencil, BsPerson, BsPlus, BsTextCenter, BsTextLeft, BsTextarea, BsX } from 'react-icons/bs';
import { SketchPicker } from 'react-color';
import DashboardActionContext from '@/context/DashboardActionContext';

type EmbedBody = { message: string; channel: string; embed: APIEmbed; }
export default function DashboardEmbedsConfig({ id }: { id: string }) {
    let { data: channels } = useQuery(["data_channels", id], async () => await fetch(`/api/v1/servers/${id}/channels`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    const { register, watch, control, handleSubmit, reset, setValue } = useForm<EmbedBody>();
    const { fields, append, remove } = useFieldArray({
        name: "embed.fields",
        control,
        rules: {
            maxLength: 25
        }
    });
    const [expandedColor, setExpandedColor] = useState(false);
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
    const color = watch("embed.color");
    return (<main className={"bg-gray-700 flex-grow"}>
        <div className={"animate-fadeIn flex max-md:items-center flex-col py-5 md:px-5 gap-5"}>
        <h1 className={"header text-6xl max-md:text-5xl"}>Embeds</h1>
        <span className={"flex flex-row max-md:flex-col gap-10"}>
        <div className={"bg-gray-800 flex-1 flex-grow shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Create Embed</h2>
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-2 md:m-5 my-5"}>
        <label className={"flex flex-row max-xl:flex-col gap-2 items-center font-lato text-xl"}>
            <span className={"flex flex-row gap-2 items-center"}><BsMegaphone/> Channel:</span> 
            <select className={"rounded-md font-roboto w-fit text-lg"} {...register("channel", { required: true })}>
            <option value={"null"}>Select a channel...</option>
            {channels?.map((i: { id: string, name: string }) => <option key={i.id} value={i.id}>{i.name}</option>)}
        </select></label>
        <label className={"flex flex-col gap-2 max-md:items-center font-lato text-xl"}>
            <span className={"flex flex-row gap-2 items-center"}><BsChatLeftDots/> Message:</span>
            <textarea className={"rounded-md font-roboto text-lg w-full"} cols={2} {...register("message")}/>
        </label>
        
        <span className={"flex flex-row gap-2 items-center mx-auto font-lato text-xl"}><BsTextLeft/> Embed Settings</span>
        <span className={"text text-gray-500 italic text-sm text-center"}>(leave empty for no embed)</span>
        <section className={"my-5 flex flex-col gap-2"}>
        <label className={"flex flex-row max-md:mx-auto gap-2 items-center font-lato text-xl"}>
            
        <span className={"secondary text-xl text-gray-300 flex flex-row items-center gap-2 my-3 relative"}>
            <span className={"border text-white rounded-2xl w-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-lg cursor-pointer"} onClick={() => setExpandedColor(!expandedColor)}>
            <BsPencil/></span> Set Color</span>
            {expandedColor ? <SketchPicker width='15rem' disableAlpha styles={{ 
                default: {  picker: { backgroundColor: "rgb(209, 213, 219)", color: "white !important", fontFamily: '"Roboto", sans-serif' }, controls: { color: "white" }} 
            }} className={`absolute border-2 border-gray-800 translate-y-48 touch-none max-md:right-1/2 max-md:translate-x-1/2 md:translate-x-4 animate-colorPicker`} color={color?.toString(16) || "ff0000"} onChange={(newColor) => {
                setValue("embed.color", parseInt(newColor.hex.replace("#", ""), 16))
                console.log(parseInt(newColor.hex.replace("#", ""), 16));
            }}/> : ""}
        </label> 
        <span className={"text text-gray-500 italic text-sm max-md:text-center"}>(leave empty for no color)</span>
        <span className={"flex flex-row gap-2 items-center font-lato text-xl"}><BsPerson/> Author</span>
        <span className={"grid w-full grid-cols-3 gap-3"}>
        <input placeholder='Author Name' className={"placeholder:text-gray-500 px-1 rounded-md font-roboto text-md"} maxLength={256} type="text" {...register("embed.author.name", { maxLength: 256 })}/>
        <input placeholder='Author URL' className={"placeholder:text-gray-500 px-1 rounded-md font-roboto text-md"} type="url" {...register("embed.author.url")}/>
        <input placeholder='Author Icon URL' className={"placeholder:text-gray-500 px-1 rounded-md font-roboto text-md"} type="url" {...register("embed.author.icon_url")}/>
        </span>
        
        <span className={"flex flex-row gap-2 items-center font-lato text-xl"}><BsTextCenter/> Title</span>
        <span className={"grid w-full grid-cols-3 gap-3"}>
        <input placeholder='Embed Title' className={"placeholder:text-gray-500 px-1 rounded-md font-roboto text-md"} maxLength={256} type="text" {...register("embed.title", { maxLength: 256 })}/>
        <input placeholder='Embed URL' className={"placeholder:text-gray-500 px-1 rounded-md font-roboto text-md"} type="url" {...register("embed.url")}/>
        <input placeholder='Embed Thumbnail URL' className={"placeholder:text-gray-500 px-1 rounded-md font-roboto text-md"} type="url" {...register("embed.thumbnail.url")}/>
        </span>
        <textarea placeholder='Embed description here...' className={"placeholder:text-gray-500 px-1 rounded-md font-roboto text-md"} maxLength={4096} {...register("embed.description", { maxLength: 4096 })}/>
        <span className={"flex flex-row gap-2 items-center font-lato text-xl"}><BsListTask/> Fields</span>
        <span className={"secondary text-xl text-gray-300 flex flex-row items-center gap-2 my-3"}><span className={"border text-white rounded-2xl w-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-lg cursor-pointer"} onClick={() => fields.length < 25 ? append({ name: "", value: "" }, { shouldFocus: false }) : {}}><BsPlus/></span> Add Field</span>
        <ul className={"flex flex-col gap-2 my-3"}>
            {fields.map((item, index) => <li key={item.id} className={"flex flex-col gap-2"}>
                <input className={"placeholder:text-gray-500 px-1 rounded-md font-roboto text-md w-fit mx-auto"} placeholder='Field Name' maxLength={256} type="text" {...register(`embed.fields.${index}.name`, { maxLength: 256 })}/>
                <textarea className={"placeholder:text-gray-500 px-1 rounded-md font-roboto text-md"} placeholder='Field content here...' maxLength={1024} {...register(`embed.fields.${index}.value`, { maxLength: 1024 })}/>
                <label className={"mx-auto text-md font-roboto flex flex-row gap-2 items-center"}>Inline? <input type="checkbox" {...register(`embed.fields.${index}.inline`)}/></label>
                <span className={"border text-white rounded-2xl w-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-lg cursor-pointer mx-auto"} onClick={() => remove(index)}><BsX/></span>
            </li>)}
        </ul>
        
        <span className={"flex flex-row gap-2 items-center font-lato text-xl"}><BsTextarea/> Footer</span>
        <span className={"grid w-full grid-cols-3 gap-3"}>
        <input placeholder='Footer text' className={"placeholder:text-gray-500 px-1 rounded-md font-roboto text-md col-span-2"} type="text" {...register("embed.footer.text", { maxLength: 2048 })}/>
        <input placeholder='Footer icon URL' className={"placeholder:text-gray-500 px-1 rounded-md font-roboto text-md"} type="url" {...register("embed.footer.icon_url")}/>
        </span>
        <label className={"flex flex-row max-xl:flex-col gap-2 items-center font-lato text-xl my-5"}>
            <span className={"flex flex-row gap-2 items-center"}><BsImage/> Embed Image:</span>
            <input className={"placeholder:text-gray-500 px-1 rounded-md font-roboto text-md col-span-2"} type="url" {...register("embed.image.url")}/>
        </label>
        </section>
        <button className={`secondary text-xl mx-auto hover-gradient border-white hover:text-black hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`} type="submit">
            <BsBroadcast/> Send Embed
        </button>
    </form>
    
    </div>
    <div className={"bg-gray-800 flex-1 flex-grow shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
        <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Embed Preview</h2>
        <span className={"p-5"}>{embed?.author?.name || embed?.description || embed?.title || embed?.footer?.text || (embed?.fields?.length || 0) > 0 ? <MockEmbed embed={embed}/> : ""}</span>
    </div>
        </span>
        </div>
        
            
        </main>)
}