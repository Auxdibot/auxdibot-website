import { APIEmbed } from "discord-api-types/v10";
import { useEffect, useRef, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { Control, Controller, UseFieldArrayAppend, UseFieldArrayRemove, UseFormRegister } from "react-hook-form";
import { BsImage, BsListTask, BsPerson, BsPlus, BsTextCenter, BsTextarea, BsX } from "react-icons/bs";

interface EmbedSettingsProps {
    readonly value: APIEmbed;
    readonly register: UseFormRegister<any & { embed: APIEmbed }>;
    readonly control: Control<any & { embed: APIEmbed}>;
    readonly addField: UseFieldArrayAppend<any, "embed.fields">;
    readonly removeField: UseFieldArrayRemove;
}
export default function EmbedSettings({ value, register, control, addField, removeField }: EmbedSettingsProps) {
    const [expandedColor, setExpandedColor] = useState(false);
    const colorRef = useRef<HTMLLabelElement | null>(null);
    useEffect(() => {
        const clickedOutside = (e: globalThis.MouseEvent) => {
          if (expandedColor && colorRef.current && !colorRef.current.contains(e.target as Node)) setExpandedColor(false)
          
        }
        document.addEventListener("mousedown", clickedOutside)
        return () => document.removeEventListener("mousedown", clickedOutside);
      }, [expandedColor]);
    return (<div>
        <section className={"my-5 flex flex-col gap-2"}>
        <label ref={colorRef} className={"flex flex-row max-md:mx-auto gap-2 items-center font-open-sans text-xl relative"}>
        <span className={"flex flex-col relative items-center"}>
        <span className={"secondary text-xl text-gray-300 flex flex-row max-md:flex-col items-center max-md:justify-center gap-2 my-3"}>
            
            <Controller control={control} name={"embed.color"} render={({ field }) => {

                return <>
                <span className={"border text-white rounded-2xl w-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-lg cursor-pointer"} onClick={() => setExpandedColor(!expandedColor)}>
                <div className={"h-6 w-12 rounded-2xl shadow-2xl border border-white"} style={{ backgroundColor: field.value ? `#${field.value.toString(16)}` : "black" }}></div>
                </span> Set Color
                <HexColorInput color={field.value?.toString(16)} className={"text-md rounded-xl w-fit px-1"}  onChange={(newColor) => field.onChange(parseInt(newColor.replace("#", ""), 16))}/>
                </>
            }}/>
            
        </span>
        {expandedColor ? 
        <Controller control={control} name={"embed.color"} render={({ field }) => {
            return <HexColorPicker  className={`md:absolute touch-none animate-colorPicker`} color={field.value?.toString(16)} onChange={(newColor) => field.onChange(parseInt(newColor.replace("#", ""), 16))}/>
        }}/> : ""}
        </span>
       
        </label> 
        <span className={"text text-gray-500 italic text-sm max-md:text-center"}>(leave empty for no color)</span>
        <span className={"flex flex-row gap-2 items-center font-open-sans text-xl"}><BsPerson/> Author</span>
        <span className={"grid w-full grid-cols-3 gap-3"}>
        <input placeholder='Author Name' className={"placeholder:text-gray-500 px-1 rounded-md font-roboto text-md"} maxLength={256} type="text" {...register("embed.author.name", { maxLength: 256 })}/>
        <input placeholder='Author URL' className={"placeholder:text-gray-500 px-1 rounded-md font-roboto text-md"} type="url" {...register("embed.author.url")}/>
        <input placeholder='Author Icon URL' className={"placeholder:text-gray-500 px-1 rounded-md font-roboto text-md"} type="url" {...register("embed.author.icon_url")}/>
        </span>
        
        <span className={"flex flex-row gap-2 items-center font-open-sans text-xl"}><BsTextCenter/> Title</span>
        <span className={"grid w-full grid-cols-3 gap-3"}>
        <input placeholder='Embed Title' className={"placeholder:text-gray-500 px-1 rounded-md font-roboto text-md"} maxLength={256} type="text" {...register("embed.title", { maxLength: 256 })}/>
        <input placeholder='Embed URL' className={"placeholder:text-gray-500 px-1 rounded-md font-roboto text-md"} type="url" {...register("embed.url")}/>
        <input placeholder='Embed Thumbnail URL' className={"placeholder:text-gray-500 px-1 rounded-md font-roboto text-md"} type="url" {...register("embed.thumbnail.url")}/>
        </span>
        <textarea placeholder='Embed description here...' className={"placeholder:text-gray-500 px-1 rounded-md font-roboto text-md"} maxLength={4096} {...register("embed.description", { maxLength: 4096 })}/>
        <span className={"flex flex-row gap-2 items-center font-open-sans text-xl"}><BsListTask/> Fields</span>
        <span className={"secondary text-xl text-gray-300 flex flex-row items-center gap-2 my-3"}><span className={"border text-white rounded-2xl w-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-lg cursor-pointer"} onClick={() => (value?.fields?.length || 0) < 25 ? addField({ name: "", value: "" }, { shouldFocus: false }) : {}}><BsPlus/></span> Add Field</span>
        <ul className={"flex flex-col gap-2 my-3"}>
            {value?.fields?.map((_item, index) => <li key={index} className={"flex flex-col gap-2"}>
                <input className={"placeholder:text-gray-500 px-1 rounded-md font-roboto text-md w-fit mx-auto"} placeholder='Field Name' maxLength={256} type="text" {...register(`embed.fields.${index}.name`, { maxLength: 256 })}/>
                <textarea className={"placeholder:text-gray-500 px-1 rounded-md font-roboto text-md"} placeholder='Field content here...' maxLength={1024} {...register(`embed.fields.${index}.value`, { maxLength: 1024 })}/>
                <label className={"mx-auto text-md font-roboto flex flex-row gap-2 items-center"}>Inline? <input type="checkbox" {...register(`embed.fields.${index}.inline`)}/></label>
                <span className={"border text-white rounded-2xl w-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-lg cursor-pointer mx-auto"} onClick={() => removeField(index)}><BsX/></span>
            </li>) || ""}
        </ul>
        
        <span className={"flex flex-row gap-2 items-center font-open-sans text-xl"}><BsTextarea/> Footer</span>
        <span className={"grid w-full grid-cols-3 gap-3"}>
        <input placeholder='Footer text' className={"placeholder:text-gray-500 px-1 rounded-md font-roboto text-md col-span-2"} type="text" {...register("embed.footer.text", { maxLength: 2048 })}/>
        <input placeholder='Footer icon URL' className={"placeholder:text-gray-500 px-1 rounded-md font-roboto text-md"} type="url" {...register("embed.footer.icon_url")}/>
        </span>
        <label className={"flex flex-row max-md:flex-col gap-2 items-center font-open-sans text-xl my-5"}>
            <span className={"flex flex-row gap-2 items-center"}><BsImage/> Embed Image:</span>
            <input className={"placeholder:text-gray-500 px-1 rounded-md font-roboto text-md col-span-2"} type="url" {...register("embed.image.url")}/>
        </label>
        </section>
    </div>)
}