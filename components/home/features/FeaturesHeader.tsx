"use client";
import { motion } from 'framer-motion';

export function FeaturesHeader() {
    return (<div className='flex flex-col my-5 items-center gap-2 justify-center'>
        <motion.h2 initial={{ transform: "translateY(-4rem)", opacity: 0 }} viewport={{ once: true }} whileInView={{ transform: "translateY(0px)", opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className='font-raleway secondary-gradient bg-zinc-950 z-10 relative w-full text-center text-5xl tracking-wide text-zinc-200 font-bold'>
            What do we offer?
        </motion.h2>
        <span className='font-inter text-xl text-zinc-300'>
            More than enough for any Discord server to grow their community.
        </span>
    </div>)
}