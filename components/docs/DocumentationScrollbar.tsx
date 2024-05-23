"use client";
import { useScroll, motion, useMotionValueEvent, MotionValue } from "framer-motion";
import { useState } from "react";

export default function DocumentationScrollbar() {
    const { scrollY, scrollYProgress } = useScroll();
    const [hookedYPostion, setHookedYPosition] = useState(0 as MotionValue<number> | number);
    useMotionValueEvent(scrollY, "change", () => {
        setHookedYPosition(scrollYProgress)
    })
    return <motion.div style={{ scaleX: hookedYPostion }} className={"max-md:w-full md:w-[calc(100%-320px)] bottom-0 origin-center left-0 md:left-80 -translate-x-full fixed z-10 bg-orange-400 h-2"}></motion.div>;
}