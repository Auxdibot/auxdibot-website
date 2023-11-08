"use client";

import Image from "next/image";
import Analytics from "./Analytics";
import { BsEnvelopePlus, BsGear, BsPersonAdd, BsRobot } from 'react-icons/bs';
import Button from "../Button";
import useSession from "@/lib/hooks/useSession";
export default function Masthead() {
    const { user, status } = useSession();
    return (
    <main className={"min-h-screen"}>
        
        <div className={"block -z-10 max-lg:top-16 min-h-[110vw] max-md:min-h-[160vw] max-sm:min-h-[240vw] overflow-hidden absolute bottom-0 top-0 left-0 right-0"}>
        <video className={"video"} autoPlay muted loop playsInline>
                <source src={"/auxdibot-video.mp4"} type="video/mp4" />
        </video>
        </div>
        <section className={"flex items-center bg-gray-700 bg-opacity-75 min-h-screen"}>
        
        <div className={"flex w-full flex-row max-md:flex-col max-md:gap-8 justify-center"}>
            <section className={"flex-grow flex-shrink flex-1 flex items-center justify-center flex-col mx-auto"}>
                <div className={"w-fit max-md:text-center"}>
                    <h1 className={"header text-8xl max-md:text-6xl max-md:my-4"}>Auxdibot</h1>
                    <Analytics/>
                    {user ? <Button icon={<BsGear/>} text={"Dashboard"} href={"/dashboard"}/> : <Button icon={<BsEnvelopePlus/>} text={"Invite Bot"}/> }
                </div>
                
            </section>
            <section className={"flex-grow flex-shrink flex-1 flex items-center justify-center flex-col text-left"}>
            <Image
                src={"/icon.png"}
                alt={"Auxdibot icon."}
                width={256}
                height={256}
                quality="100"
            />
            </section>
        </div>
        </section>
        
    </main>
    );
}