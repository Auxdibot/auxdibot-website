"use client";

import { CardBadge } from "@/lib/types/CardBadge";
import { CardBadgeDescriptions } from "@/lib/types/CardBadgeDescriptions";
import { CardBadgeIcons } from "@/lib/types/CardBadgeIcons";
import { Suspense } from "react";
export default function ServerBadges({ badges }: { readonly badges: CardBadge[] }) {


    return (<Suspense fallback={<></>}>
        <span className={"flex-1 flex justify-center"}>
        <span className={"text-blue-500 text-green-200"}></span>
        <span className={"flex bg-gray-900 py-2 px-2 text-xl w-full max-md:text-lg rounded-xl gap-2  justify-center"}>
            {badges.map((i) => <span className={"relative group cursor-pointer inline-block"} key={i}>
                <span className={"absolute text-base scale-0 group-hover:scale-100 md:whitespace-nowrap break-words max-md:w-28 h-max transition-all origin-bottom -translate-y-12 max-md:-translate-y-24 -translate-x-1/2 left-1/2 text-center z-30 rounded-2xl border bg-gray-950 p-2 max-md:text-xs"}>{CardBadgeDescriptions[i]}</span>
                {CardBadgeIcons[i]}
                </span>)}
        </span>
        </span>
        </Suspense>);
}