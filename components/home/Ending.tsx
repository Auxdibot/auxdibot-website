'use client';
import { motion } from 'framer-motion';
import { BsDiscord, BsGithub } from 'react-icons/bs';
import Link from 'next/link';

export function Ending() {
    return (
        <section
            className={'mx-auto flex max-w-4xl flex-col gap-10 text-center'}
        >
            <span
                className={'flex justify-center gap-2 text-6xl max-md:text-5xl'}
            >
                <motion.h1
                    className={'header'}
                    initial={{ transform: 'translateY(-2rem)', opacity: 0 }}
                    viewport={{ once: true }}
                    whileInView={{ transform: 'translateY(0px)', opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    more
                </motion.h1>
                <motion.h1
                    className={'header'}
                    initial={{ transform: 'translateY(-2rem)', opacity: 0 }}
                    viewport={{ once: true }}
                    whileInView={{ transform: 'translateY(0px)', opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                >
                    to
                </motion.h1>
                <motion.h1
                    className={'header'}
                    initial={{ transform: 'translateY(-2rem)', opacity: 0 }}
                    viewport={{ once: true }}
                    whileInView={{ transform: 'translateY(0px)', opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                >
                    come
                </motion.h1>
            </span>
            <motion.span
                initial={{ transform: 'translateY(-2rem)', opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ transform: 'translateY(0px)', opacity: 1 }}
                transition={{ duration: 0.5, delay: 2 }}
                className={'mx-auto flex w-full max-w-lg items-center'}
            >
                <Link
                    href={process.env.NEXT_PUBLIC_DISCORD_SERVER_LINK || ''}
                    className={
                        'group mx-auto flex flex-row items-center gap-2 text-center font-open-sans max-md:flex-col'
                    }
                >
                    <BsDiscord
                        className={
                            'text-6xl transition-all group-hover:text-discord-primary max-sm:text-4xl'
                        }
                    />
                </Link>

                <Link
                    href={'https://github.com/Auxdibot'}
                    className={
                        'group mx-auto flex flex-row items-center gap-2 text-center font-open-sans max-md:flex-col'
                    }
                >
                    <BsGithub
                        className={
                            'text-6xl transition-all group-hover:text-orange-500 max-sm:text-4xl'
                        }
                    />
                </Link>
            </motion.span>
            <motion.p
                initial={{ transform: 'translateY(-4rem)', opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ transform: 'translateY(0px)', opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.3 }}
                className={'font-inter text-2xl text-zinc-400'}
            >
                We&apos;re not done here. Auxdibot is a project founded by a
                single passionate developer with a drive to create better
                communities online. Get updates on new features, bug fixes, and
                more by joining our Discord server.
            </motion.p>
        </section>
    );
}
