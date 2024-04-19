import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

export function FeatureColumn({ children, reverse }: { children: any; reverse?: boolean; }) {
    /*
        I had to do some weird crap to get this to work, because for some reason react-responsive wasn't initializing the isMobile state properly.
    */
    const [isMobile, setMobile] = useState(global.window ? window?.innerWidth < 1024 : false);
    useMediaQuery({ query: "(max-width: 1024px)" }, undefined, (matches) => setMobile(matches));
    const child1 = useRef<HTMLDivElement | null>(null);
    const child2 = useRef<HTMLDivElement | null>(null);
    const sectionRef = useRef<HTMLDivElement | null>(null);
    let animation = useRef<Animation | undefined>(undefined);
    let animation2 = useRef<Animation | undefined>(undefined);
    useEffect(() => {
        if (isMobile == undefined) return;
        if (animation)
            animation.current?.cancel();
        if (animation2)
            animation2.current?.cancel();
        animation.current = child1.current?.animate([
            { transform: "translateY(0px)" },
            { transform: !isMobile && reverse ? "translateY(100%)" : "translateY(-100%)" }
        ], {
            duration: 30000,
            iterations: Infinity
        });
        animation2.current = child2.current?.animate([
            { transform: !isMobile && reverse ? "translateY(-100%)" : "translateY(100%)" },
            { transform: "translateY(0px)" }
        ], {
            duration: 30000,
            iterations: Infinity
        });

        const handleMouseEnter = () => {
            if (isMobile) return;
            animation.current?.pause();
            animation2.current?.pause();
        };

        const handleMouseLeave = () => {
            animation.current?.play();
            animation2.current?.play();
        };

        sectionRef.current?.addEventListener('mouseenter', handleMouseEnter);
        sectionRef.current?.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            animation.current?.cancel();
            animation2.current?.cancel();
            sectionRef.current?.removeEventListener('mouseenter', handleMouseEnter);
            sectionRef.current?.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isMobile, reverse]);

    return <section ref={sectionRef} className={"relative h-[800px] flex flex-col gap-4 overflow-visible max-lg:overflow-hidden"}>
        <div className={"absolute z-30 bg-gradient-to-b from-black via-transparent from-5% to-95% via-50% to-black self-stretch w-full top-0 h-[800px] pointer-events-none lg:hidden"} />
        <div ref={child1} className={`absolute flex flex-col gap-4 ${reverse ? 'pt-4' : ''}`}>{children}</div>
        <div ref={child2} className={`absolute flex flex-col gap-4 ${!reverse || isMobile ? 'pt-4' : ''}`}>{children}</div>
    </section>;
}
