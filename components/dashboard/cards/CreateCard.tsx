"use client";
import { Controller, UseFormReturn, useFieldArray } from 'react-hook-form';
import { BsCardImage, BsMoonStars, BsPlus, BsSun, BsX } from 'react-icons/bs';
import ColorPicker from '@/components/ui/color-picker';
import { CardFonts } from '@/lib/constants/CardFonts';
import { CardFont } from '@/lib/types/CardFont';
import Channels from '@/components/ui/select/channels';
import { useQueryClient } from 'react-query';
import { GradientTemplates } from '@/lib/constants/GradientTemplates';
import { CardGradients } from '@/lib/types/CardGradients';
import { testInvite } from '@/lib/testInvite';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { CardBody } from './CardBody';

export function CreateCard({ id, form: { control, watch, handleSubmit } }: { id: string; form: UseFormReturn<CardBody, any, undefined>; }) {

    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { fields: rules, append, remove } = useFieldArray({
        name: "rulesField",
        control,
        rules: {
            maxLength: 25
        }
    });

    function onSubmit(data: CardBody) {
        let body = new URLSearchParams();
        body.append('bg_color1', data?.background?.color1 || "");
        body.append('bg_color2', data?.background?.color2 || "");
        body.append('bg_gradient', data?.background?.gradient?.toString() || "");
        body.append('dark', data?.dark?.toString() || "");
        body.append('description', data?.description || "");
        data?.rulesField.forEach((i) => body.append('rules', i.rule || ""));
        body.append('channelID', data?.channelID || "");
        body.append('header_font', data?.header_font?.toString() || "");
        body.append('text_font', data?.text_font?.toString() || "");
        body.append('invite_url', data?.invite_url?.toString() || "");
        fetch(`/api/v1/servers/${id}/updateCard`, { method: 'POST', body }).then(async (data) => {
            const json = await data.json().catch(() => undefined);
            if (!json || json['error']) {
                toast({ title: 'Failed to update card', description: json?.error ?? 'An error occurred while updating the card.', status: 'error' });
                return;
            }
            toast({ title: 'Updated Card', description: `Your card has been updated.`, status: 'success' });
            queryClient.invalidateQueries([id, 'card']);
        }).catch(() => { });
    }
    const text = watch('text_font'), color1 = watch('background.color1'), color2 = watch('background.color2'), gradient = watch('background.gradient'), dark = watch('dark');

    return <div className={"shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
        <h2 className={"secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Create/Edit Card</h2>

        <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-2 md:m-5 my-5"}>
            <h3 className={"font-montserrat text-2xl mx-auto"}>Card Theme</h3>
            <section className={"flex max-md:flex-col max-md:gap-8 max-md:my-2 md:justify-between max-md:items-center"}>
                <span className={"flex flex-col items-center flex-1 justify-between"}>
                    <label className={"font-montserrat text-xl"}>Card Scheme</label>
                    <Controller control={control} name={'dark'} render={({ field }) => {
                        return <span onClick={() => field.onChange(!field.value)} className={"cursor-pointer flex w-fit gap-4 items-center flex-row justify-center font-open-sans text-lg max-md:mx-auto"}>
                            <span className={`text-2xl border rounded-xl p-1 bg-gradient-to-bl ${field.value ? "from-gray-800 to-purple-900 text-white" : "from-blue-500 to-gray-50 text-black"} border-black select-none transition-all`}>{field.value ? <BsMoonStars /> : <BsSun />}</span>
                            {field.value ? 'Dark' : 'Light'}
                        </span>;
                    }} />
                </span>
                <span className={"flex flex-col items-center flex-1 justify-between"}>
                    <label className={"font-montserrat text-xl"}>Card Gradient</label>
                    <span className={"flex gap-2"}>
                        <Controller name='background.gradient' control={control} render={({ field }) => {
                            return <Select value={field.value?.toString()} onValueChange={field.onChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder={'Select a gradient'} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={'BACKGROUND'}>Background Gradient</SelectItem>
                                    <SelectItem value={'LINEAR'}>Linear Gradient</SelectItem>
                                    <SelectItem value={'RADIAL'}>Radial Gradient</SelectItem>
                                </SelectContent>
                            </Select>;
                        }} />


                    </span>
                </span>
            </section>
            <section className={"flex h-full flex-row md:justify-between max-md:flex-col gap-2 my-5"}>
                <div className={"flex flex-col h-fit flex-1 items-center"}>
                    <label className={"text-xl font-montserrat"}>Primary Color</label>
                    <Controller control={control} name={"background.color1"} render={({ field }) => {
                        return <ColorPicker value={field?.value ?? ''} string onChange={field.onChange} />;
                    }} />
                </div>
                <div className={"flex flex-col h-fit flex-1 justify-center items-center"}>
                    <label className={"text-xl font-montserrat"}>Secondary Color</label>
                    <Controller control={control} name={"background.color2"} render={({ field }) => {
                        return <ColorPicker value={field?.value ?? ''} string onChange={field.onChange} />;
                    }} />
                </div>
            </section>
            <h3 className={"font-montserrat text-2xl mx-auto"}>Gradient Preview</h3>
            <section className={"px-2"}>
                <div className={`h-56 w-full ${dark ? "bg-black" : "bg-white"} rounded-md border border-gray-800`} style={{ backgroundImage: (GradientTemplates[gradient ?? CardGradients.BACKGROUND] ?? GradientTemplates['BACKGROUND'])('#' + (color1 ?? '000000'), '#' + (color2 ?? '000000')) }} />
            </section>

            <h3 className={"font-montserrat text-2xl mx-auto"}>Card Text</h3>
            <span className={"flex h-full flex-row md:justify-between max-md:flex-col max-md:gap-8 max-md:my-2 gap-2"}>
                <div className={"flex flex-col h-fit flex-1 items-center"}>
                    <label className={"text-xl font-montserrat"}>Header Font</label>
                    <Controller name='header_font' control={control} render={({ field }) => {
                        return <><Select value={field.value?.toString()} onValueChange={field.onChange}>
                            <SelectTrigger className={`font-${CardFonts[field.value as CardFont]} w-fit`}>
                                <SelectValue placeholder={'Select a gradient'} />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(CardFonts).map((i) => <SelectItem value={i} key={i} className={`font-${CardFonts[i as CardFont]}`}>{i.split('_').map((i) => i[0].toLocaleUpperCase() + i.slice(1).toLocaleLowerCase()).join(' ')}</SelectItem>)}
                            </SelectContent>
                        </Select>
                            <h1 className={`font-${CardFonts[field.value as CardFont]} text-center text-4xl border p-2 rounded-2xl border-gray-800 my-5`}>Preview Text</h1>
                        </>;
                    }} />

                </div>
                <div className={"flex flex-col h-fit flex-1 justify-center items-center"}>
                    <label className={"text-xl font-montserrat text-left"}>Text Font</label>
                    <Controller name='text_font' control={control} render={({ field }) => {
                        return <><Select value={field.value?.toString()} onValueChange={field.onChange}>
                            <SelectTrigger className={`font-${CardFonts[field.value as CardFont]} w-fit`}>
                                <SelectValue placeholder={'Select a gradient'} />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(CardFonts).map((i) => <SelectItem value={i} key={i} className={`font-${CardFonts[i as CardFont]}`}>{i.split('_').map((i) => i[0].toLocaleUpperCase() + i.slice(1).toLocaleLowerCase()).join(' ')}</SelectItem>)}
                            </SelectContent>
                        </Select>
                            <h1 className={`font-${CardFonts[field.value as CardFont]} text-center text-4xl border p-2 rounded-2xl border-gray-800 my-5`}>Preview Text</h1>
                        </>;
                    }} />
                </div>
            </span>


            <label className={"text-xl font-montserrat"}>Card Description</label>
            <Controller control={control} name={'description'} render={({ field }) => {
                return <>
                    <Textarea value={field.value} onChange={field.onChange} className={`font-${CardFonts[text as CardFont] ?? 'open-sans'} rounded-xl p-1 min-h-[100px] max-h-[200px]`} maxLength={500} required={false} />
                    <span className={"text-left w-full text-gray-400 pl-2 font-open-sans text-xs"}>{field.value?.length || 0}/500</span>
                </>;
            }} />

            <span className={"flex h-full flex-row md:justify-between max-md:flex-col gap-2"}>
                <div className={"flex flex-col h-fit max-md:gap-2 flex-1 items-center"}>
                    <label className={"text-xl font-montserrat"}>Featured Channel</label>
                    <Controller control={control} name={"channelID"} render={({ field }) => {
                        return <Channels serverID={id} value={field.value} onChange={(e) => field.onChange(e.channel)} />;
                    }} />
                </div>
                <div className={"flex flex-col h-fit flex-1 justify-center items-center max-md:gap-2"}>
                    <label className={"text-xl font-montserrat"}>Invite URL</label>
                    <Controller name={`invite_url`} control={control} render={({ field }) => {
                        const tested = testInvite(field.value ?? '');
                        return <span className={`w-fit ${tested ? 'text-green-500' : (field.value?.length || 0) > 10 ? 'text-red-500' : ''}`}><Input className={"w-56 text-sm"} maxLength={60} value={field.value} onChange={(e) => field.onChange(e.currentTarget.value)} /></span>;
                    }} />
                </div>
            </span>


            <label className={"text-xl font-montserrat mx-auto"}>Server Rules</label>
            <span className={"secondary text-xl text-gray-300 flex flex-row items-center gap-2 my-3 mx-auto"}><span className={"border text-white rounded-2xl w-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-lg cursor-pointer"} onClick={() => rules.length < 10 ? append({ rule: '' }, { shouldFocus: false }) : {}}><BsPlus /></span> Add Rule</span>
            <div className={"flex flex-col gap-4"}>
                {rules.map((item, index) => <li key={item.id} className={"flex w-fit mx-auto gap-2 items-center"}>
                    <Controller name={`rulesField.${index}.rule`} control={control} render={({ field }) => {
                        return <span className={"flex items-center gap-2"}><span className={'text-xl font-bold'}>#{index + 1}</span> <Input value={field.value} maxLength={40} onChange={(e) => field.onChange(e.currentTarget.value)} /></span>;
                    }} />
                    <span className={"border text-white rounded-2xl w-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-lg cursor-pointer mx-auto"} onClick={() => remove(index)}><BsX /></span>
                </li>)}
            </div>
            <Button className={`flex flex-row gap-2 items-center w-fit mx-auto my-5`} variant={'default'} type="submit">
                <BsCardImage /> Create/Edit Card
            </Button>
        </form>

    </div>;
}
