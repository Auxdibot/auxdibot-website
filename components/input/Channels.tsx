import { useEffect, useRef, useState } from "react";
import { BsArrowDownShort, BsHash, BsX } from "react-icons/bs";
import { useQuery } from "react-query";
interface ChannelsInputProps {
    readonly serverID: string;
    readonly onChange: (e: { channel: string | null }) => void;
    readonly value: string | null;
    readonly required?: boolean;
}
export default function Channels({ serverID, onChange, value, required }: ChannelsInputProps) {
    let { data: channels } = useQuery(["data_channels", serverID], async () => await fetch(`/api/v1/servers/${serverID}/channels`).then(async (data) => 
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
    function change(channel: string | null) {
        setCollapsed(!collapsed)
        onChange({ channel: channel || "" });
    }
    return (<span className={"relative flex items-center"} ref={inputRef}>
            <span onClick={() => setCollapsed(!collapsed)} className={"flex items-center gap-1 group cursor-pointer bg-gray-700 p-1 rounded-lg font-open-sans"}>{value ? <BsHash/> : required ? '' : <BsX/>} {value ? channels?.find((i: { id: string }) => i.id == value)?.name :  required ? 'Select a channel...' : 'No Channel'} <span>
                <BsArrowDownShort className={"transition-all group-hover:translate-y-1"}/></span>
                </span>
            <div className={`absolute z-10 overflow-hidden border border-gray-500 transition-all shadow-xl bg-gray-700 rounded-lg w-max top-full translate-y-1 origin-top-left max-md:origin-top max-md:-translate-x-1/2 max-md:left-1/2 ${collapsed ? 'scale-0' : 'scale-100 z-10'}`}>
            <div className={`flex flex-col gap-1 max-h-60 overflow-y-scroll font-open-sans p-2`}>
            {required ? <a className={"cursor-pointer bg-gray-800 p-0.5 rounded-lg"} onClick={() => change('')}>Select a channel...</a> : <a className={"flex items-center w-full gap-1 cursor-pointer hover:gap-2 transition-all p-0.5 rounded-lg bg-gray-800"} onClick={() => change(null)}><BsX/> No Channel</a>}
            {channels?.map((i: { id: string, name: string }) => <a className={"flex items-center w-full gap-1 cursor-pointer hover:gap-2 transition-all p-0.5 rounded-lg bg-gray-800"} key={i.id} onClick={() => change(i.id)}><BsHash/> {i.name}</a>)}
            </div>
            </div>
            
            </span>);
}