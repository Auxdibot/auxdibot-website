import { PunishmentNames } from "@/lib/constants/PunishmentNames";
import { PunishmentType } from "@/lib/types/PunishmentType";
import { useEffect, useRef, useState } from "react";
import { BsArrowDownShort, BsX } from "react-icons/bs";
interface PunishmentSelectProps {
    readonly onChange: (e: { type: PunishmentType | null }) => void;
    readonly value: PunishmentType | null;
    readonly required?: boolean;
    readonly deleteMessage?: boolean;
}
export default function PunishmentSelect({ onChange, value, required, deleteMessage }: PunishmentSelectProps) {
    const [collapsed, setCollapsed] = useState(true);
    const inputRef = useRef<HTMLSpanElement | null>(null);
    useEffect(() => {
        const clickedOutside = (e: globalThis.MouseEvent) => {
          if (!collapsed && inputRef.current && !inputRef.current.contains(e.target as Node)) setCollapsed(true)
          
        }
        document.addEventListener("mousedown", clickedOutside)
        return () => document.removeEventListener("mousedown", clickedOutside);
      }, [collapsed]);
    function change(type: PunishmentType | null) {
        setCollapsed(!collapsed)
        onChange({ type: type });
    }
    return (<span className={"relative flex items-center"} ref={inputRef}>
            <span onClick={() => setCollapsed(!collapsed)} className={"flex items-center gap-2 group cursor-pointer bg-gray-700 p-1 rounded-lg font-open-sans"}>{value ? PunishmentNames[value]?.icon : required ? '' : <BsX/>} {value ? PunishmentNames[value]?.name :  required ? 'Select a punishment...' : 'No Punishment'} <span>
                <BsArrowDownShort className={"transition-all group-hover:translate-y-1"}/></span>
                </span>
            <div className={`absolute z-10 overflow-hidden border border-gray-500 transition-all shadow-xl bg-gray-700 rounded-lg w-max top-full translate-y-1 origin-top-left max-md:origin-top max-md:-translate-x-1/2 max-md:left-1/2 ${collapsed ? 'scale-0' : 'scale-100 z-10'}`}>
            <div className={`flex flex-col gap-1 max-h-60 overflow-y-scroll font-open-sans p-2`}>
            {required ? <a className={"cursor-pointer bg-gray-800 p-0.5 rounded-lg"} onClick={() => change(null)}>Select a punishment...</a> : <a className={"flex items-center w-full gap-1 cursor-pointer hover:gap-2 transition-all p-0.5 rounded-lg bg-gray-800"} onClick={() => change(null)}><BsX/> No Punishment</a>}
            {(deleteMessage ? Object.keys(PunishmentNames) : Object.keys(PunishmentNames).filter((i) => i != 'DELETE_MESSAGE')).map((i: string) => <a className={"flex items-center w-full gap-2 cursor-pointer hover:gap-3 transition-all p-0.5 px-1 rounded-lg bg-gray-800"} key={i} onClick={() => change(i as PunishmentType)}>{PunishmentNames[i as PunishmentType].icon}{PunishmentNames[i as PunishmentType].name}</a>)}
            </div>
            </div>
            
            </span>);
}