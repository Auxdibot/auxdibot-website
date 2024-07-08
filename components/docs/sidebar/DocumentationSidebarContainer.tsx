"use client";
import { useState, createRef, createContext, Dispatch, SetStateAction, useEffect } from "react";
import { BsList } from "react-icons/bs";
import { DocumentationSidebar } from "./DocumentationSidebar";

export const ExpandedContext = createContext<{ expanded: boolean, setExpanded: Dispatch<SetStateAction<boolean>> } | null>(null);


export default function DocumentationSidebarContainer({ doc, docList }: { doc: string | string[] | undefined, docList: { id: string, title: string }[]} ) {
    let [expanded, setExpanded] = useState(false);
    const ref = createRef<HTMLDivElement>();
    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setExpanded(false);
            }
        }
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        }
    }, [ref]);
    return (<ExpandedContext.Provider value={{ expanded, setExpanded }}><div className={"md:hidden fixed w-60 z-50 max-md:w-48"}>
    <div className={`transition-transform ${expanded ? "translate-x-0" : "-translate-x-60"}`}>
        <DocumentationSidebar docList={docList} doc={doc} />
    </div>
    <button className={`fixed top-16 text-4xl border-t-2 border-t-slate-950 bg-auxdibot-gradient bg-gray-950 transition-all pr-2 pb-2 rounded-br-full ${expanded ? "ml-60" : ""}`} onClick={() => setExpanded(!expanded)}>
        <BsList/>
    </button>
</div><div ref={ref} className={"max-md:hidden z-50"}><DocumentationSidebar docList={docList} doc={doc}/></div></ExpandedContext.Provider>)
}


