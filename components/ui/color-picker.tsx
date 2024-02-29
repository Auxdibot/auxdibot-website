"use client";

import { useEffect, useRef, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { BsX } from "react-icons/bs";

interface ColorPickerProps {
    readonly value: string;
    readonly onChange: (...event: any[]) => void;
    readonly string?: boolean;
    readonly md?:boolean;
}

export default function ColorPicker({ value, onChange, string, md }: ColorPickerProps) {
    const [expandedColor, setExpandedColor] = useState(false);
    const colorRef = useRef<HTMLLabelElement | null>(null);
    useEffect(() => {
        const clickedOutside = (e: globalThis.MouseEvent) => {
          if (expandedColor && colorRef.current && !colorRef.current.contains(e.target as Node)) setExpandedColor(false)
          
        }
        document.addEventListener("mousedown", clickedOutside)
        return () => document.removeEventListener("mousedown", clickedOutside);
      }, [expandedColor]);
    return <span ref={colorRef} className={`flex flex-row ${md ? '' : "max-md:"}:mx-auto gap-2 items-center font-open-sans text-xl relative`}>
    <span className={`flex flex-col ${md ? 'h-36' : "md:h-12"} relative ${md ? '' : "max-md:"}items-center`}>
    <span className={`secondary text-xl text-gray-300 flex items-center ${md ? '' : "max-md:"}justify-center gap-2 my-3`}>  
    <span className={"border text-white rounded-2xl w-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-lg cursor-pointer"} onClick={() => setExpandedColor(!expandedColor)}>
            <div className={"h-6 w-12 rounded-2xl shadow-2xl border border-white"} style={{ backgroundColor: value ? `#${value}` : "black" }}></div>
            </span> 
            <HexColorInput aria-valuenow={parseInt(value, 16)} color={value} className="flex h-9 font-open-sans rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300 w-20" onChange={(newColor) => onChange(!string ? parseInt(newColor.replace("#", ""), 16) : newColor.replace("#", ""))}/>
            <span className={"secondary text-xl text-gray-300 flex flex-row items-center gap-2"}><span className={"border border-gray-700 text-gray-600 rounded-2xl w-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-xl cursor-pointer"} onClick={() => onChange(undefined)}><BsX/></span></span>
    </span>
    {expandedColor && 
    <HexColorPicker aria-valuenow={parseInt(value, 16)} className={`md:absolute z-30 flex-none touch-none animate-colorPicker`} onChange={(newColor) => onChange(!string ? parseInt(newColor.replace("#", ""), 16) : newColor.replace("#", ""))}/> }
    </span>
   
    </span> ;
}   