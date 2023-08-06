"use client";

import { motion } from 'framer-motion';

export default function Features() {
    
    return (
        <section className={"w-full bg-gray-700 h-screen py-32"}>
        <section className={"max-w-xl mx-auto flex flex-col gap-5"}>
        <motion.h1 initial={{ transform: "translateY(-2rem)", opacity: 0 }} viewport={{ once: true }} whileInView={{ transform: "translateY(0px)", opacity: 1 }} transition={{ duration: 1 }} className={"header text-6xl text-center"}>Under Construction</motion.h1>
        <motion.p initial={{ transform: "translateY(-2rem)", opacity: 0 }} viewport={{ once: true }} whileInView={{ transform: "translateY(0px)", opacity: 1 }} transition={{ duration: 1 }} className={'secondary text-3xl text-center'}>This site is still under construction. It will be the future blog site, dashboard, and documentation for Auxdibot! Check back here later for more updates...</motion.p>
        </section>
        
        </section>
    );
}