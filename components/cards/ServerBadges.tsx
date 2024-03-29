"use client";

import { CardBadge } from "@/lib/types/CardBadge";
import { CardBadgeDescriptions } from "@/lib/constants/CardBadgeDescriptions";
import { CardBadgeIcons } from "@/lib/constants/CardBadgeIcons";
import { Suspense } from "react";
export default function ServerBadges({ badges, dark }: { readonly badges: CardBadge[]; readonly dark?: boolean }) {


    return (<Suspense fallback={<></>}>
        <span className={"w-fit flex justify-center"}>
        <span className={"text-blue-500 text-green-200 text-amber-600"}></span>
        <span className={`flex ${dark ? "bg-gray-950" : "bg-gray-300"} border ${dark ? "border-gray-800" : "border-gray-400"} py-2 px-2 text-xl w-full max-md:text-lg rounded-xl gap-2  justify-center`}>
            {badges.map((i) => <span className={"relative group cursor-pointer inline-block"} key={i}>
                <span className={`absolute border-gray-800 text-base scale-0 group-hover:scale-100 md:whitespace-nowrap break-words max-md:w-28 h-max transition-all origin-bottom -translate-y-14 max-md:-translate-y-24 -translate-x-1/2 left-1/2 text-center z-30 rounded-2xl border ${!dark ? "border-gray-400" : "border-gray-800"} ${dark ? "bg-gray-950" : "bg-gray-200"} p-2 max-md:text-xs`}>{CardBadgeDescriptions[i]}</span>
                {CardBadgeIcons[i]}
                </span>)}
        </span>
        </span>
        </Suspense>);
}