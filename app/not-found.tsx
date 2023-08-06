"use client";

import Image from "next/image";
import Link from "next/link";
import { BsHouse } from 'react-icons/bs';
export default function NotFound() {
    return (<section className={"h-screen bg-gray-700 flex justify-center items-center align-middle"}>
        <div className={"flex flex-col gap-4 items-center justify-center"}>
            <Image
                src={"/icon.png"}
                alt={"Auxdibot icon."}
                width={216}
                height={216}
                 priority
                />
                <h1 className={"header text-6xl text-center"}>Not Found</h1>
                <p className={"text text-2xl"}>Couldn&apos;t find that page.</p>
                <Link href={"/"} className={"w-fit px-8 mx-auto rounded-full border-gray-300 border flex gap-2 justify-center secondary items-center my-2 py-2 text-2xl hover:bg-gradient-to-l transition-all hover:text-gray-800 hover:border-gray-800 hover:from-orange-500 hover:to-red-400"}><BsHouse/> Home</Link>
        </div>
        </section>);
}