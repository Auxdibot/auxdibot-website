"use client";

import { Suspense, useEffect, useState } from "react";
import { BsPerson, BsThreeDots } from 'react-icons/bs';
export default function ServerMembers({ totalMembers }: { readonly totalMembers: number }) {
    let [memberState, setMemberState] = useState("0");
    useEffect(() => {
        let members = 0;
            let end = parseInt(totalMembers.toString().substring(0,3));
            if (members == end) return;
            let incTime = (1/end) * 1000;
            let timer = setInterval(() => {
                members += 1;
                setMemberState(String(members) + totalMembers.toString().substring(3))
                if (members == end) clearInterval(timer)       
        }, incTime);
    }, [totalMembers]);

    return (<Suspense fallback={<></>}>
        <span className={"flex flex-1 gap-2 text-3xl items-center max-md:text-2xl"}><BsPerson/> <span>{status == 'loading' ? <BsThreeDots className={"animate-spin text-4xl text-white"}/> : parseInt(memberState).toLocaleString()}</span></span>
        </Suspense>);
}