"use client";

import Button from "@/components/Button";
import Image from "next/image";
import { BsHouse } from 'react-icons/bs';
export default function NotFound() {
    return (<section className={"flex-grow flex-1 h-full bg-auxdibot-masthead bg-black flex justify-center items-center align-middle"}>
        <div className={"flex flex-col gap-4 items-center justify-center text-center"}>
            <Image
                src={"/logo.png"}
                alt={"Auxdibot icon."}
                width={216}
                height={216}
                 priority
                />
                <h1 className={"header text-6xl max-md:text-5xl"}>Not Found</h1>
                <p className={"text text-2xl"}>Couldn&apos;t find that page.</p>
                <Button icon={<BsHouse/>} text={"Home"} href={"/"}/>
        </div>
        </section>);
}