import { APIEmbed } from "discord-api-types/v10";
import { Control, Controller, UseFieldArrayAppend, UseFieldArrayRemove, UseFormRegister } from "react-hook-form";
import { BsEyedropper, BsImage, BsListTask, BsPerson, BsPlus, BsTextCenter, BsTextLeft, BsTextarea, BsTrash } from "react-icons/bs";
import ColorPicker from "../color-picker";
import { Input } from "../input";
import { TextareaMessage } from "./textarea-message";
import { Checkbox } from "../checkbox";
import { Button } from "../button/button";

export interface EmbedSettingsProps {
    readonly value: APIEmbed;
    readonly register: UseFormRegister<any & { embed: APIEmbed }>;
    readonly control: Control<any & { embed: APIEmbed}>;
    readonly addField: UseFieldArrayAppend<any, "embed.fields">;
    readonly removeField: UseFieldArrayRemove;
    readonly serverID?: string;
    readonly placeholderContext?: string | string[];
}
export default function EmbedSettings({ value, register, control, addField, removeField, serverID, placeholderContext }: EmbedSettingsProps) {
    
    return (<div className={'max-md:px-2'}>
        <h1 className={'font-montserrat text-2xl flex items-center gap-2'}><BsTextLeft/> Embed Settings</h1>
        <section className={"my-5 flex flex-col gap-2"}>

<span className={"flex flex-row gap-2 items-center font-montserrat text-xl"}><BsPerson/> Author</span>
<span className={"grid w-full max-sm:grid-rows-3 sm:grid-cols-3 gap-3"}>
<Input placeholder='Author Name' maxLength={256} type="text" {...register("embed.author.name", { maxLength: 256 })}/>
<Input placeholder='Author URL' type="url" {...register("embed.author.url")}/>
<Input placeholder='Author Icon URL' type="url" {...register("embed.author.icon_url")}/>
</span>

<span className={"flex flex-row gap-2 items-center font-montserrat text-xl"}><BsTextCenter/> Title</span>
<span className={"grid w-full max-sm:grid-rows-3 sm:grid-cols-3 gap-3"}>
<Input placeholder='Embed Title' maxLength={256} type="text" {...register("embed.title", { maxLength: 256 })}/>
<Input placeholder='Embed URL' type="url" {...register("embed.url")}/>
<Input placeholder='Embed Thumbnail URL' type="url" {...register("embed.thumbnail.url")}/>
</span>
<Controller control={control} name={"embed.description"} render={({ field }) => {
    return <TextareaMessage placeholderContext={placeholderContext} serverID={serverID} placeholder='Embed description here...' className={"font-open-sans text-sm"} maxLength={4096} {...field}/>
}
}/>
<span className={"flex flex-row gap-2 items-center font-montserrat text-xl"}><BsListTask/> Fields</span>
<span className={"secondary text-xl text-gray-300 flex flex-row items-center gap-2 my-3 justify-center"}><span className={"border text-white rounded-2xl w-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-lg cursor-pointer"} onClick={() => (value?.fields?.length || 0) < 25 ? addField({ name: "", value: "" }, { shouldFocus: false }) : {}}><BsPlus/></span> Add Field</span>
<ul className={"flex flex-col gap-2 my-3"}>
    {value?.fields?.map((_item, index) => <li key={index} className={"flex flex-col gap-2"}>
        <h3 className={'font-montserrat mx-auto'}>Field #{index+1}</h3>
        <span className={'w-fit mx-auto flex gap-5'}>
            <Button className={'gap-1'} type="button" onClick={() => removeField(index)} variant={'destructive'}><BsTrash/> Delete</Button>
            <label className={"text-md justify-center font-open-sans flex flex-row gap-2 items-center flex-1"}>Inline? 
        <Controller name={`embed.fields.${index}.inline`} control={control} render={({ field }) => {
            return <Checkbox onCheckedChange={(e) => field.onChange(!!e.valueOf())} value={field.value}/>
        }}/>
        </label>
        </span>
        <Input placeholder='Field Name' maxLength={256} type="text" className={'flex-1 min-w-[200px] w-fit mx-auto'} {...register(`embed.fields.${index}.name`, { maxLength: 256 })}/>    
        <Controller control={control} name={`embed.fields.${index}.value`} render={({ field }) => {
    return <TextareaMessage placeholderContext={placeholderContext} serverID={serverID} placeholder='Embed field description here...' className={"font-open-sans text-sm"} maxLength={1024} {...field}/>
     }
        }/>
    </li>) || ""}
</ul>

<span className={"flex flex-row gap-2 items-center font-montserrat text-xl"}><BsTextarea/> Footer</span>
<span className={"grid w-full max-sm:grid-rows-3 sm:grid-cols-3 gap-3"}>
<Input placeholder='Footer text' type="text" className={'sm:col-span-2'} maxLength={2048} {...register("embed.footer.text", { maxLength: 2048 })}/>
<Input placeholder='Footer Icon URL' type="url" {...register("embed.footer.icon_url")}/>
</span>
<span className={"flex max-md:flex-col max-md:gap-5 w-full justify-center mx-auto max-w-2xl my-5"}>
<section className={"flex flex-col self-stretch justify-between items-center gap-2 font-montserrat text-xl flex-1 mx-auto"}>
    <label className={"flex flex-row gap-2 text-lg items-center"}><BsImage/> Embed Image:</label>
    <Input type="url" {...register("embed.image.url")}/>
</section>
<section className={'flex-1 flex items-center  flex-col'}>
<label className={"flex gap-2 items-center font-montserrat text-lg text-left"}><BsEyedropper/> Embed Color:</label>
<span className={"max-md:mx-auto self-center"}><Controller control={control} name={"embed.color"} render={({ field }) => {
return <ColorPicker value={field.value?.toString(16).padStart(6, '0')} onChange={field.onChange}/>
}}/> </span>
</section>

</span>


</section>
</div>)
}