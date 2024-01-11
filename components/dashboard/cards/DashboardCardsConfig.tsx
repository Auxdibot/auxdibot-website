"use client";
import { Controller, useForm } from 'react-hook-form';
import { BsCardImage, BsCheck, BsEye, BsX} from 'react-icons/bs';
import { CardData } from '@/lib/types/CardData';
import Link from 'next/link';
import ColorPicker from '@/components/input/ColorPicker';

export default function DashboardCardsConfig({ id }: { id: string }) {
    const { register, handleSubmit, control, getValues } = useForm<CardData>();
    function createLink() {
        const values = getValues();
        window.open(`/dashboard/${id}/cardPreview?bg_color1=${values.background?.color1 ?? '000000'}&bg_color2=${values.background?.color2 ?? '000000'}&bg_gradient=${values.background?.gradient}&description=${values.description?? ""}&dark=${values.dark ?? "false"}`, "_blank", "noreferrer")
    }
    function onSubmit(data: CardData) {
        let body = new URLSearchParams();
        /*
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
        }).catch(() => {})*/
    }

    return (<main className={"bg-gray-950 flex-grow"}>
        <div className={"animate-fadeIn flex max-md:items-center flex-col py-5 md:px-5 gap-5"}>
        <h1 className={"header text-6xl max-md:text-5xl"}>cards</h1>
        <span className={"flex flex-row max-md:flex-col gap-10 w-full"}>
        <div className={"bg-gray-800 flex-1 flex-grow flex-shrink-0 shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Create/Edit Card</h2>

    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-2 md:m-5 my-5"}>
        <Controller control={control} name={'dark'} render={({ field }) => {
                return  <span onClick={() => field.onChange(!field.value)} className={"cursor-pointer flex w-fit gap-4 items-center flex-row justify-center font-open-sans text-lg max-md:mx-auto"}>
                <span className={`text-2xl border rounded-xl p-1 bg-gradient-to-bl ${field.value ? "from-gray-800 to-purple-900" : "from-blue-500 to-gray-50"} border-black select-none text-black transition-all`}>{field.value ? <BsCheck /> : <BsX/>}</span>
                    {field.value ? 'Dark' : 'Light'}
                </span>;
        }}/>
        <Controller control={control} name={"background.color1"} render={({ field }) => {
            return <ColorPicker value={parseInt(field?.value ?? '0', 16)} string onChange={field.onChange}/>
        }}/> 
        <Controller control={control} name={"background.color2"} render={({ field }) => {
        return <ColorPicker value={parseInt(field?.value ?? '0', 16)} string onChange={field.onChange}/>
        }}/>
        <select defaultValue={"background"} className={"w-fit rounded-xl text-lg font-open-sans"} {...register("background.gradient", { required: true })}>
            <option value={'BACKGROUND'}>Background Gradient</option>
            <option value={'LINEAR'}>Linear Gradient</option>
            <option value={'RADIAL'}>Radial Gradient</option>
        </select>
        <button className={`secondary text-xl mx-auto hover-gradient border-white hover:text-black hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`} type="submit">
            <BsCardImage/> Create/Edit Card
        </button>
    </form>
    
    </div>
    <div className={"bg-gray-800 flex-1 flex-grow flex-shrink-0 shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
        <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Card Preview</h2>
        <p className={"text-md font-open-sans text-center p-2"}>You can go to your card preview link by clicking the button down below. This will display a preview version of your Card settings for you to look at and share with other Administrators on your server.</p>
        <span className={`secondary text-xl mx-auto hover-gradient cursor-pointer border-white hover:text-black hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`} onClick={createLink}><BsEye/> Open Preview</span>
    </div>
        </span>
        </div>
        
            
        </main>)
}