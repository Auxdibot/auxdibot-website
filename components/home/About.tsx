"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Features from './Features';
import Start from './Start';

export default function About() {
    
    return (
        <section className={"w-full flex flex-col gap-60 py-40"}>
        <section className={"max-w-4xl mx-auto flex max-md:flex-col gap-10 max-md:overflow-x-hidden"}>
        <motion.h1 initial={{ transform: "translateX(4rem)", opacity: 0 }} viewport={{ once: true }} whileInView={{ transform: "translateY(0px)", opacity: 1 }} transition={{ duration: 0.5, delay: 0.7 }} className={"text-6xl text-end max-md:text-center max-md:mx-auto items-end max-md:items-center flex flex-col justify-center lowercase"}><span className={"header"}>About</span><span className={"header"}>Auxdibot</span></motion.h1>
        <motion.span initial={{ scaleY: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} whileInView={{ scaleY: 1 }} className={"flex-grow w-1 border-r-2 border-gray-400 max-md:hidden"}></motion.span>
        <motion.p initial={{ transform: "translateX(-4rem)", opacity: 0 }} viewport={{ once: true }} whileInView={{ transform: "translateY(0px)", opacity: 1 }} transition={{ duration: 0.5, delay: 1.2 }} className={'font-open-sans text-gray-400 text-2xl max-md:text-center'}>Auxdibot is a Discord bot project founded and maintained by <Link href={"https://auxdible.me"} className={"header font-montserrat font-bold"}>Auxdible</Link>. Auxdibot features a wide variety of features for admins to manage their servers with. Auxdibot receives consistant updates and constant bug fixes, making it a reliable choice for your server!</motion.p>
        </section>
        <section className={"max-w-7xl w-full max-md:w-fit mx-auto flex flex-col my-20"}>
        
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
        <Features/>
        </section>

        <Start/>
       
        
        </section>
    );
}