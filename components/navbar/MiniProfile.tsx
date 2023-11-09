"use client";

import Image from "next/image";
import { BsArrowDownShort, BsArrowRightCircle, BsListTask, BsPersonAdd, BsShield, BsThreeDots } from "react-icons/bs";
import { useEffect, useRef, useState } from 'react';
import useSession from "@/lib/hooks/useSession";
import { BsArrowLeftCircle } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "react-query";
export default function MiniProfile(props: React.ComponentProps<any>) {
    const [expanded, setExpanded] = useState(false);
    const { user, status } = useSession();
    const queryClient = useQueryClient();
    const router = useRouter();
    const ref = useRef<HTMLDivElement | null>();
    useEffect(() => {
        const clickedOutside = (e: globalThis.MouseEvent) => {
          if (expanded && ref.current && !ref.current.contains(e.target as Node)) setExpanded(false)
          
        }
        document.addEventListener("mousedown", clickedOutside)
        return () => document.removeEventListener("mousedown", clickedOutside);
      }, [expanded])
    function expand() {
        setExpanded(!expanded)
    }
    function signOut() {
        return fetch(`/api/v1/auth/signout`).then(() => {
            setExpanded(false);
            queryClient.invalidateQueries("session");
        }).catch(() => undefined)
    }
    if (status == "loading") return (<div {...props}>
        <BsThreeDots className={"animate-spin text-2xl text-white"}/>
    </div>)
    return (<div ref={ref} {...props}>
        {status == "authenticated" && user?.avatar && user?.id ? <Image
            src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=32`}
            alt={"Discord profile icon"}
            className={"inline-block align-middle rounded-full"}
            width={32}
            height={32}
            quality="100"
            priority
            /> : <BsPersonAdd className={"text text-2xl align-middle inline-block"}/>}
        
        <span className={"flex group flex-row gap-2 items-center text-gray-200 font-roboto text-md cursor-pointer"} onClick={() => expand()}>
        <span className={"max-md:hidden select-none"}>{user?.username || "Sign in"}</span>
        <BsArrowDownShort className={"group-hover:translate-y-1 transition-transform"}/>
        </span>
        <div className={`absolute ${expanded ? "scale-100" : "scale-0"} transition-all origin-top-right md:origin-top select-none top-14 z-10 max-md:-translate-x-8 bg-gray-500 border border-gray-500 rounded-xl`}>
            <h1 className={"secondary bg-gray-600 p-4 rounded-t-xl flex flex-row gap-2 items-center"}><BsShield/> Account</h1>
            <ul className={"flex flex-col gap-2 p-4"}>
            {status == "authenticated" ? 
            <Link href={"/dashboard"} onClick={() => setExpanded(false)}  className={"flex flex-row gap-2 items-center font-roboto text-black hover:text-gray-700 transition-colors group cursor-pointer"}><span className={"bg-gray-600 p-1 rounded-lg text-black group-hover:text-orange-500 bg-opacity-50 transition-all"}><BsListTask/></span>Servers</Link> : ""}
                {status == "unauthenticated" ? <span onClick={() => router.push('/api/v1/auth/discord')} className={"flex flex-row gap-2 items-center font-roboto text-black hover:text-gray-700 transition-colors group cursor-pointer"}><span className={"bg-gray-600 p-1 rounded-lg text-black group-hover:text-orange-500 bg-opacity-50 transition-all"}><BsArrowRightCircle/></span>Sign in</span>
                : <span onClick={() => signOut()} className={"flex flex-row gap-2 items-center font-roboto text-black hover:text-gray-700 transition-colors group cursor-pointer"}><span className={"bg-gray-600 p-1 rounded-lg text-black group-hover:text-orange-500 bg-opacity-50 transition-all"}><BsArrowLeftCircle/></span>Sign out</span> }
            </ul>
        </div>
    </div>)
}