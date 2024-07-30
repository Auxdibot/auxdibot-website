"use client";

import { Suspense, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { BsThreeDots } from 'react-icons/bs';
import { User, Users } from "lucide-react";
export default function Analytics() {
    let { data: analytics, status } = useQuery(["analytics"], async () => await fetch("/bot/v1/analytics").then(async (data) => await data.json().catch(() => {})).catch(() => {}));
    let [serverState, setServerState] = useState("0");
    let [memberState, setMemberState] = useState("0");
    useEffect(() => {
        if (status == "success" && analytics?.servers) {
            let servers = 0;
            let end = parseInt(analytics.servers.toString().substring(0,3));
            if (servers == end) return;
            let incTime = (1/end) * 1000;
            let timer = setInterval(() => {
                servers += 1;
                setServerState(String(servers) + analytics.servers.toString().substring(3))
                if (servers == end) clearInterval(timer)       
              }, incTime);
        }
        if (status == "success" && analytics?.members) {
            let members = 0;
            let end = parseInt(analytics.members.toString().substring(0,3));
            if (members == end) return;
            let incTime = (1/end) * 1000;
            let timer = setInterval(() => {
                members += 1;
                setMemberState(String(members) + analytics.members.toString().substring(3))
                if (members == end) clearInterval(timer)       
              }, incTime);
        }
    }, [analytics, status]);
    return (<Suspense fallback={<></>}>
        
        <div className={"flex gap-4 max-w-4xl mx-auto max-md:gap-5 justify-center w-full"}>
            <section className="bg-gradient-to-bl from-zinc-300/5 to-zinc-900/5 cursor-pointer hover:bg-zinc-500/5 transition-colors border-2 p-4 rounded-lg shadow border-zinc-800 flex flex-col w-full gap-2 items-center ">
                <p className={"flex gap-2 font-raleway font-bold text-6xl max-md:flex-col items-center max-md:text-2xl w-max"}><span>{status == 'loading' ? <BsThreeDots className={"animate-spin text-4xl text-white"}/> : parseInt(serverState).toLocaleString()}+</span></p>
                <h2 className={"font-raleway font-bold text-3xl max-md:text-xl text-white flex items-center gap-2"}><Users size={"32px"}/> Servers</h2>
                
            </section>
        
            <section className="bg-gradient-to-bl from-zinc-300/5 to-zinc-900/5 cursor-pointer hover:bg-zinc-500/5 transition-colors border-2 p-4 rounded-lg shadow border-zinc-800 flex flex-col w-full gap-2 items-center">
                <p className={"flex gap-2 font-raleway font-bold text-6xl max-md:flex-col items-center max-md:text-2xl w-max"}><span>{status == 'loading' ? <BsThreeDots className={"animate-spin text-4xl text-white"}/> : parseInt(memberState).toLocaleString()}+</span></p>
                <h2 className={"font-raleway font-bold text-3xl max-md:text-xl text-white flex items-center gap-2"}><User size={"32px"}/> Members</h2>
                
            </section>
        
        </div>
        </Suspense>);
}