"use client";

import { ComponentProps, Suspense, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { BsServer, BsPerson, BsSlash } from 'react-icons/bs';
import { motion } from 'framer-motion';
export default function Commands() {
    let { data: analytics, status } = useQuery(["analytics"], async () => await fetch("/api/v1/analytics").then(async (data) => await data.json().catch(() => {})).catch(() => {}));
    let [commandsState, setCommandsState] = useState("0");
    let [count, setCount] = useState(false);
    useEffect(() => {
        if (!count) return;
        if (status == "success" && analytics?.commands) {
            let commands = 0;
            let end = parseInt(analytics.commands.toString().substring(0,3));
            if (commands == end) return;
            let incTime = (1/end) * 1000;
            let timer = setInterval(() => {
                commands += 1;
                setCommandsState(String(commands) + analytics.commands.toString().substring(3))
                if (commands == end) clearInterval(timer)       
              }, incTime);
        }
    }, [analytics, status, count]);
    return (<Suspense fallback={<></>}>
        <motion.span onViewportEnter={() => { setCount(true) }} className={"flex gap-2 secondary text-4xl max-md:flex-col max-md:items-center max-md:text-3xl py-2 w-fit mx-auto"}><BsSlash/> <span><code>{parseInt(commandsState).toLocaleString()}</code> command{ parseInt(commandsState) != 1 ? "s" : ""}.</span></motion.span>
        </Suspense>);
}