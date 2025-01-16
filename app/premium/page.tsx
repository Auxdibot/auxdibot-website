'use client';

import { Icon } from '@/components/home/Icon';
import { PerspectiveCamera, PresentationControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { BsArrowDownShort, BsThreeDots } from 'react-icons/bs';
import { PremiumBenefits } from '../../components/premium/PremiumBenefits';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { HeaderButton } from '@/components/ui/header-button';
import { DollarSign } from 'lucide-react';
import { Marquee } from '@/components/ui/marquee';
import Image from 'next/image';
export default function PremiumPage() {
    const mobile = useMediaQuery({ query: '(max-width: 1024px)' });

    return (
        <main
            className={
                'flex min-h-screen w-full flex-col items-center justify-center bg-black'
            }
        >
            <div
                className={
                    'flex min-h-screen w-full flex-col items-center justify-center bg-auxdibot-premium-masthead text-center'
                }
            >
                <div className={'mt-auto w-full'}>
                    <div className='mx-auto h-[400px] touch-none max-lg:w-full'>
                        <Suspense
                            fallback={
                                <BsThreeDots
                                    className={
                                        'animate-spin text-4xl text-white'
                                    }
                                />
                            }
                        >
                            <Canvas>
                                <ambientLight intensity={0.0} />
                                <PerspectiveCamera
                                    makeDefault
                                    position={[0, -1, mobile ? 30 : 25]}
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
                                            azimuth={[
                                                -Math.PI / 5,
                                                Math.PI / 5,
                                            ]}
                                        >
                                            <Icon
                                                frustumCulled={false}
                                                scale={[26.5, 26.5, 26.5]}
                                                rotation={[0, 0, 0]}
                                                randomColor1={'#eab308'}
                                                randomColor2={'#fef08a'}
                                            />
                                        </PresentationControls>
                                    ) : (
                                        <Icon
                                            frustumCulled={false}
                                            scale={[20, 20, 20]}
                                            randomColor2={'#fef08a'}
                                            randomColor1={'#eab308'}
                                        />
                                    )}
                                </Suspense>
                            </Canvas>
                        </Suspense>
                    </div>
                    <h1
                        className={
                            'mx-auto my-2 max-w-2xl font-raleway text-6xl font-bold max-lg:text-5xl'
                        }
                    >
                        Support Auxdibot. Grow your{' '}
                        <span
                            className={
                                'premium-gradient bg-clip-text font-bauhaus text-6xl font-normal text-transparent max-lg:text-5xl'
                            }
                        >
                            community
                        </span>
                        .
                    </h1>
                    <Marquee
                        className={'font-raleway text-4xl max-2xl:text-2xl'}
                    >
                        <span className='m-8 flex-1 whitespace-nowrap'>
                            Unlimited Storage
                        </span>
                        <span className='m-8 flex-1 whitespace-nowrap'>
                            Exclusive Role
                        </span>
                        <span className='m-8 flex-1 whitespace-nowrap'>
                            Premium Features
                        </span>
                        <span className='m-8 flex-1 whitespace-nowrap'>
                            Instant Support
                        </span>
                        <span className='m-8 flex-1 whitespace-nowrap'>
                            Beta Features
                        </span>
                        <span className='m-8 flex-1 whitespace-nowrap'>
                            Improved Moderation
                        </span>
                        <span className='m-8 flex-1 whitespace-nowrap'>
                            Exclusive Badge
                        </span>
                    </Marquee>
                </div>

                <span
                    className={
                        'mt-auto flex flex-col items-center justify-center gap-2 font-open-sans text-2xl'
                    }
                >
                    See more below
                    <BsArrowDownShort className={'animate-bounce'} />
                </span>
            </div>
            <section
                className={
                    'my-20 flex flex-1 flex-col items-center gap-4 text-center'
                }
            >
                <div>
                    <motion.h1
                        className={
                            'premium-gradient bg-clip-text py-2 font-bauhaus text-6xl text-transparent max-lg:text-5xl'
                        }
                        initial={{
                            transform: 'translateY(-2rem)',
                            opacity: 0,
                        }}
                        viewport={{ once: true }}
                        whileInView={{
                            transform: 'translateY(0px)',
                            opacity: 1,
                        }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        the ultimate auxdibot package
                    </motion.h1>
                </div>

                <p className={'max-w-2xl font-inter text-xl text-zinc-200'}>
                    Unlock Auxdibot Premium and continue to build your community
                    with the best tools available. Support the future of
                    Auxdibot and help us continue to grow.
                </p>

                <div
                    className={
                        'my-10 flex w-full max-w-6xl items-center justify-between gap-32 max-lg:max-w-xl max-lg:flex-col max-md:px-1'
                    }
                >
                    <div className={'relative w-full self-stretch'}>
                        <div className='premium-gradient absolute -inset-1 opacity-75 blur-3xl'></div>
                        <section
                            className={
                                'relative flex w-full flex-col items-center justify-center gap-10 rounded-2xl border border-zinc-900 bg-zinc-950 p-2 py-5'
                            }
                        >
                            <section className={'flex w-full flex-col gap-2'}>
                                <h1
                                    className={
                                        'premium-gradient w-full border-b-2 border-zinc-900 bg-clip-text py-1 pb-5 text-center font-bauhaus text-6xl text-transparent'
                                    }
                                >
                                    premium
                                </h1>
                                <span className={'font-montserrat text-2xl'}>
                                    <span
                                        className={
                                            'font-raleway text-4xl font-bold'
                                        }
                                    >
                                        4.99$
                                    </span>{' '}
                                    USD/mo
                                </span>
                            </section>
                            <ul
                                className={
                                    'flex flex-col items-center gap-1 text-center'
                                }
                            >
                                <PremiumBenefits />
                            </ul>
                            <HeaderButton
                                href={
                                    process.env
                                        .NEXT_PUBLIC_DISCORD_PREMIUM_LINK ?? ''
                                }
                                className={
                                    'w-fit font-raleway text-2xl font-bold'
                                }
                                gradientClass={
                                    'from-yellow-200 to-yellow-500 group-hover:from-yellow-500 group-hover:to-yellow-500'
                                }
                            >
                                <span className='flex items-center gap-2'>
                                    <DollarSign size={24} /> Get Premium
                                </span>
                            </HeaderButton>
                        </section>
                    </div>
                    <div className={'relative flex w-full self-stretch'}>
                        <div className='absolute -inset-1 bg-gradient-to-tr from-blue-700 to-purple-400 opacity-75 blur-3xl'></div>
                        <section
                            className={
                                'relative flex w-full flex-col items-center gap-10 self-stretch rounded-2xl border border-zinc-900 bg-zinc-950 p-2 py-5'
                            }
                        >
                            <section className={'w-fullwe flex flex-col gap-2'}>
                                <h1
                                    className={
                                        'w-full border-b-2 border-zinc-900 bg-clip-text py-1 pb-5 text-center font-raleway text-6xl font-bold'
                                    }
                                >
                                    Coming Soon
                                </h1>
                            </section>
                            <p className={'font-inter text-xl text-zinc-400'}>
                                This is a soon-to-be subscription type for
                                Auxdibot. More on this coming soon. Stay updated
                                with Auxdibot through our Discord server, or
                                through our announcement messages.
                            </p>
                        </section>
                    </div>
                </div>
            </section>
            <section className='my-20 flex w-full flex-col gap-20'>
                <article
                    className={
                        'mx-auto flex flex-1 flex-row items-center gap-20 text-left max-lg:mb-10 max-lg:flex-col max-lg:gap-5 max-lg:text-center'
                    }
                >
                    <div>
                        <motion.h1
                            className={
                                'premium-gradient bg-clip-text py-2 font-bauhaus text-5xl text-transparent sm:whitespace-nowrap'
                            }
                            initial={{
                                transform: 'translateX(-2rem)',
                                opacity: 0,
                            }}
                            viewport={{ once: true }}
                            whileInView={{
                                transform: 'translateX(0px)',
                                opacity: 1,
                            }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            enhanced moderation
                        </motion.h1>
                        <p className={'max-w-xl font-inter text-zinc-200'}>
                            Enhance your moderation capabilities with Auxdibot
                            with infinite punishments. Additionally, unlock an
                            appeals system that allows users to submit appeals
                            for punishments for your moderators to review.
                        </p>
                    </div>
                    <Image
                        src={'/premium/moderation.png'}
                        className='relative z-20 mx-auto w-[98%] max-w-2xl rounded-2xl border-4 border-yellow-500'
                        alt='Appeals'
                        width={0}
                        height={0}
                        sizes='100vw'
                        quality={100}
                    />
                </article>
                <article
                    className={
                        'mx-auto flex flex-1 flex-row-reverse items-center gap-20 text-left max-lg:flex-col max-lg:gap-5 max-lg:text-center'
                    }
                >
                    <div>
                        <motion.h1
                            className={
                                'premium-gradient bg-clip-text py-2 font-bauhaus text-5xl text-transparent'
                            }
                            initial={{
                                transform: 'translateX(-2rem)',
                                opacity: 0,
                            }}
                            viewport={{ once: true }}
                            whileInView={{
                                transform: 'translateX(0px)',
                                opacity: 1,
                            }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            stand out
                        </motion.h1>
                        <p className={'max-w-xl font-inter text-zinc-200'}>
                            Customize the appearance of your level card, and
                            receive a unique border for your avatar across every
                            Auxdibot server! Users who donate to Auxdibot can
                            recieve an exclusive role on Auxdibot&apos;s Discord
                            server, as well as a badge their premium servers.
                        </p>
                    </div>
                    <Image
                        src={'/premium/levels.png'}
                        className='relative z-20 mx-auto w-[98%] max-w-2xl rounded-2xl border-4 border-yellow-500'
                        alt='Level card preview'
                        width={0}
                        height={0}
                        sizes='100vw'
                        quality={100}
                    />
                </article>
                <article
                    className={
                        'flex flex-1 flex-col items-center gap-4 text-center'
                    }
                >
                    <div>
                        <motion.h1
                            className={
                                'premium-gradient bg-clip-text py-2 font-bauhaus text-5xl text-transparent'
                            }
                            initial={{
                                transform: 'translateY(-2rem)',
                                opacity: 0,
                            }}
                            viewport={{ once: true }}
                            whileInView={{
                                transform: 'translateY(0px)',
                                opacity: 1,
                            }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            support auxdibot
                        </motion.h1>
                        <span className='font-inter text-lg text-zinc-400'>
                            Support the future of Discord apps.
                        </span>
                    </div>

                    <p className={'max-w-lg font-inter text-zinc-200'}>
                        100% of all donations will go towards the growth of
                        Auxdibot. Your donation will help us maintain our
                        servers, develop new features, and allow us to continue
                        to grow Auxdibot.
                    </p>
                </article>
                <article
                    className={
                        'flex flex-1 flex-col items-center gap-4 text-center'
                    }
                >
                    <div>
                        <motion.h1
                            className={
                                'premium-gradient bg-clip-text py-2 font-bauhaus text-5xl text-transparent'
                            }
                            initial={{
                                transform: 'translateY(-2rem)',
                                opacity: 0,
                            }}
                            viewport={{ once: true }}
                            whileInView={{
                                transform: 'translateY(0px)',
                                opacity: 1,
                            }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            one sub, many servers
                        </motion.h1>
                        <span className='font-inter text-lg text-zinc-400'>
                            A three-in-one package!
                        </span>
                    </div>

                    <p className={'max-w-lg font-inter text-zinc-200'}>
                        Users who donate to Auxdibot can unlock premium benefits
                        across three Discord servers, even if they are not the
                        server owner. Enjoy premium features on multiple servers
                        with just one donation.
                    </p>
                </article>
                <article
                    className={
                        'flex flex-1 flex-col items-center gap-4 text-center'
                    }
                >
                    <div>
                        <motion.h1
                            className={
                                'premium-gradient bg-clip-text py-2 font-bauhaus text-5xl text-transparent'
                            }
                            initial={{
                                transform: 'translateY(-2rem)',
                                opacity: 0,
                            }}
                            viewport={{ once: true }}
                            whileInView={{
                                transform: 'translateY(0px)',
                                opacity: 1,
                            }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            unlimited storage
                        </motion.h1>
                        <span className='font-inter text-lg text-zinc-400'>
                            More EVERYTHING. More Auxdibot.
                        </span>
                    </div>

                    <p className={'max-w-lg font-inter text-zinc-200'}>
                        Auxdibot Premium users will have access to unlimited
                        storage for punishments, suggestions, and more. Never
                        worry about running out of space again.
                    </p>
                </article>
                <article
                    className={
                        'flex flex-1 flex-col items-center gap-4 text-center'
                    }
                >
                    <div>
                        <motion.h1
                            className={
                                'premium-gradient bg-clip-text py-2 font-bauhaus text-5xl text-transparent'
                            }
                            initial={{
                                transform: 'translateY(-2rem)',
                                opacity: 0,
                            }}
                            viewport={{ once: true }}
                            whileInView={{
                                transform: 'translateY(0px)',
                                opacity: 1,
                            }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            the latest and greatest
                        </motion.h1>
                        <span className='font-inter text-lg text-zinc-400'>
                            The newest Auxdibot features, now.
                        </span>
                    </div>

                    <p className={'max-w-lg font-inter text-zinc-200'}>
                        Auxdibot Premium users will have access to beta versions
                        of new features before they are released to the public.
                        Help us test new features and provide feedback to help
                        us improve Auxdibot.
                    </p>
                </article>
            </section>
        </main>
    );
}
