"use client";
import { useForm } from 'react-hook-form';


import { CardPreview } from './CardPreview';
import { CardBody } from './CardBody';
import { CreateCard } from './CreateCard';


export default function DashboardCardsConfig({ id }: { id: string }) {


    const form = useForm<CardBody>();
    
    return (<main className={"bg-gray-950 flex-grow"}>
        <div className={"animate-fadeIn flex max-md:items-center flex-col py-5 md:px-5 gap-5"}>
        <h1 className={"header text-6xl max-md:text-5xl"}>cards</h1>
        <span className={"flex flex-row max-xl:flex-col gap-10 w-full"}>
        <CreateCard form={form} id={id}/>
        <CardPreview id={id} values={form.getValues()} />
        </span>
    </div>
        
            
    </main>)
}

