"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Features from './Features';
import Start from './Start';
import { BsDiscord, BsGithub } from 'react-icons/bs';

export default function About() {
    
    return (
        <section className={"w-full flex flex-col gap-60 py-40"}>
        <section className={"max-w-4xl mx-auto flex max-md:flex-col gap-10 max-lg:overflow-x-hidden"}>
        <motion.h1 initial={{ transform: "translateX(4rem)", opacity: 0 }} viewport={{ once: true }} whileInView={{ transform: "translateY(0px)", opacity: 1 }} transition={{ duration: 0.5, delay: 0.7 }} className={"text-6xl text-end max-md:text-center max-md:mx-auto items-end max-md:items-center flex flex-col justify-center lowercase"}><span className={"header"}>About</span><span className={"header"}>Auxdibot</span></motion.h1>
        <motion.span initial={{ scaleY: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} whileInView={{ scaleY: 1 }} className={"flex-grow w-1 border-r-2 border-gray-400 max-md:hidden"}></motion.span>
        <motion.p initial={{ transform: "translateX(-4rem)", opacity: 0 }} viewport={{ once: true }} whileInView={{ transform: "translateX(0px)", opacity: 1 }} transition={{ duration: 0.5, delay: 1.2 }} className={'font-open-sans text-gray-400 text-2xl max-md:text-center'}>Auxdibot is a Discord bot project founded and maintained by <Link href={"https://auxdible.me"} className={"header font-montserrat font-bold"}>Auxdible</Link>. Auxdibot features a wide variety of features for admins to manage their servers with. Auxdibot receives consistant updates and constant bug fixes, making it a reliable choice for your server!</motion.p>
        </section>
        <section className={"w-full max-lg:w-fit mx-auto flex flex-col my-20"}>
        
        <div className={"font-montserrat font-bold flex flex-col mx-auto text-5xl max-md:text-4xl text-center gap-5 py-1"}>
            <motion.h1 initial={{ transform: "translateY(-4rem)", opacity: 0 }} viewport={{ once: true }} whileInView={{ transform: "translateY(0px)", opacity: 1 }} transition={{ duration: 0.5 }} 
            className={"secondary-gradient"}>
                What&apos;s in Auxdibot?
            </motion.h1> 

            <motion.span initial={{ transform: "translateY(-4rem)", opacity: 0 }} viewport={{ once: true }} whileInView={{ transform: "translateY(0px)", opacity: 1 }} transition={{ duration: 0.5 }} 
            className={"font-inter font-normal text-2xl text-gray-400"}>
                A feature for every Discord server.
            </motion.span>
        </div>
        <span className={"overflow-y-hidden relative max-w-screen overflow-hidden"}>
        <div className={"absolute z-30 bg-gradient-to-b from-black via-transparent from-5% to-95% via-50% to-black self-stretch w-full top-0 h-[800px] pointer-events-none max-lg:hidden"}/>
        <Features/>
        </span>
        
        </section>
        <Start/>
        <section className={"max-w-4xl mx-auto flex flex-col gap-10 text-center"}>
        <span className={"flex gap-2 text-6xl max-md:text-5xl justify-center"}>
        <motion.h1 className={"header"} initial={{ transform: "translateY(-2rem)", opacity: 0 }} viewport={{ once: true }} whileInView={{ transform: "translateY(0px)", opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>more</motion.h1>
        <motion.h1 className={"header"} initial={{ transform: "translateY(-2rem)", opacity: 0 }} viewport={{ once: true }} whileInView={{ transform: "translateY(0px)", opacity: 1 }} transition={{ duration: 0.5, delay: 1 }}>to</motion.h1>
        <motion.h1 className={"header"} initial={{ transform: "translateY(-2rem)", opacity: 0 }} viewport={{ once: true }} whileInView={{ transform: "translateY(0px)", opacity: 1 }} transition={{ duration: 0.5, delay: 1.5 }}>come</motion.h1>
        </span>
        <motion.span initial={{ transform: "translateY(-2rem)", opacity: 0 }} viewport={{ once: true }} whileInView={{ transform: "translateY(0px)", opacity: 1 }} transition={{ duration: 0.5, delay: 2 }} className={"flex items-center w-full max-w-lg mx-auto"}>
        <Link href={process.env.NEXT_PUBLIC_DISCORD_SERVER_LINK || ""} className={"flex max-md:flex-col flex-row gap-2 text-center items-center font-open-sans group mx-auto"}>
        <BsDiscord className={"group-hover:text-discord-primary transition-all text-6xl max-sm:text-4xl"}/>
        </Link>

        <Link href={"https://github.com/Auxdibot"} className={"flex max-md:flex-col flex-row gap-2 text-center items-center font-open-sans group mx-auto"}>
            <BsGithub className={"group-hover:text-orange-500 transition-all text-6xl max-sm:text-4xl"}/>
        </Link>
        </motion.span>
        <motion.p initial={{ transform: "translateY(-4rem)", opacity: 0 }} viewport={{ once: true }} whileInView={{ transform: "translateY(0px)", opacity: 1 }} transition={{ duration: 0.5, delay: 2.3 }} className={'font-open-sans text-gray-400 text-2xl'}>
        We&apos;re not done here. Auxdibot is a project founded by a single passionate developer with a drive to create better communities online. Get updates on new features, bug fixes, and more by joining our Discord server.
        </motion.p>
        
        </section>
        
        </section>
    );
}