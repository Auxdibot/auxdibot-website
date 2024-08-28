'use client';
import Image from 'next/image';
import Names from './Names';
import { HeaderButton } from '../ui/header-button';
import { Sparkle } from 'lucide-react';
import { DashboardButton } from './DashboardButton';
import { useEffect, useState } from 'react';

const images = [
    '/masthead/masthead1.png',
    '/masthead/masthead2.png',
    '/masthead/masthead3.png',
    '/masthead/masthead4.png',
    '/masthead/masthead8.png',
    '/masthead/masthead5.png',
    '/masthead/masthead6.png',
    '/masthead/masthead7.png',
];

export default function Masthead() {
    const [img1State, setImg1State] = useState(0);
    const [img2State, setImg2State] = useState(1);
    const [changeImg, setChangeImg] = useState(false);
    useEffect(() => {
        const interval = setInterval(() => {
            setChangeImg((prev) => {
                setTimeout(
                    () =>
                        !changeImg
                            ? setImg1State((prev) => (prev + 1) % images.length)
                            : setImg2State(
                                  (prev) => (prev + 1) % images.length
                              ),
                    1050
                );
                return !prev;
            });
        }, 5000);
        return () => clearInterval(interval);
    }, [changeImg]);
    return (
        <section
            className={
                'min-h-screen w-full bg-zinc-950 bg-auxdibot-masthead pt-8 max-lg:pt-16'
            }
        >
            <section className={'flex min-h-screen justify-center'}>
                <div
                    className={
                        'flex w-full flex-col items-center justify-center gap-4 max-lg:flex-col'
                    }
                >
                    <div className='relative h-[560px] w-full max-lg:h-[520px] max-md:h-[480px]'>
                        <div className='absolute left-2 top-12 z-20 max-lg:left-1/2 max-lg:top-0 max-lg:w-[calc(100%-5rem)] max-lg:-translate-x-1/2'>
                            <div className='absolute z-10 flex h-[360px] w-[640px] rounded-t-2xl bg-black max-lg:left-0 max-lg:top-0 max-lg:h-56 max-lg:w-full max-md:h-48'>
                                <div className='absolute top-0 z-40 h-[360px] w-full bg-gradient-to-b from-transparent from-70% to-zinc-950 max-lg:h-56 max-md:h-48' />
                                <Image
                                    src={
                                        images[(img2State + 2) % images.length]
                                    }
                                    alt='test'
                                    width={0}
                                    height={0}
                                    sizes='100vw'
                                    className={`absolute top-0 h-[360px] w-full rounded-t-2xl object-cover object-left-top shadow-2xl transition-opacity duration-1000 ${!changeImg ? 'opacity-0' : 'opacity-100'}`}
                                    quality={100}
                                    priority
                                />
                                <Image
                                    src={
                                        images[(img1State + 2) % images.length]
                                    }
                                    alt='test'
                                    width={0}
                                    height={0}
                                    sizes='100vw'
                                    className={`absolute top-0 h-[360px] w-full rounded-t-2xl object-cover object-left-top shadow-2xl transition-opacity duration-1000 ${!changeImg ? 'opacity-100' : 'opacity-0'}`}
                                    quality={100}
                                    priority
                                />
                            </div>
                        </div>
                        <div className='absolute left-1/2 top-0 z-30 -translate-x-1/2 max-lg:top-12 max-lg:w-[calc(100%-1rem)] max-md:top-16'>
                            <div className='absolute right-1/2 top-0 z-40 flex h-[480px] w-[1024px] translate-x-1/2 rounded-t-2xl bg-black bg-gradient-to-b from-transparent from-70% to-zinc-950 max-lg:h-96 max-lg:w-full max-md:h-72'>
                                <div className='absolute top-0 z-40 h-[480px] w-full bg-gradient-to-b from-transparent from-70% to-zinc-950 max-lg:h-96 max-md:h-72' />
                                <Image
                                    src={
                                        images[(img1State + 1) % images.length]
                                    }
                                    alt='test'
                                    width={0}
                                    height={0}
                                    sizes='100vw'
                                    className={`absolute top-0 h-[480px] w-full rounded-t-2xl object-cover object-left-top shadow-2xl transition-opacity duration-1000 max-lg:h-96 max-md:h-72 ${changeImg ? 'opacity-0' : 'opacity-100'}`}
                                    quality={100}
                                    priority
                                />
                                <Image
                                    src={
                                        images[(img2State + 1) % images.length]
                                    }
                                    alt='test'
                                    width={0}
                                    height={0}
                                    sizes='100vw'
                                    className={`absolute top-0 h-[480px] w-full rounded-t-2xl object-cover object-left-top shadow-2xl transition-opacity duration-1000 max-lg:h-96 max-md:h-72 ${changeImg ? 'opacity-100' : 'opacity-0'}`}
                                    quality={100}
                                    priority
                                />
                            </div>
                        </div>
                        <div className='absolute right-2 top-12 z-20 max-lg:right-1/2 max-lg:top-32 max-lg:w-[calc(100%-5rem)] max-lg:translate-x-1/2 max-md:top-16'>
                            <div className='absolute right-0 z-10 flex h-[360px] w-[640px] rounded-t-2xl bg-black max-lg:right-0 max-lg:top-0 max-lg:h-56 max-lg:w-full max-md:h-48'>
                                <div className='absolute top-0 z-40 h-[360px] w-full bg-gradient-to-b from-transparent from-70% to-zinc-950 max-lg:h-56 max-md:h-48' />
                                <Image
                                    src={images[img2State % images.length]}
                                    alt='test'
                                    width={0}
                                    height={0}
                                    sizes='100vw'
                                    className={`absolute top-0 h-[360px] w-full rounded-t-2xl object-cover object-left-top shadow-2xl transition-opacity duration-1000 ${!changeImg ? 'opacity-0' : 'opacity-100'}`}
                                    quality={100}
                                    priority
                                />
                                <Image
                                    src={images[img1State % images.length]}
                                    alt='test'
                                    width={0}
                                    height={0}
                                    sizes='100vw'
                                    className={`absolute top-0 h-[360px] w-full rounded-t-2xl object-cover object-left-top shadow-2xl transition-opacity duration-1000 ${!changeImg ? 'opacity-100' : 'opacity-0'}`}
                                    quality={100}
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                    <span
                        className={
                            'mx-auto flex w-full items-center justify-center gap-3 font-raleway text-5xl text-zinc-100 max-lg:mb-10 max-lg:flex-col max-lg:gap-10 max-lg:text-center'
                        }
                    >
                        <span className='font-bold tracking-wide'>
                            The next Discord app for your
                        </span>
                        <span className='relative w-32 overflow-visible lg:text-left'>
                            <Names />
                        </span>
                    </span>
                    <span className='flex w-full max-w-xl items-center max-lg:flex-col max-lg:justify-center max-lg:gap-5'>
                        <div className='flex flex-1 justify-center'>
                            <HeaderButton
                                className='flex text-2xl font-bold'
                                href={
                                    process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK
                                }
                            >
                                <span className='flex items-center gap-2'>
                                    <Sparkle /> Get Auxdibot
                                </span>
                            </HeaderButton>
                        </div>
                        <div className='flex flex-1 justify-center'>
                            <DashboardButton />
                        </div>
                    </span>
                </div>
            </section>
        </section>
    );
}
