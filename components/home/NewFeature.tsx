'use client';
import Image from 'next/image';

export function NewFeature() {
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
            <div className='relative w-full max-xl:overflow-hidden xl:min-h-[360px]'>
                <div
                    className={
                        'relative mx-auto my-20 max-xl:my-32 xl:absolute xl:-top-32 xl:left-1/2 xl:w-fit xl:-translate-x-1/2'
                    }
                >
                    <div className='absolute -inset-0 z-10 rotate-2 bg-gradient-to-br from-primary-100 to-primary-600 blur-3xl max-xl:inset-x-48 max-lg:inset-x-24 max-sm:inset-x-0 xl:inset-y-20' />
                    <Image
                        src='/user-installed3.png'
                        className='relative z-10 mx-auto my-20 w-[98%] max-w-xl rotate-2 rounded-2xl'
                        alt='User-Installed Commands & Reminders'
                        width={0}
                        height={0}
                        sizes='100vw'
                        quality={100}
                    />
                </div>
                <div
                    className={
                        'relative mx-auto my-20 max-xl:my-32 xl:absolute xl:-top-4 xl:left-1/2 xl:w-fit'
                    }
                >
                    <div className='absolute inset-0 z-10 -rotate-6 bg-gradient-to-br from-primary-100 to-primary-600 blur-2xl max-xl:inset-x-48 max-lg:inset-x-24 max-sm:inset-x-0 xl:inset-y-20' />
                    <Image
                        src='/user-installed2.png'
                        className='relative z-20 mx-auto my-20 w-[98%] max-w-xl -rotate-6 rounded-2xl'
                        alt='User-Installed Commands & Reminders'
                        width={0}
                        height={0}
                        sizes='100vw'
                        quality={100}
                    />
                </div>
                <div
                    className={
                        'relative mx-auto my-20 max-xl:my-32 xl:absolute xl:-top-4 xl:right-1/2 xl:w-fit'
                    }
                >
                    <div className='absolute inset-0 z-10 rotate-2 bg-gradient-to-br from-primary-100 to-primary-600 blur-2xl max-xl:inset-x-48 max-lg:inset-x-24 max-sm:inset-x-0 xl:inset-y-20' />
                    <Image
                        src='/user-installed.png'
                        className='relative z-20 mx-auto my-20 w-[98%] max-w-xl rotate-2 rounded-2xl'
                        alt='User-Installed Commands & Reminders'
                        width={0}
                        height={0}
                        sizes='100vw'
                        quality={100}
                    />
                </div>
            </div>
        </section>
    );
}
