"use client";

import Button from "@/components/ui/button/primary-button";
import Image from "next/image";
import { BsHouse } from 'react-icons/bs';
export default function Error() {
    return (<section className={"flex-grow bg-auxdibot-masthead bg-black flex justify-center items-center align-middle flex-1 h-screen"}>
        <div className={"flex flex-col gap-4 items-center justify-center text-center"}>
            <Image
                src={"/logo.png"}
                alt={"Auxdibot icon."}
                width={128}
                height={128}
                 priority
                />
                <h1 className={"header text-6xl max-md:text-5xl lowercase"}>Error!</h1>
                <p className={"text text-2xl"}>An error occurred attempting to visit this page.</p>
                <Button icon={<BsHouse/>} text={"Home"} href={"/"}/>
        </div>
        </section>);
}