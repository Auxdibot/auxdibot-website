'use client';
import { useEffect, useRef, useState } from 'react';

interface CountableProps {
    readonly start: number;
    readonly end: number;
}

export function Countable({ start, end }: CountableProps) {
    const [state, setState] = useState(start + '');
    const ref = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5, // Adjust this threshold value as needed
        };
        const item = ref.current;
        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (entry.target === ref.current) {
                        animateCount();
                    }
                }
            });
        };

        const animateCount = () => {
            let total = start;
            let endTotal = parseInt(end.toString().substring(0, 3));
            if (total === endTotal) return;
            let incTime = (1 / endTotal) * 1000;
            let timer = setInterval(() => {
                total += 1;
                setState(String(total) + end.toString().substring(3));
                if (total === endTotal) clearInterval(timer);
            }, incTime);
        };

        const observer = new IntersectionObserver(handleIntersection, options);
        if (item) {
            observer.observe(item);
        }

        return () => {
            if (item) {
                observer.unobserve(item);
            }
        };
    }, [start, end]);
    return <span ref={ref}>{parseInt(state).toLocaleString()}</span>;
}
