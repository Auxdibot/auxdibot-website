"use client";

import DiscordGuild from "@/lib/types/DiscordGuild";
import { Suspense } from 'react';
import { BsChatDots, BsStar } from "react-icons/bs";
import { useState, useEffect } from "react"; 
export default function StarboardStats({ server }: { server: DiscordGuild & { 
    data: {
        serverID: string, 
        total_stars: number,
        total_starred_messages: number,
    } 
}}) {

    let [starsState, setStarsState] = useState("0");
    let [messagesState, setMessagesState] = useState("0");
    useEffect(() => {
        if (!server) return;
        let totalStars = 0;
            let starsEnd = parseInt(server.data.total_stars.toString().substring(0,3));
            if (totalStars == starsEnd) return;
            let incTimeStars = (1/starsEnd) * 1000;
            let timerStars = setInterval(() => {
                totalStars += 1;
                setStarsState(String(totalStars) + server.data.total_stars.toString().substring(3))
                if (totalStars == starsEnd) clearInterval(timerStars)       
              }, incTimeStars);
              let totalStarredMessages = 0;
              let starredMessagesEnd = parseInt(server.data.total_starred_messages.toString().substring(0,3));
              if (totalStarredMessages == starredMessagesEnd) return;
              let incTimeStarredMessages = (1/starredMessagesEnd) * 1000;
              let timerStarredMessages = setInterval(() => {
                  totalStarredMessages += 1;
                  setMessagesState(String(totalStarredMessages) + server.data.total_starred_messages.toString().substring(3))
                  if (totalStarredMessages == starredMessagesEnd) clearInterval(timerStarredMessages)       
                }, incTimeStarredMessages);
    }, [server]);
    return <>
    <div className={"bg-gray-800 shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Total Starboard Stats</h2>
    <div className={"flex flex-col gap-4 my-4"}>
    <Suspense fallback={null}>
        { server ? <>
            <span className={"flex gap-2 secondary text-2xl w-full max-md:flex-col max-md:items-center justify-center"}><BsChatDots/> <span><code>{parseInt(messagesState).toLocaleString()}</code> starred message{ parseInt(messagesState) != 1 ? "s" : ""}.</span></span>
        <span className={"flex gap-2 secondary text-2xl w-full max-md:flex-col max-md:items-center justify-center"}><BsStar/> <span><code>{parseInt(starsState).toLocaleString()}</code> star{ parseInt(starsState) != 1 ? "s" : ""}.</span></span>
        </> : "" }

    </Suspense>
    
    </div>
    </div>
    </>;
}