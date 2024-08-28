'use client';
import { motion } from 'framer-motion';

export function FeaturesHeader() {
    return (
        <div className='my-5 flex flex-col items-center justify-center gap-2'>
            <motion.h2
                initial={{ transform: 'translateY(-4rem)', opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ transform: 'translateY(0px)', opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className='secondary-gradient relative z-10 w-full bg-zinc-950 text-center font-raleway text-5xl font-bold tracking-wide text-zinc-200 max-md:text-4xl'
            >
                What do we offer?
            </motion.h2>
            <span className='font-inter text-xl text-zinc-300 max-lg:text-center max-md:text-lg'>
                More than enough for any Discord server to grow their community.
            </span>
        </div>
    );
}
