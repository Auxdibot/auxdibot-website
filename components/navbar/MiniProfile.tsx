"use client";

import Image from "next/image";
import { BsArrowDownShort, BsListTask, BsShield } from "react-icons/bs";
import { useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa'
import { BsArrowLeftCircle } from "react-icons/bs";
export default function MiniProfile(props: React.ComponentProps<any>) {
    const [expanded, setExpanded] = useState(false);

    function expand(e: React.MouseEvent<HTMLSpanElement>) {
        setExpanded(!expanded)
    }
    return (<div {...props}>
        <Image
            src={"/icon.png"}
            alt={"Auxdibot icon."}
            className={"inline-block align-middle"}
            width={32}
            height={32}
            priority
            />
        <span className={"flex group flex-row gap-2 items-center text-gray-200 font-roboto text-md cursor-pointer"} onClick={(e) => expand(e)}>
        <span className={"max-md:hidden"}>auxdibot</span>
        <BsArrowDownShort className={"group-hover:translate-y-1 transition-transform"}/>
        </span>
        <div className={`absolute ${expanded ? "" : "hidden"} top-14 -translate-x-4 z-10 max-md:-translate-x-8 bg-gray-500 border border-gray-500 rounded-xl`}>
            <h1 className={"secondary bg-gray-600 p-4 rounded-t-xl flex flex-row gap-2 items-center"}><BsShield/> Account</h1>
            <ul className={"flex flex-col gap-2 p-4"}>
            <span className={"flex flex-row gap-2 items-center font-roboto text-black hover:text-gray-700 transition-colors group cursor-pointer"}><span className={"bg-gray-600 p-1 rounded-lg text-black group-hover:text-orange-500 bg-opacity-50 transition-all"}><BsListTask/></span>Servers</span>
                <span className={"flex flex-row gap-2 items-center font-roboto text-black hover:text-gray-700 transition-colors group cursor-pointer"}><span className={"bg-gray-600 p-1 rounded-lg text-black group-hover:text-orange-500 bg-opacity-50 transition-all"}><BsArrowLeftCircle/></span>Sign out</span>
            </ul>
        </div>
    </div>)
}