'use client';

import { Icon } from '@/components/home/Icon';
import { PerspectiveCamera, PresentationControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { BsArrowDownShort } from 'react-icons/bs';
import { PremiumBenefits } from '../../components/premium/PremiumBenefits';
export default function PremiumPage() {
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
                    <div style={{ height: '200px', touchAction: 'none' }}>
                        <Canvas>
                            <ambientLight intensity={0.0} />
                            <PerspectiveCamera
                                makeDefault
                                position={[0, -1, 10]}
                            />
                            <Suspense fallback={null}>
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
                                        scale={[12, 12, 12]}
                                        rotation={[0, 0, 0]}
                                        randomColor1={'#eab308'}
                                        noRotate
                                        randomColor2={'#fef08a'}
                                    />
                                </PresentationControls>
                            </Suspense>
                        </Canvas>
                    </div>
                    <h1
                        className={
                            'premium-gradient bg-clip-text font-bauhaus text-6xl text-transparent'
                        }
                    >
                        auxdibot premium
                    </h1>
                    <p
                        className={
                            'mx-auto my-2 max-w-2xl font-open-sans text-lg'
                        }
                    >
                        Auxdibot premium is a paid subscription to Auxdibot,
                        granting subscribers access to the latest beta features,
                        increased limits, various features, swift communication
                        with our developers, and a unique role on our server!
                    </p>
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
            <div
                className={
                    'my-10 flex w-full max-w-4xl items-center justify-between gap-32 max-lg:max-w-xl max-lg:flex-col max-md:px-1'
                }
            >
                <div className={'relative w-full'}>
                    <div className='premium-gradient absolute -inset-1 opacity-75 blur-2xl'></div>
                    <section
                        className={
                            'relative flex w-full flex-col gap-10 rounded-2xl border border-black bg-background-300 bg-opacity-90 p-2 py-5'
                        }
                    >
                        <section className={'flex flex-col gap-2'}>
                            <h1
                                className={
                                    'premium-gradient w-full border-b-2 bg-clip-text py-1 pb-5 text-left font-bauhaus text-6xl text-transparent'
                                }
                            >
                                monthly
                            </h1>
                            <span
                                className={'text-left font-montserrat text-2xl'}
                            >
                                <span className={'text-4xl font-bold'}>
                                    $TBD
                                </span>{' '}
                                USD/mo
                            </span>
                        </section>
                        <ul className={'flex flex-col gap-1 text-left'}>
                            <PremiumBenefits />
                        </ul>
                    </section>
                </div>
                <div className={'relative w-full'}>
                    <div className='premium-gradient absolute -inset-1 opacity-75 blur-2xl'></div>
                    <section
                        className={
                            'relative flex w-full flex-col gap-10 rounded-2xl border border-black bg-background-300 bg-opacity-90 p-2 py-5'
                        }
                    >
                        <section className={'flex flex-col gap-2'}>
                            <h1
                                className={
                                    'premium-gradient w-full border-b-2 bg-clip-text py-1 pb-5 text-left font-bauhaus text-6xl text-transparent'
                                }
                            >
                                yearly
                            </h1>
                            <span
                                className={'text-left font-montserrat text-2xl'}
                            >
                                <span className={'text-4xl font-bold'}>
                                    $TBD
                                </span>{' '}
                                USD/yr
                            </span>
                        </section>
                        <ul className={'flex flex-col gap-1 text-left'}>
                            <PremiumBenefits />
                        </ul>
                    </section>
                </div>
            </div>
        </main>
    );
}
