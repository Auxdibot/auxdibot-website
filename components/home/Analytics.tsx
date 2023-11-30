"use client";

import { ComponentProps, Suspense, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { BsServer, BsPerson, BsPeople } from 'react-icons/bs';
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
        <div className={"flex gap-4 max-md:gap-5 w-fit justify-center"}>
        <p className={"flex gap-2 font-montserrat text-3xl max-md:flex-col items-center max-md:text-2xl w-max"}><BsPeople/> <span>{parseInt(serverState).toLocaleString()}</span></p>
        <span className={"w-1 border-r-2"}></span>
        <p className={"flex gap-2 font-montserrat text-3xl w-max max-md:flex-col items-center max-md:text-2xl"}><BsPerson/> <span>{parseInt(memberState).toLocaleString()}</span></p>
        </div>
        </Suspense>);
}