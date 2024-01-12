"use client";

import { useEffect, useRef, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";

interface ColorPickerProps {
    readonly value: number;
    readonly onChange: (...event: any[]) => void;
    readonly string?: boolean;
}

export default function ColorPicker({ value, onChange, string }: ColorPickerProps) {
    const [expandedColor, setExpandedColor] = useState(false);
    const colorRef = useRef<HTMLLabelElement | null>(null);
    useEffect(() => {
        const clickedOutside = (e: globalThis.MouseEvent) => {
          if (expandedColor && colorRef.current && !colorRef.current.contains(e.target as Node)) setExpandedColor(false)
          
        }
        document.addEventListener("mousedown", clickedOutside)
        return () => document.removeEventListener("mousedown", clickedOutside);
      }, [expandedColor]);
    return <span ref={colorRef} className={"flex flex-row max-md:mx-auto gap-2 items-center font-open-sans text-xl relative"}>
    <span className={"flex flex-col md:h-12 relative max-md:items-center"}>
    <span className={"secondary text-xl text-gray-300 flex flex-row max-md:flex-col items-center max-md:justify-center gap-2 my-3"}>  
    <span className={"border text-white rounded-2xl w-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-lg cursor-pointer"} onClick={() => setExpandedColor(!expandedColor)}>
            <div className={"h-6 w-12 rounded-2xl shadow-2xl border border-white"} style={{ backgroundColor: value ? `#${value.toString(16)}` : "black" }}></div>
            </span> Set Color
            <HexColorInput aria-valuenow={value} color={value?.toString(16)} className={"text-md rounded-xl  px-1"} onChange={(newColor) => onChange(!string ? parseInt(newColor.replace("#", ""), 16) : newColor.replace("#", ""))}/>
        
    </span>
    {expandedColor && 
    <HexColorPicker aria-valuenow={value} className={`md:absolute md:z-30 flex-none touch-none animate-colorPicker`} onChange={(newColor) => onChange(!string ? parseInt(newColor.replace("#", ""), 16) : newColor.replace("#", ""))}/> }
    </span>
   
    </span> ;
}   