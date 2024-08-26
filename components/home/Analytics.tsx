"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { useQuery } from "react-query";
import { BsThreeDots } from 'react-icons/bs';
import { User, Users } from "lucide-react";

export default function Analytics() {
    const [serverState, setServerState] = useState("0");
    const [memberState, setMemberState] = useState("0");
    const serverRef = useRef<HTMLDivElement>(null);
    const memberRef = useRef<HTMLDivElement>(null);

    let { data: analytics, status } = useQuery(["analytics"], async () => await fetch("/bot/v1/analytics").then(async (data) => await data.json().catch(() => {})).catch(() => {}));

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5 // Adjust this threshold value as needed
        };
        const server = serverRef.current;
        const member = memberRef.current;
        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (entry.target === serverRef.current) {
                        animateServers();
                    } else if (entry.target === memberRef.current) {
                        animateMembers();
                    }
                }
            });
        };

        const animateServers = () => {
            if (status === "success" && analytics?.servers) {
                let servers = 0;
                let end = parseInt(analytics.servers.toString().substring(0, 3));
                if (servers === end) return;
                let incTime = (1 / end) * 1000;
                let timer = setInterval(() => {
                    servers += 1;
                    setServerState(String(servers) + analytics.servers.toString().substring(3));
                    if (servers === end) clearInterval(timer);
                }, incTime);
            }
        };

        const animateMembers = () => {
            if (status === "success" && analytics?.members) {
                let members = 0;
                let end = parseInt(analytics.members.toString().substring(0, 3));
                if (members === end) return;
                let incTime = (1 / end) * 1000;
                let timer = setInterval(() => {
                    members += 1;
                    setMemberState(String(members) + analytics.members.toString().substring(3));
                    if (members === end) clearInterval(timer);
                }, incTime);
            }
        };

        const observer = new IntersectionObserver(handleIntersection, options);

        if (serverRef.current) {
            observer.observe(serverRef.current);
        }

        if (memberRef.current) {
            observer.observe(memberRef.current);
        }

        return () => {
            if (server) {
                observer.unobserve(server);
            }

            if (member) {
                observer.unobserve(member);
            }
        };
    }, [analytics, status]);

    return (
        <Suspense fallback={<></>}>
            <div className={"flex gap-4 max-w-4xl mx-auto max-md:gap-5 max-md:flex-col max-md:px-10 justify-center w-full"}>
                <section ref={serverRef} className="bg-gradient-to-bl from-zinc-300/5 to-zinc-900/5 cursor-pointer hover:bg-zinc-500/5 transition-colors border-2 p-4 rounded-lg shadow border-zinc-800 flex flex-col w-full gap-2 items-center">

                    <p className={"flex gap-2 font-raleway font-bold text-6xl max-md:flex-col items-center w-max"}><span>{status === 'loading' ? <BsThreeDots className={"animate-spin text-4xl text-white"}/> : parseInt(serverState).toLocaleString()}</span></p>
                    <h2 className={"font-raleway font-bold text-3xl text-white flex items-center gap-2"}><Users size={"32px"}/> Servers</h2>
                </section>

                <section ref={memberRef} className="bg-gradient-to-bl from-zinc-300/5 to-zinc-900/5 cursor-pointer hover:bg-zinc-500/5 transition-colors border-2 p-4 rounded-lg shadow border-zinc-800 flex flex-col w-full gap-2 items-center">
                    <p className={"flex gap-2 font-raleway font-bold text-6xl max-md:flex-col items-center w-max"}><span>{status === 'loading' ? <BsThreeDots className={"animate-spin text-4xl text-white"}/> : parseInt(memberState).toLocaleString()}</span></p>
                    <h2 className={"font-raleway font-bold text-3xl text-white flex items-center gap-2"}><User size={"32px"}/> Members</h2>
                </section>
            </div>
        </Suspense>
    );
}