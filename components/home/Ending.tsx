"use client";
import { motion } from 'framer-motion';
import { BsDiscord, BsGithub } from 'react-icons/bs';
import Link from 'next/link';

export function Ending() {
    return (
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
        <motion.p initial={{ transform: "translateY(-4rem)", opacity: 0 }} viewport={{ once: true }} whileInView={{ transform: "translateY(0px)", opacity: 1 }} transition={{ duration: 0.5, delay: 2.3 }} className={'font-inter text-zinc-400 text-2xl'}>
        We&apos;re not done here. Auxdibot is a project founded by a single passionate developer with a drive to create better communities online. Get updates on new features, bug fixes, and more by joining our Discord server.
        </motion.p>
        
        </section>
    )
}