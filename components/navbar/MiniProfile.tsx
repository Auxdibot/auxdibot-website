"use client";

import Image from "next/image";
import { BsArrowDownShort, BsThreeDots } from "react-icons/bs";
import { useEffect, useRef, useState } from 'react';
import useSession from "@/lib/hooks/useSession";
import Link from "next/link";
import { useQueryClient } from "react-query";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { User, UserCog } from "lucide-react";

export default function MiniProfile(props: React.ComponentProps<any>) {
    const [expanded, setExpanded] = useState(false);
    const { user, status } = useSession();
    const queryClient = useQueryClient();
    const ref = useRef<HTMLDivElement | null>();
    useEffect(() => {
        const clickedOutside = (e: globalThis.MouseEvent) => {
          if (expanded && ref.current && !ref.current.contains(e.target as Node)) setExpanded(false)
          
        }
        document.addEventListener("mousedown", clickedOutside)
        return () => document.removeEventListener("mousedown", clickedOutside);
      }, [expanded])
    function signOut() {
        return fetch(`/bot/v1/auth/signout`).then(() => {
            setExpanded(false);
            queryClient.invalidateQueries("session");
        }).catch(() => undefined)
    }
    if (status == "loading") return (<div {...props}>
        <BsThreeDots className={"animate-spin text-3xl text-white"}/>
    </div>)
    return (<div ref={ref} {...props}>
        <span className={"text-primary-300"}></span>
        <span className={`flex flex-row gap-2`}>
       
        <span className={"flex items-center gap-2"}>
        {status == "authenticated" && user?.avatar && user?.id ? <Image
            src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=64`}
            alt={"Discord profile icon"}
            className={"inline-block align-middle rounded-xl"}
            width={36}
            height={36}
            quality="100"
            priority
            /> : <UserCog className={"text text-2xl align-middle inline-block"}/>}
        
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
            <button className={"flex group flex-row gap-2 items-center text-gray-200 font-raleway tracking-wide text-lg cursor-pointer"}>
            <span className={"max-md:hidden select-none"}>{user?.username || "Sign in"}</span>
        
            <BsArrowDownShort className={"group-hover:translate-y-1 transition-transform"}/>
            </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="font-inter translate-y-2">
            <DropdownMenuLabel className="font-raleway font-bold text-lg flex items-center gap-1"><User width={"20px"}/> User</DropdownMenuLabel>
            {status == "authenticated" ?
            <>
            <Link href={'/dashboard'}><DropdownMenuItem>Dashboard</DropdownMenuItem></Link>
            <DropdownMenuItem onClick={() => signOut()} className="text-red-500 cursor-pointer hover:text-red-400">Sign out</DropdownMenuItem>
            </> :
            <Link href={'/bot/v1/auth/discord'}><DropdownMenuItem>Sign in</DropdownMenuItem></Link>
            }
            </DropdownMenuContent>
        </DropdownMenu>
        
        

        </span>

        </span>
        

    </div>)
}