"use client";

import Button from "@/components/ui/primary-button";
import { useRouter, useSearchParams } from "next/navigation";
import { BsArrowLeftCircle, BsExclamationCircle } from "react-icons/bs";

export default function SignIn() {
    const searchParams = useSearchParams();
    let error = searchParams.get('error');
    const router = useRouter();
    return (
    <main className={"flex justify-center flex-col items-center gap-5 bg-gray-700 flex-grow"}>
        {error ? <div className={"bg-red-600 border-gray-500 border-opacity-20 border-2 flex flex-col py-2 px-5 rounded-3xl font-roboto gap-2"}><span className={"flex flex-row gap-2 items-center"}><BsExclamationCircle/> An error occurred</span><span>Couldn&apos;t sign you into Auxdibot.</span><span>Error Code: <i>{error}</i></span></div> : ""}
        <h1 className={"header text-6xl text-center"}>Sign Out</h1>
        <p className={"secondary text-2xl text-center"}>Sign out of Auxdibot&apos;s website. Your changes are saved.</p>
        <div className={"bg-gray-800 bg-opacity-50 p-4 rounded-2xl"}><span onClick={() => router.push('/api/v1/auth/signout')}><Button text={"Sign out"} icon={<BsArrowLeftCircle/>}/></span></div>
    </main>)
}