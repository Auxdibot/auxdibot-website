"use client";

import Button from "@/components/Button";
import { signIn, signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { BsArrowLeftCircle, BsDiscord, BsExclamationCircle } from "react-icons/bs";

export default function SignIn() {
    const searchParams = useSearchParams();
    let error = searchParams.get('error');
    return (
    <main className={"flex justify-center flex-col items-center gap-5 bg-gray-700 flex-grow"}>
        {error ? <div className={"bg-red-600 border-gray-500 border-opacity-20 border-2 flex flex-col py-2 px-5 rounded-3xl font-roboto gap-2"}><span className={"flex flex-row gap-2 items-center"}><BsExclamationCircle/> An error occurred</span><span>Couldn&apos;t sign you into Auxdibot.</span><span>Error Code: <i>{error}</i></span></div> : ""}
        <h1 className={"header text-6xl text-center"}>Sign In</h1>
        <p className={"secondary text-2xl text-center"}>Sign in to use Auxdibot&apos;s dashboard!</p>
        <div className={"bg-gray-800 bg-opacity-50 p-4 rounded-2xl"}><span onClick={() => signOut({ 'callbackUrl': '/' })}><Button text={"Sign out"} icon={<BsArrowLeftCircle/>}/></span></div>
    </main>)
}