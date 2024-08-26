'use client';
import { useEffect, useRef, useState } from 'react';

const names = ['server', 'group', 'project', 'guild', 'chats', 'events'];

export default function Names() {
    const [text1, setText1] = useState(0);
    const [text2, setText2] = useState(-1);
    const text1Ref = useRef<HTMLSpanElement | null>(null);
    const text2Ref = useRef<HTMLSpanElement | null>(null);
    useEffect(() => {
        const interval = setInterval(() => {
            if (text2 <= text1) {
                if (text1 >= names.length - 1)
                    setTimeout(() => setText1(0), 750);
                setText2(text1 + 1 > names.length - 1 ? 0 : text1 + 1);
                text2Ref.current?.animate(
                    {
                        opacity: ['0', '1'],
                        transform: [
                            'translateY(-112px) translateX(0)',
                            'translateY(-48px) translateX(0)',
                        ],
                    },
                    { duration: 400, easing: 'ease-in-out', fill: 'forwards' }
                );
                text1Ref.current?.animate(
                    {
                        opacity: ['1', '0'],
                        transform: [
                            'translateY(0) translateX(0)',
                            'translateY(56px) translateX(0)',
                        ],
                    },
                    { duration: 400, easing: 'ease-in-out', fill: 'forwards' }
                );
            } else if (text1 <= text2) {
                if (text2 >= names.length - 1)
                    setTimeout(() => setText2(0), 750);
                setText1(text2 + 1 > names.length - 1 ? 0 : text2 + 1);
                text1Ref.current?.animate(
                    {
                        opacity: ['0', '1'],
                        transform: [
                            'translateY(-56px) translateX(0)',
                            'translateY(0px) translateX(0)',
                        ],
                    },
                    { duration: 400, easing: 'ease-in-out', fill: 'forwards' }
                );
                text2Ref.current?.animate(
                    {
                        opacity: ['1', '0'],
                        transform: [
                            'translateY(-56px) translateX(0)',
                            'translateY(0px) translateX(0)',
                        ],
                    },
                    { duration: 400, easing: 'ease-in-out', fill: 'forwards' }
                );
            }
        }, 2400);
        return () => clearInterval(interval);
    }, [text1, text2]);

    return (
        <div className='absolute -top-6 left-0 flex h-14 w-fit flex-col items-start overflow-hidden whitespace-nowrap text-left max-lg:left-1/2 max-lg:-translate-x-1/2 max-lg:items-center max-lg:text-center'>
            <span className={'header h-14 w-full text-5xl'} ref={text1Ref}>
                {names[text1]}
            </span>
            <span className={'header h-14 w-full text-5xl'} ref={text2Ref}>
                {names[text2]}
            </span>
        </div>
    );
}
