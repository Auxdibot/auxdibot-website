"use client";

import Image from "next/image";
import Analytics from "./Analytics";
import { BsEnvelopePlus, BsGear, BsPersonAdd, BsRobot } from 'react-icons/bs';
import Button from "../Button";
import useSession from "@/lib/hooks/useSession";
export default function Masthead() {
    const { user, status } = useSession();
    return (
    <main className={"min-h-screen bg-auxdibot-masthead"}>
        
        <section className={"min-h-screen flex justify-center"}>
        <div className={"flex w-full flex-col max-md:flex-col justify-center items-center gap-2"}>
            
        <Image
                src={"/logo.png"}
                alt={"Auxdibot icon."}
                width={118}
                height={118}
                quality="100"
            />
            <h1 className={"header text-8xl max-md:text-6xl w-fit"}>auxdibot</h1>
            <p className={"secondary text-3xl max-md:text-2xl text-white text-center"}>The next Discord Bot for your server.</p>
            <Analytics/>
            {user ? <Button icon={<BsGear/>} text={"Dashboard"} href={"/dashboard"}/> : <Button icon={<BsEnvelopePlus/>} text={"Invite Bot"}/> }
        </div>
        </section>
        
    </main>
    );
}