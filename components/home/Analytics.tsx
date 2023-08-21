"use client";

import { ComponentProps, Suspense, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { BsServer, BsPerson } from 'react-icons/bs';
export default function Analytics() {
    let { data: analytics, status, error } = useQuery(["analytics"], async () => await fetch("/api/v1/analytics").then(async (data) => await data.json().catch(() => {})).catch(() => {}));
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
        <div className={"flex flex-col gap-2 max-md:gap-5"}>
        <p className={"flex gap-2 secondary text-5xl w-full max-md:flex-col max-md:items-center max-md:text-4xl"}><BsServer/> <span><code>{parseInt(serverState).toLocaleString()}</code> server{ parseInt(serverState) != 1 ? "s" : ""}.</span></p>
        <p className={"flex gap-2 secondary text-5xl w-full max-md:flex-col max-md:items-center max-md:text-4xl"}><BsPerson/> <span><code>{parseInt(memberState).toLocaleString()}</code> member{ parseInt(memberState) != 1 ? "s" : ""}.</span></p>
        </div>
        </Suspense>);
}