"use client";
import { motion } from 'framer-motion';

export default function Start() {
    return (<section className={"flex flex-col gap-10 max-w-6xl mx-auto"}>
        <div className='w-full flex flex-col gap-2 items-center'>
        <motion.h1 initial={{ transform: "translateY(-4rem)", opacity: 0 }} viewport={{ once: true }} whileInView={{ transform: "translateY(0px)", opacity: 1 }} transition={{ duration: 0.5 }} 
            className={"font-raleway font-bold flex flex-col mx-auto text-5xl max-md:text-4xl text-center w-full bg-zinc-950"}>
            Where do I start?
        </motion.h1>
        <span
        className='text-xl font-inter text-zinc-300 text-center'>
            Drop the hassle of setting up an abundance of parameters. It&apos;s easy to setup and learn Auxdibot.
        </span>
        </div>
        
        <div className={"flex max-md:flex-col max-md:gap-10"}>
        <section className={"flex flex-col items-center flex-1 gap-4 font-inter text-xl text-zinc-300 text-center px-2"}>
            <h1 className={"relative flex items-center justify-center gap-2"}>
            <motion.div initial={{ scale: 0, rotate: '45deg' }} viewport={{ once: true }} whileInView={{ scale: 1, rotate: '45deg' }} transition={{ duration: 0.5, delay: 0.75 }} className={'origin-top border border-white h-8 rotate-12 w-0 mx-auto mt-2'}></motion.div>
            <span className={"font-montserrat text-zinc-200 text-4xl"}>help all</span>
            </h1>
            <p>Navigate Auxdibot&apos;s help menu with a detailed explanation of every Auxdibot module, command argument, and functionality.</p>
        </section>
        <motion.div initial={{ scale: 0 }} viewport={{ once: true }} whileInView={{ scale: 1 }} transition={{ duration: 0.5 }} className={'origin-top border border-white md:h-48 w-0 max-md:h-0 max-md:w-3/4 mx-auto top-full'}></motion.div>
        <section className={"flex flex-col items-center flex-1 gap-4 font-inter text-xl text-zinc-300 text-center px-2"}>
            <h1 className={"relative flex items-center justify-center gap-2"}>
            <motion.div initial={{ scale: 0, rotate: '45deg' }} viewport={{ once: true }} whileInView={{ scale: 1, rotate: '45deg' }} transition={{ duration: 0.5, delay: 0.75 }} className={'origin-top border border-white h-8 rotate-12 w-0 mx-auto mt-2'}></motion.div>
            <span className={"font-montserrat text-gray-200 text-4xl"}>setup auto</span>
            </h1>
            <p>Automatically setup Auxdibot for your server with a default suite of channels, roles, and settings that you can use immediately.</p>
        </section>
        </div>
        
    </section>
)
}