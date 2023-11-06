"use client";
import { useRouter } from "next/navigation";
import { useState, createContext, Dispatch, SetStateAction, useContext, useEffect } from "react";
import { BsArrowRight, BsBook, BsClock, BsCommand, BsGear, BsHammer, BsHouse, BsJournalBookmark, BsLaptop, BsList, BsPerson, BsQuestion, BsQuestionCircle, BsShieldCheck, BsSlash, BsStar, BsTerminal, BsTextLeft, BsTrophy } from "react-icons/bs";
import { PiHandWavingLight } from "react-icons/pi";

const ExpandedContext = createContext<{ expanded: boolean, setExpanded: Dispatch<SetStateAction<boolean>> } | null>(null);
export default function DocumentationSidebarContainer({ doc }: { doc: string | string[] | undefined }) {
    let [expanded, setExpanded] = useState(false);
    return (<ExpandedContext.Provider value={{ expanded, setExpanded }}><div className={"md:hidden fixed w-64 z-50 max-md:w-48"}>
    <div className={`transition-transform ${expanded ? "translate-x-0" : "-translate-x-48"}`}>
        <DocumentationSidebar doc={doc} />
    </div>
    <button className={`fixed text-3xl border-t-2 border-t-gray-700 bg-gray-600 transition-all pr-2 pb-2 rounded-br-full ${expanded ? "ml-48" : ""}`} onClick={() => setExpanded(!expanded)}>
        <BsList/>
    </button>
</div><div className={"max-md:hidden"}><DocumentationSidebar doc={doc}/></div></ExpandedContext.Provider>)
}
enum SidebarCategories {
    HOME = "home",
    DASHBOARD = "dashboard",
    COMMANDS = "commands",
    LOGGING = "logging",
    MODERATION = "moderation",
}
export function DocumentationSidebar({ doc: docPage }: { doc: string | string[] | undefined }) {
    const router = useRouter();
    const contextExpanded = useContext(ExpandedContext);
    const [doc, setDoc] = useState("");
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        if (!mounted) {
            setMounted(true);
            setDoc(typeof docPage == 'object' ? docPage[0] : docPage?.toString() || "home");
        }
    }, [mounted, docPage])
    function changeCategory(category: SidebarCategories) {;

        if (category != "home") router.push(`/docs/${category}`);
        else router.push(`/docs/`)
        setTimeout(() => contextExpanded?.setExpanded(false), 50);
    }
    return (<><div className={"w-64 flex-shrink-0"}>
    <nav className={`flex flex-col fixed h-screen w-64 max-md:w-48 bg-gray-600 border-t-2 border-gray-700`}>
        <ul className={"flex flex-col"}>
        <li className={`pt-3 dashboard-sidebar-wrapper ${doc == SidebarCategories.HOME ? "dashboard-sidebar-selected" : ""}`}>
                <span><BsArrowRight className={`${doc == SidebarCategories.HOME ? "scale-75" : "scale-0 hidden"}`}/></span>
                <span onClick={() => changeCategory(SidebarCategories.HOME)} className={`dashboard-sidebar-element ${doc == SidebarCategories.HOME ? "dashboard-sidebar-selected-text" : ""}`}><BsHouse/> Home</span>
            </li>
            <li className={`pt-3 dashboard-sidebar-wrapper ${doc == SidebarCategories.DASHBOARD ? "dashboard-sidebar-selected" : ""}`}>
                <span><BsArrowRight className={`${doc == SidebarCategories.DASHBOARD ? "scale-75" : "scale-0 hidden"}`}/></span>
                <span onClick={() => changeCategory(SidebarCategories.DASHBOARD)} className={`dashboard-sidebar-element ${doc == SidebarCategories.DASHBOARD ? "dashboard-sidebar-selected-text" : ""}`}><BsLaptop/> Dashboard</span>
            </li>
            <li className={`pt-3 dashboard-sidebar-wrapper ${doc == SidebarCategories.COMMANDS ? "dashboard-sidebar-selected" : ""}`}>
                <span><BsArrowRight className={`${doc == SidebarCategories.COMMANDS ? "scale-75" : "scale-0 hidden"}`}/></span>
                <span onClick={() => changeCategory(SidebarCategories.COMMANDS)} className={`dashboard-sidebar-element ${doc == SidebarCategories.COMMANDS ? "dashboard-sidebar-selected-text" : ""}`}><BsGear/> Commands</span>
            </li>
            <li className={`pt-3 dashboard-sidebar-wrapper ${doc == SidebarCategories.LOGGING ? "dashboard-sidebar-selected" : ""}`}>
                <span><BsArrowRight className={`${doc == SidebarCategories.LOGGING ? "scale-75" : "scale-0 hidden"}`}/></span>
                <span onClick={() => changeCategory(SidebarCategories.LOGGING)} className={`dashboard-sidebar-element ${doc == SidebarCategories.LOGGING ? "dashboard-sidebar-selected-text" : ""}`}><BsJournalBookmark/> Logging</span>
            </li>
        </ul>
        
    </nav></div></>);
}
