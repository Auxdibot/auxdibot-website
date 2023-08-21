"use client";

import Image from "next/image";
import { BsArrowDownShort, BsArrowRightCircle, BsDashCircleDotted, BsListTask, BsPersonAdd, BsShield, BsThreeDots } from "react-icons/bs";
import { useState } from 'react';
import useSession from "@/lib/hooks/useSession";
import { BsArrowLeftCircle } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function MiniProfile(props: React.ComponentProps<any>) {
    const [expanded, setExpanded] = useState(false);
    const { user, status } = useSession();
    const router = useRouter();
    function expand(e: React.MouseEvent<HTMLSpanElement>) {
        setExpanded(!expanded)
    }
    if (status == "loading") return (<div {...props}>
        <BsThreeDots className={"animate-spin text-2xl text-white"}/>
    </div>)
    return (<div {...props}>
        {status == "authenticated" && user?.avatar && user?.id ? <Image
            src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
            alt={"Discord profile icon"}
            className={"inline-block align-middle rounded-full"}
            width={32}
            height={32}
            quality="100"
            priority
            /> : <BsPersonAdd className={"text text-3xl align-middle inline-block"}/>}
        
        <span className={"flex group flex-row gap-2 items-center text-gray-200 font-roboto text-md cursor-pointer"} onClick={(e) => expand(e)}>
        <span className={"max-md:hidden"}>{user?.username || "Sign in"}</span>
        <BsArrowDownShort className={"group-hover:translate-y-1 transition-transform"}/>
        </span>
        <div className={`absolute ${expanded ? "" : "hidden"} top-14 -translate-x-4 z-10 max-md:-translate-x-8 bg-gray-500 border border-gray-500 rounded-xl`}>
            <h1 className={"secondary bg-gray-600 p-4 rounded-t-xl flex flex-row gap-2 items-center"}><BsShield/> Account</h1>
            <ul className={"flex flex-col gap-2 p-4"}>
            {status == "authenticated" ? 
            <Link href={"/dashboard"} onClick={() => setExpanded(false)}  className={"flex flex-row gap-2 items-center font-roboto text-black hover:text-gray-700 transition-colors group cursor-pointer"}><span className={"bg-gray-600 p-1 rounded-lg text-black group-hover:text-orange-500 bg-opacity-50 transition-all"}><BsListTask/></span>Servers</Link> : ""}
                {status == "unauthenticated" ? <span onClick={() => router.push('/api/v1/auth/discord')} className={"flex flex-row gap-2 items-center font-roboto text-black hover:text-gray-700 transition-colors group cursor-pointer"}><span className={"bg-gray-600 p-1 rounded-lg text-black group-hover:text-orange-500 bg-opacity-50 transition-all"}><BsArrowRightCircle/></span>Sign in</span>
                : <span onClick={() => router.push('/api/v1/auth/signout')} className={"flex flex-row gap-2 items-center font-roboto text-black hover:text-gray-700 transition-colors group cursor-pointer"}><span className={"bg-gray-600 p-1 rounded-lg text-black group-hover:text-orange-500 bg-opacity-50 transition-all"}><BsArrowLeftCircle/></span>Sign out</span> }
            </ul>
        </div>
    </div>)
}