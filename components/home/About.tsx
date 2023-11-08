"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Features from './Features';
import Points from './Points';
import Commands from './Commands';

export default function About() {
    
    return (
        <section className={"w-full flex flex-col bg-gray-700 gap-32"}>
        <section className={"bg-gradient-to-b from-gray-600 border-t-2 border-gray-700 to-gray-70 gap-20 flex flex-col"}>
        <motion.h1 initial={{ transform: "translateY(-4rem)", opacity: 0 }} viewport={{ once: true }} whileInView={{ transform: "translateY(0px)", opacity: 1 }} transition={{ duration: 0.5 }} className={"header max-w-2xl mx-auto text-6xl max-md:text-5xl text-center mt-20 py-1"}>A one-fits-all Discord Bot solution.</motion.h1>
        <Points/>
        <Commands/>
        </section>
        <section className={"max-w-4xl mx-auto flex max-md:flex-col gap-10 max-md:overflow-x-hidden"}>
        <motion.h1 initial={{ transform: "translateX(-4rem)", opacity: 0 }} viewport={{ once: true }} whileInView={{ transform: "translateY(0px)", opacity: 1 }} transition={{ duration: 0.5 }} className={"header text-6xl text-end max-md:text-center max-md:mx-auto flex-grow items-center flex"}>About Auxdibot</motion.h1>
        <span className={"flex-grow w-1 border-r-2 border-gray-800 max-md:hidden"}></span>
        <motion.p initial={{ transform: "translateX(4rem)", opacity: 0 }} viewport={{ once: true }} whileInView={{ transform: "translateY(0px)", opacity: 1 }} transition={{ duration: 0.5 }} className={'secondary text-2xl max-md:text-center'}>Auxdibot is a Discord bot project founded and maintained by <Link href={"https://auxdible.me"} className={"text-orange-400 hover:text-orange-500"}>Auxdible</Link>. Auxdibot features a wide variety of features for admins to manage their servers with. Auxdibot receives consistant updates and constant bug fixes, making it a reliable choice for your server!</motion.p>
        </section>
        <section className={"max-w-6xl mx-auto flex flex-col"}>    
        <motion.h1 initial={{ transform: "translateY(-4rem)", opacity: 0 }} viewport={{ once: true }} whileInView={{ transform: "translateY(0px)", opacity: 1 }} transition={{ duration: 0.5 }} className={"header max-w-2xl mx-auto text-6xl max-md:text-5xl text-center my-20 py-1"}>Why Auxdibot?</motion.h1>
        <Features/>
        </section>
        </section>
    );
}