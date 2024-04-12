"use client";
import { HTMLAttributes, useContext, useEffect, useState } from "react";
import { RiArrowDropDownLine } from 'react-icons/ri';
import { ExpandedContext } from "./DocumentationSidebarContainer";
import { DocumentationSidebarSections } from "./DocumentationSidebarSections";

import { useRouter } from "next/navigation";

export type SidebarCategoryProps = HTMLAttributes<HTMLDivElement> & { docID: string, title: string, selected?: string }

export function SidebarCategory({ docID, title, selected, ...props }: SidebarCategoryProps) {


    const expanded = useContext(ExpandedContext);
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        if (!mounted) setMounted(true);
    }, [mounted])
    function change() {
        if (expanded) expanded.setExpanded(false);
        router.push(`/docs/${docID}`);

    }
    return <><section onClick={() => change()} className={`dashboard-sidebar-wrapper ${docID == selected ? "dashboard-sidebar-selected" : ""}`} {...props}>

        <span className={`dashboard-sidebar-element${docID == selected ? " dashboard-sidebar-selected-text" : ""}`}>
            <RiArrowDropDownLine className={`transition-transform text-3xl ${docID == selected ? "rotate-0" : "-rotate-90"}`} />
            {title}</span>
         </section>
        {docID == selected && mounted && <DocumentationSidebarSections />}
    </>;
}
