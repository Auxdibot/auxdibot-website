'use client';

import { Suspense, useEffect, useState, useRef } from 'react';
import { useQuery } from 'react-query';
import { BsThreeDots } from 'react-icons/bs';
import { User, Users } from 'lucide-react';

export default function Analytics() {
    const [serverState, setServerState] = useState('0');
    const [memberState, setMemberState] = useState('0');
    const serverRef = useRef<HTMLDivElement>(null);
    const memberRef = useRef<HTMLDivElement>(null);

    let { data: analytics, status } = useQuery(
        ['analytics'],
        async () =>
            await fetch('/bot/v1/analytics')
                .then(async (data) => await data.json().catch(() => {}))
                .catch(() => {})
    );

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5, // Adjust this threshold value as needed
        };
        const server = serverRef.current;
        const member = memberRef.current;
        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (entry.target === serverRef.current) {
                        animateServers();
                    } else if (entry.target === memberRef.current) {
                        animateMembers();
                    }
                }
            });
        };

        const animateServers = () => {
            if (status === 'success' && analytics?.servers) {
                let servers = 0;
                let end = parseInt(
                    analytics.servers.toString().substring(0, 3)
                );
                if (servers === end) return;
                let incTime = (1 / end) * 1000;
                let timer = setInterval(() => {
                    servers += 1;
                    setServerState(
                        String(servers) +
                            analytics.servers.toString().substring(3)
                    );
                    if (servers === end) clearInterval(timer);
                }, incTime);
            }
        };

        const animateMembers = () => {
            if (status === 'success' && analytics?.members) {
                let members = 0;
                let end = parseInt(
                    analytics.members.toString().substring(0, 3)
                );
                if (members === end) return;
                let incTime = (1 / end) * 1000;
                let timer = setInterval(() => {
                    members += 1;
                    setMemberState(
                        String(members) +
                            analytics.members.toString().substring(3)
                    );
                    if (members === end) clearInterval(timer);
                }, incTime);
            }
        };

        const observer = new IntersectionObserver(handleIntersection, options);

        if (serverRef.current) {
            observer.observe(serverRef.current);
        }

        if (memberRef.current) {
            observer.observe(memberRef.current);
        }

        return () => {
            if (server) {
                observer.unobserve(server);
            }

            if (member) {
                observer.unobserve(member);
            }
        };
    }, [analytics, status]);

    return (
        <Suspense fallback={<></>}>
            <div
                className={
                    'mx-auto flex w-full max-w-4xl justify-center gap-4 max-md:flex-col max-md:gap-5 max-md:px-10'
                }
            >
                <section
                    ref={serverRef}
                    className='flex w-full cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-zinc-800 bg-gradient-to-bl from-zinc-300/5 to-zinc-900/5 p-4 shadow transition-colors hover:bg-zinc-500/5'
                >
                    <p
                        className={
                            'flex w-max items-center gap-2 font-raleway text-6xl font-bold max-md:flex-col'
                        }
                    >
                        <span>
                            {status === 'loading' ? (
                                <BsThreeDots
                                    className={
                                        'animate-spin text-4xl text-white'
                                    }
                                />
                            ) : (
                                parseInt(serverState).toLocaleString()
                            )}
                        </span>
                    </p>
                    <h2
                        className={
                            'flex items-center gap-2 font-raleway text-3xl font-bold text-white'
                        }
                    >
                        <Users size={'32px'} /> Servers
                    </h2>
                </section>

                <section
                    ref={memberRef}
                    className='flex w-full cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-zinc-800 bg-gradient-to-bl from-zinc-300/5 to-zinc-900/5 p-4 shadow transition-colors hover:bg-zinc-500/5'
                >
                    <p
                        className={
                            'flex w-max items-center gap-2 font-raleway text-6xl font-bold max-md:flex-col'
                        }
                    >
                        <span>
                            {status === 'loading' ? (
                                <BsThreeDots
                                    className={
                                        'animate-spin text-4xl text-white'
                                    }
                                />
                            ) : (
                                parseInt(memberState).toLocaleString()
                            )}
                        </span>
                    </p>
                    <h2
                        className={
                            'flex items-center gap-2 font-raleway text-3xl font-bold text-white'
                        }
                    >
                        <User size={'32px'} /> Members
                    </h2>
                </section>
            </div>
        </Suspense>
    );
}
