"use client";

import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import { BsHouse } from 'react-icons/bs';
export default function Error() {
    return (<section className={"flex-grow bg-gray-700 flex justify-center items-center align-middle"}>
        <div className={"flex flex-col gap-4 items-center justify-center"}>
            <Image
                src={"/icon.png"}
                alt={"Auxdibot icon."}
                width={216}
                height={216}
                 priority
                />
                <h1 className={"header text-6xl text-center"}>Error!</h1>
                <p className={"text text-2xl"}>An error occurred attempting to visit this page.</p>
                <Button icon={<BsHouse/>} text={"Home"} href={"/"}/>
        </div>
        </section>);
}