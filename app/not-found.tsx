'use client';

import Button from '@/components/ui/button/primary-button';
import Image from 'next/image';
import { BsHouse } from 'react-icons/bs';
export default function NotFound() {
    return (
        <section
            className={
                'flex h-full flex-1 flex-shrink-0 flex-grow items-center justify-center bg-black bg-auxdibot-masthead align-middle'
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
                    width={128}
                    height={128}
                    priority
                />
                <h1 className={'header text-6xl lowercase max-md:text-5xl'}>
                    Not Found
                </h1>
                <p className={'text text-2xl'}>Couldn&apos;t find that page.</p>
                <Button icon={<BsHouse />} text={'Home'} href={'/'} />
            </div>
        </section>
    );
}
