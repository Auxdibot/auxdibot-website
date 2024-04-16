"use client";
import { useScroll, motion, useMotionValueEvent, MotionValue } from "framer-motion";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
export default function DocumentationScrollbar() {
    const { scrollY, scrollYProgress } = useScroll();
    const media = useMediaQuery({ query: "(max-width: 768px)" });
    const [hookedYPostion, setHookedYPosition] = useState(0 as MotionValue<number> | number);
    useMotionValueEvent(scrollY, "change", () => {
        setHookedYPosition(scrollYProgress)
    })
    return <motion.div style={{ scaleX: hookedYPostion, width: `calc(100%${!media ? ' - 320px' : ''})` }} className={"w-full bottom-0 origin-center left-0 md:left-80 -translate-x-full fixed z-10 bg-orange-400 h-2"}></motion.div>;
}