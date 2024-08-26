'use client';

import Button from '@/components/ui/button/primary-button';
import Image from 'next/image';
import { BsHouse } from 'react-icons/bs';
export default function UnderConstruction() {
    return (
        <section
            className={
                'flex h-full flex-1 flex-grow items-center justify-center bg-black bg-auxdibot-masthead align-middle'
            }
        >
            <div
                className={
                    'flex flex-col items-center justify-center gap-4 text-center'
                }
            >
                <Image
                    src={'/logo.png'}
                    alt={'Auxdibot icon.'}
                    width={216}
                    height={216}
                    priority
                />
                <h1 className={'header text-6xl max-md:text-5xl'}>
                    under construction
                </h1>
                <p className={'text text-2xl'}>
                    This part of the website is still being worked on! Check
                    back later.
                </p>
                <Button icon={<BsHouse />} text={'Home'} href={'/'} />
            </div>
        </section>
    );
}
