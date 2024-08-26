'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BsDiscord, BsThreeDots } from 'react-icons/bs';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, PresentationControls } from '@react-three/drei';
import { Icon } from './Icon';
import { useMediaQuery } from 'react-responsive';
import { HeaderButton } from '../ui/header-button';
import { Book } from 'lucide-react';

export default function AboutBot() {
    const [isServer, setIsServer] = useState(true);
    const mobile = useMediaQuery({ query: '(max-width: 1024px)' });
    const variants = useMemo(
        () =>
            mobile && !isServer
                ? { transform: 'translateY(-4rem)', opacity: 0 }
                : { transform: 'translateX(-4rem)', opacity: 0 },
        [mobile, isServer]
    );
    const canvasVariants = useMemo(
        () =>
            mobile && !isServer
                ? { transform: 'translateY(-4rem)', opacity: 0 }
                : { transform: 'translateX(4rem)', opacity: 0 },
        [mobile, isServer]
    );
    useEffect(() => {
        if (isServer) {
            setIsServer(false);
        }
    }, [isServer]);
    return (
        <section className={'w-full'}>
            <section
                className={
                    'mx-auto flex min-h-[400px] w-full max-w-7xl items-center justify-center gap-10 max-lg:flex-col-reverse max-lg:overflow-x-hidden'
                }
            >
                <div className='max-w-2xl flex-1'>
                    <div className='max-xl flex flex-col gap-4'>
                        <motion.h1
                            initial={variants}
                            viewport={{ once: true }}
                            whileInView={{
                                transform: 'translateX(0px)',
                                opacity: 1,
                            }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className={
                                'header flex w-full flex-col justify-center text-left text-6xl lowercase max-lg:mx-auto max-lg:items-center max-lg:text-center'
                            }
                        >
                            About Auxdibot
                        </motion.h1>
                        <motion.p
                            initial={variants}
                            viewport={{ once: true }}
                            whileInView={{
                                transform: 'translateX(0px) translateY(0px)',
                                opacity: 1,
                            }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className={
                                'custom-underline font-inter text-xl text-zinc-200 max-lg:text-center'
                            }
                        >
                            Auxdibot is a Discord bot project founded and
                            maintained by{' '}
                            <Link
                                href={'https://auxdible.me'}
                                className={
                                    'before:hover-underline relative font-raleway text-xl font-bold before:bg-gradient-to-br before:from-primary-100 before:to-primary-600 hover:before:scale-100'
                                }
                            >
                                Auxdible
                            </Link>
                            . Auxdibot features a wide variety of features for
                            admins to manage their servers with. Auxdibot
                            receives consistent updates and constant bug fixes,
                            making it a reliable choice for your server!
                        </motion.p>

                        <span className='flex items-center gap-5 max-lg:justify-center max-[320px]:flex-col'>
                            <motion.span
                                initial={{
                                    transform: 'translateY(2rem)',
                                    opacity: 0,
                                }}
                                viewport={{ once: true }}
                                whileInView={{
                                    transform: 'translateY(0px)',
                                    opacity: 1,
                                }}
                                transition={{ duration: 0.5, delay: 1 }}
                            >
                                <HeaderButton
                                    className='flex w-fit text-xl font-bold'
                                    href={
                                        process.env
                                            .NEXT_PUBLIC_DOCUMENTATION_LINK
                                    }
                                >
                                    <span className='flex items-center gap-2'>
                                        <Book /> Documentation
                                    </span>
                                </HeaderButton>
                            </motion.span>
                            <motion.span
                                initial={{
                                    transform: 'translateY(2rem)',
                                    opacity: 0,
                                }}
                                viewport={{ once: true }}
                                whileInView={{
                                    transform: 'translateY(0px)',
                                    opacity: 1,
                                }}
                                transition={{ duration: 0.5, delay: 1.2 }}
                            >
                                <HeaderButton
                                    className='flex w-fit px-1 py-1 text-xl font-bold'
                                    href={
                                        process.env
                                            .NEXT_PUBLIC_DISCORD_SERVER_LINK
                                    }
                                >
                                    <span className='flex items-center gap-2'>
                                        <BsDiscord /> Support
                                    </span>
                                </HeaderButton>
                            </motion.span>
                        </span>
                    </div>
                </div>
                <motion.div
                    initial={canvasVariants}
                    viewport={{ once: true }}
                    whileInView={{
                        transform: 'translateX(0px) translateY(0px)',
                        opacity: 1,
                    }}
                    transition={{ duration: 0.5 }}
                    className='max-w-xl touch-none max-lg:h-[200px] max-lg:w-[250px] lg:flex-1 lg:self-stretch'
                >
                    <Suspense
                        fallback={
                            <BsThreeDots
                                className={'animate-spin text-4xl text-white'}
                            />
                        }
                    >
                        <Canvas>
                            <ambientLight intensity={0.0} />
                            <PerspectiveCamera
                                makeDefault
                                position={[0, -1, 20]}
                            />
                            <Suspense fallback={null}>
                                {mobile ? (
                                    <PresentationControls
                                        global={false}
                                        cursor={true}
                                        config={{ mass: 2, tension: 500 }}
                                        snap={{ mass: 4, tension: 1500 }}
                                        rotation={[0, 0, 0]}
                                        polar={[-Math.PI / 3, Math.PI / 3]}
                                        azimuth={[-Math.PI / 5, Math.PI / 5]}
                                    >
                                        <Icon
                                            frustumCulled={false}
                                            scale={[26.5, 26.5, 26.5]}
                                            rotation={[0, 0, 0]}
                                            frontToBack
                                        />
                                    </PresentationControls>
                                ) : (
                                    <Icon
                                        frustumCulled={false}
                                        scale={[20, 20, 20]}
                                        frontToBack
                                    />
                                )}
                            </Suspense>
                        </Canvas>
                    </Suspense>
                </motion.div>
            </section>
        </section>
    );
}
