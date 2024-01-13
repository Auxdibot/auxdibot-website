"use client";
import { CardData } from "@/lib/types/CardData";
import { BsThreeDots } from "react-icons/bs";
import { useQuery } from "react-query";

export default function LoadingCard({ serverID }: { readonly serverID: string }) {
    const { status } = useQuery<CardData | { error: string } | undefined>([serverID, 'card'], async () => await fetch(`/api/v1/cards/${serverID}`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    if (status != 'loading') return <></>;
    return (<main className={"fixed top-0 h-screen w-screen gap-4 flex flex-col items-center justify-center"}>
        <BsThreeDots className={"animate-spin text-white text-6xl"}/>
        <h1 className={"font-montserrat text-2xl animate-pulse"}>Loading this server&apos;s card...</h1>
    </main>)
}