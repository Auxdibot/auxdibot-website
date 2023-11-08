"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Features from './Features';
import Points from './Points';
import Commands from './Commands';

export default function About() {
    
    return (
        <section className={"w-full flex flex-col bg-gray-700"}>
        <section className={"bg-gradient-to-b from-gray-600 border-t-2 border-gray-700 to-gray-700 py-5"}>
        <Commands/>
        <Points/>
        </section>
        <section className={"max-w-4xl mx-auto flex flex-col gap-10 pb-20 border-b-2 border-b-gray-600"}>
        <motion.h1 initial={{ transform: "translateY(-4rem)", opacity: 0 }} viewport={{ once: true }} whileInView={{ transform: "translateY(0px)", opacity: 1 }} transition={{ duration: 0.5 }} className={"header text-6xl text-center"}>About Auxdibot</motion.h1>
        <motion.p initial={{ transform: "translateY(-2rem)", opacity: 0 }} viewport={{ once: true }} whileInView={{ transform: "translateY(0px)", opacity: 1 }} transition={{ duration: 0.5 }} className={'secondary text-2xl text-center'}>Auxdibot is a Discord bot project founded and maintained by <Link href={"https://auxdible.me"} className={"text-orange-400 hover:text-orange-500"}>Auxdible</Link>. Auxdibot utilizes discord.js for handling Discord interactions and Next.js for a fast and user-friendly dashboard, allowing users to interact with Auxdibot on the go.</motion.p>
        </section>
        <section className={"max-w-6xl mx-auto flex flex-col gap-10 my-40"}>
        <motion.h1 initial={{ transform: "translateY(-4rem)", opacity: 0 }} viewport={{ once: true }} whileInView={{ transform: "translateY(0px)", opacity: 1 }} transition={{ duration: 0.5 }} className={"header text-6xl text-center"}>Why Auxdibot?</motion.h1>
        <motion.p initial={{ transform: "translateY(-2rem)", opacity: 0 }} viewport={{ once: true }} whileInView={{ transform: "translateY(0px)", opacity: 1 }} transition={{ duration: 0.5 }} className={'secondary max-w-4xl mx-auto text-3xl text-center'}>You might be wondering why you should choose Auxdibot for your server. Here&apos;s why.</motion.p>
        <Features/>
        </section>
        </section>
    );
}