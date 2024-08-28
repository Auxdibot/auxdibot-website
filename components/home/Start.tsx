'use client';
import { motion } from 'framer-motion';

export default function Start() {
    return (
        <section className={'mx-auto flex max-w-6xl flex-col gap-10'}>
            <div className='flex w-full flex-col items-center gap-2'>
                <motion.h1
                    initial={{ transform: 'translateY(-4rem)', opacity: 0 }}
                    viewport={{ once: true }}
                    whileInView={{ transform: 'translateY(0px)', opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className={
                        'mx-auto flex w-full flex-col bg-zinc-950 text-center font-raleway text-5xl font-bold max-md:text-4xl'
                    }
                >
                    Where do I start?
                </motion.h1>
                <span className='text-center font-inter text-xl text-zinc-300'>
                    Drop the hassle of setting up an abundance of parameters.
                    It&apos;s easy to setup and learn Auxdibot.
                </span>
            </div>

            <div className={'flex max-md:flex-col max-md:gap-10'}>
                <section
                    className={
                        'flex flex-1 flex-col items-center gap-4 px-2 text-center font-inter text-xl text-zinc-300'
                    }
                >
                    <h1
                        className={
                            'relative flex items-center justify-center gap-2'
                        }
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: '45deg' }}
                            viewport={{ once: true }}
                            whileInView={{ scale: 1, rotate: '45deg' }}
                            transition={{ duration: 0.5, delay: 0.75 }}
                            className={
                                'mx-auto mt-2 h-8 w-0 origin-top rotate-12 border border-white'
                            }
                        ></motion.div>
                        <span
                            className={'font-montserrat text-4xl text-zinc-200'}
                        >
                            help all
                        </span>
                    </h1>
                    <p>
                        Navigate Auxdibot&apos;s help menu with a detailed
                        explanation of every Auxdibot module, command argument,
                        and functionality.
                    </p>
                </section>
                <motion.div
                    initial={{ scale: 0 }}
                    viewport={{ once: true }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className={
                        'top-full mx-auto w-0 origin-top border border-white max-md:h-0 max-md:w-3/4 md:h-48'
                    }
                ></motion.div>
                <section
                    className={
                        'flex flex-1 flex-col items-center gap-4 px-2 text-center font-inter text-xl text-zinc-300'
                    }
                >
                    <h1
                        className={
                            'relative flex items-center justify-center gap-2'
                        }
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: '45deg' }}
                            viewport={{ once: true }}
                            whileInView={{ scale: 1, rotate: '45deg' }}
                            transition={{ duration: 0.5, delay: 0.75 }}
                            className={
                                'mx-auto mt-2 h-8 w-0 origin-top rotate-12 border border-white'
                            }
                        ></motion.div>
                        <span
                            className={'font-montserrat text-4xl text-gray-200'}
                        >
                            setup auto
                        </span>
                    </h1>
                    <p>
                        Automatically setup Auxdibot for your server with a
                        default suite of channels, roles, and settings that you
                        can use immediately.
                    </p>
                </section>
            </div>
        </section>
    );
}
