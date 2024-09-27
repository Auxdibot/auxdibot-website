'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
export function NewFeature() {
    const isMaxXL = useMediaQuery({ query: '(max-width: 1280px)' });
    return (
        <section className='flex flex-col gap-10'>
            <div
                className={
                    'mx-auto flex max-w-5xl flex-col items-center gap-2 text-center'
                }
            >
                <h1 className='header text-6xl lowercase'>New on auxdibot</h1>
                <h2 className='font-raleway text-4xl font-bold'>
                    User-Installed Commands & Reminders
                </h2>
                <span className='font-inter text-xl'>
                    Remind yourself of events, view user information and more
                    with Auxdibot&apos;s new User-Installed Commands &
                    Reminders!
                </span>
            </div>
            <div className='relative w-full max-xl:overflow-x-hidden xl:min-h-[360px]'>
                <motion.div
                    initial={{
                        top: !isMaxXL ? '0rem' : '2rem',
                        left: !isMaxXL ? '30%' : '0%',
                        opacity: 0,
                        transform: `rotate(5deg)`,
                    }}
                    whileInView={{
                        top: !isMaxXL ? '-8rem' : '0rem',
                        left: !isMaxXL ? '50%' : '0%',
                        opacity: 1,
                        transform: `rotate(2deg)${!isMaxXL ? ' translateX(-50%)' : ''}`,
                    }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className={
                        'relative mx-auto my-20 rotate-2 max-xl:my-32 xl:absolute xl:-top-32 xl:left-1/2 xl:w-fit xl:-translate-x-1/2'
                    }
                >
                    <div className='absolute -inset-0 z-10 bg-gradient-to-br from-primary-100 to-primary-600 blur-3xl max-xl:inset-x-48 max-lg:inset-x-24 max-sm:inset-x-0 xl:inset-y-20' />
                    <Image
                        src='/user-installed3.png'
                        className='relative z-10 mx-auto my-20 w-[98%] max-w-xl rounded-2xl'
                        alt='User-Installed Commands & Reminders'
                        width={0}
                        height={0}
                        sizes='100vw'
                        quality={100}
                    />
                </motion.div>
                <motion.div
                    initial={{
                        top: '5rem',
                        left: !isMaxXL ? '60%' : '0%',
                        opacity: 0,
                        transform: `rotate(-3deg)`,
                    }}
                    whileInView={{
                        top: !isMaxXL ? '-1rem' : '0',
                        left: !isMaxXL ? '50%' : '0%',
                        opacity: 1,
                        transform: `rotate(-6deg)`,
                    }}
                    transition={{ duration: 1, delay: 0.75 }}
                    viewport={{ once: true }}
                    className={
                        'relative mx-auto my-20 max-xl:my-32 xl:absolute xl:-top-4 xl:left-1/2 xl:w-fit'
                    }
                >
                    <div className='absolute inset-0 z-10 bg-gradient-to-br from-primary-100 to-primary-600 blur-2xl max-xl:inset-x-48 max-lg:inset-x-24 max-sm:inset-x-0 xl:inset-y-20' />
                    <Image
                        src='/user-installed2.png'
                        className='relative z-20 mx-auto my-20 w-[98%] max-w-xl rounded-2xl'
                        alt='User-Installed Commands & Reminders'
                        width={0}
                        height={0}
                        sizes='100vw'
                        quality={100}
                    />
                </motion.div>
                <motion.div
                    initial={{
                        top: '5rem',
                        right: !isMaxXL ? '60%' : '0%',
                        opacity: 0,
                        transform: `rotate(4deg)`,
                    }}
                    whileInView={{
                        top: !isMaxXL ? '-1rem' : '0',
                        right: !isMaxXL ? '50%' : '0%',
                        opacity: 1,
                        transform: `rotate(2deg)`,
                    }}
                    transition={{ duration: 1, delay: 1 }}
                    viewport={{ once: true }}
                    className={
                        'relative mx-auto my-20 max-xl:my-32 xl:absolute xl:-top-4 xl:right-1/2 xl:w-fit'
                    }
                >
                    <div className='absolute inset-0 z-10 bg-gradient-to-br from-primary-100 to-primary-600 blur-2xl max-xl:inset-x-48 max-lg:inset-x-24 max-sm:inset-x-0 xl:inset-y-20' />
                    <Image
                        src='/user-installed.png'
                        className='relative z-20 mx-auto my-20 w-[98%] max-w-xl rounded-2xl'
                        alt='User-Installed Commands & Reminders'
                        width={0}
                        height={0}
                        sizes='100vw'
                        quality={100}
                    />
                </motion.div>
            </div>
        </section>
    );
}
