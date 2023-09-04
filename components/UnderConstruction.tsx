"use client";

import Button from "@/components/Button";
import Image from "next/image";
import { BsHouse } from 'react-icons/bs';
export default function UnderConstruction() {
    return (<section className={"flex-grow flex-1 h-full bg-gray-700 flex justify-center items-center align-middle"}>
        <div className={"flex flex-col gap-4 items-center justify-center text-center"}>
            <Image
                src={"/icon.png"}
                alt={"Auxdibot icon."}
                width={216}
                height={216}
                 priority
                />
                <h1 className={"header text-6xl max-md:text-5xl"}>Under Construction</h1>
                <p className={"text text-2xl"}>This part of the website is still being worked on! Check back later.</p>
                <Button icon={<BsHouse/>} text={"Home"} href={"/"}/>
        </div>
        </section>);
}