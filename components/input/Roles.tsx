import { useEffect, useRef, useState } from "react";
import { BsArrowDownShort, BsAt, BsHash, BsX } from "react-icons/bs";
import { useQuery } from "react-query";
interface RolesInputProps {
    readonly serverID: string;
    readonly onChange: (e: { role: string | null }) => void;
    readonly value: string | null;
    readonly required?: boolean;
}
export default function Roles({ serverID, onChange, value, required }: RolesInputProps) {
    let { data: roles } = useQuery(["data_roles", serverID], async () => await fetch(`/api/v1/servers/${serverID}/roles`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    
    const [collapsed, setCollapsed] = useState(true);
    const inputRef = useRef<HTMLSpanElement | null>(null);
    useEffect(() => {
        const clickedOutside = (e: globalThis.MouseEvent) => {
          if (!collapsed && inputRef.current && !inputRef.current.contains(e.target as Node)) setCollapsed(true)
          
        }
        document.addEventListener("mousedown", clickedOutside)
        return () => document.removeEventListener("mousedown", clickedOutside);
      }, [collapsed])
    function change(role: string | null) {
        setCollapsed(!collapsed)
        onChange({ role: role || "" });
    }
    let roleValue = roles?.find((i: { id: string }) => i.id == value);
    return (<span className={"relative flex items-center"} ref={inputRef}>
            <span onClick={() => setCollapsed(!collapsed)} className={"flex items-center gap-1 group cursor-pointer bg-gray-700 p-1 rounded-lg font-open-sans"}>{value ? <BsAt className={"text-xl"} style={{ fill: roleValue?.color ? '#' + roleValue?.color.toString(16) : '' }}/> : required ? '' : <BsX/>} {value ? roleValue?.name :  required ? 'Select a role...' : 'No Role'} <span>
                <BsArrowDownShort className={"transition-all group-hover:translate-y-1"}/></span>
                </span>
            <div className={`absolute overflow-hidden border border-gray-500 transition-all shadow-xl bg-gray-700 rounded-lg w-max top-full translate-y-1 origin-top-left max-md:origin-top max-md:-translate-x-1/2 max-md:left-1/2 ${collapsed ? 'scale-0' : 'scale-100'}`}>
            <div className={`flex flex-col gap-1 max-h-60 overflow-y-scroll font-open-sans p-2`}>
            {required ? <a className={"cursor-pointer bg-gray-800 p-0.5 rounded-lg"} onClick={() => change('')}>Select a role...</a> : <a className={"flex items-center w-full gap-1 cursor-pointer hover:gap-2 transition-all p-0.5 rounded-lg bg-gray-800"} onClick={() => change(null)}><BsX/> No Role</a>}
            {roles?.map((i: { id: string, name: string, color: number }) => i.name != '@everyone' ? <a className={"flex items-center w-full gap-1 cursor-pointer hover:gap-2 transition-all p-0.5 rounded-lg bg-gray-800"} key={i.id} onClick={() => change(i.id)}><BsAt className={"text-xl"} style={{ fill: i.color ? '#' + i.color.toString(16) : '' }} /> {i.name}</a> : "")}
            </div>
            </div>
            
            </span>);
}