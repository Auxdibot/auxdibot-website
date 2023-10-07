"use client";
import { useRouter } from "next/navigation";
import { useState, createContext, Dispatch, SetStateAction, useContext, useEffect } from "react";
import { BsArrowRight, BsClock, BsGear, BsHammer, BsHouse, BsJournalBookmark, BsLaptop, BsList, BsPerson, BsQuestionCircle, BsShieldCheck, BsStar, BsTextLeft, BsTrophy } from "react-icons/bs";
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
    SETTINGS = "settings",
    LOGGING = "logging",
    MODERATION = "moderation",
    SCHEDULES = "schedules",
    PERMISSIONS = "permissions",
    EMBEDS = "embeds",
    STARBOARD = "starboard",
    SUGGESTIONS = "suggestions",
    LEVELS = "levels",
    ROLES = "roles",
    GREETINGS = "greetings",
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
            <li className={`pt-3 dashboard-sidebar-wrapper ${doc == SidebarCategories.SETTINGS ? "dashboard-sidebar-selected" : ""}`}>
                <span><BsArrowRight className={`${doc == SidebarCategories.SETTINGS ? "scale-75" : "scale-0 hidden"}`}/></span>
                <span onClick={() => changeCategory(SidebarCategories.SETTINGS)} className={`dashboard-sidebar-element ${doc == SidebarCategories.SETTINGS ? "dashboard-sidebar-selected-text" : ""}`}><BsGear/> Settings</span>
            </li>
            <li className={`pt-3 dashboard-sidebar-wrapper ${doc == SidebarCategories.LOGGING ? "dashboard-sidebar-selected" : ""}`}>
                <span><BsArrowRight className={`${doc == SidebarCategories.LOGGING ? "scale-75" : "scale-0 hidden"}`}/></span>
                <span onClick={() => changeCategory(SidebarCategories.LOGGING)} className={`dashboard-sidebar-element ${doc == SidebarCategories.LOGGING ? "dashboard-sidebar-selected-text" : ""}`}><BsJournalBookmark/> Logging</span>
            </li>
            <li className={`pt-3 dashboard-sidebar-wrapper ${doc == SidebarCategories.MODERATION ? "dashboard-sidebar-selected" : ""}`}>
                <span><BsArrowRight className={`${doc == SidebarCategories.MODERATION ? "scale-75" : "scale-0 hidden"}`}/></span>
                <span onClick={() => changeCategory(SidebarCategories.MODERATION)} className={`dashboard-sidebar-element ${doc == SidebarCategories.MODERATION ? "dashboard-sidebar-selected-text" : ""}`}><BsHammer/> Moderation</span>
            </li>
            <li className={`pt-3 dashboard-sidebar-wrapper ${doc == SidebarCategories.SCHEDULES ? "dashboard-sidebar-selected" : ""}`}>
                <span><BsArrowRight className={`${doc == SidebarCategories.SCHEDULES ? "scale-75" : "scale-0 hidden"}`}/></span>
                <span onClick={() => changeCategory(SidebarCategories.SCHEDULES)} className={`dashboard-sidebar-element ${doc == SidebarCategories.SCHEDULES ? "dashboard-sidebar-selected-text" : ""}`}><BsClock/> Schedules</span>
            </li>
            <li className={`pt-3 dashboard-sidebar-wrapper ${doc == SidebarCategories.PERMISSIONS ? "dashboard-sidebar-selected" : ""}`}>
                <span><BsArrowRight className={`${doc == SidebarCategories.PERMISSIONS ? "scale-75" : "scale-0 hidden"}`}/></span>
                <span onClick={() => changeCategory(SidebarCategories.PERMISSIONS)} className={`dashboard-sidebar-element ${doc == SidebarCategories.PERMISSIONS ? "dashboard-sidebar-selected-text" : ""}`}><BsShieldCheck/> Permissions</span>
            </li>
            <li className={`pt-3 dashboard-sidebar-wrapper ${doc == SidebarCategories.EMBEDS ? "dashboard-sidebar-selected" : ""}`}>
                <span><BsArrowRight className={`${doc == SidebarCategories.EMBEDS ? "scale-75" : "scale-0 hidden"}`}/></span>
                <span onClick={() => changeCategory(SidebarCategories.EMBEDS)} className={`dashboard-sidebar-element ${doc == SidebarCategories.EMBEDS ? "dashboard-sidebar-selected-text" : ""}`}><BsTextLeft/> Embeds</span>
            </li>
            <li className={`pt-3 dashboard-sidebar-wrapper ${doc == SidebarCategories.STARBOARD ? "dashboard-sidebar-selected" : ""}`}>
                <span><BsArrowRight className={`${doc == SidebarCategories.STARBOARD ? "scale-75" : "scale-0 hidden"}`}/></span>
                <span onClick={() => changeCategory(SidebarCategories.STARBOARD)} className={`dashboard-sidebar-element ${doc == SidebarCategories.STARBOARD ? "dashboard-sidebar-selected-text" : ""}`}><BsStar/> Starboard</span>
            </li>
            <li className={`pt-3 dashboard-sidebar-wrapper ${doc == SidebarCategories.SUGGESTIONS ? "dashboard-sidebar-selected" : ""}`}>
                <span><BsArrowRight className={`${doc == SidebarCategories.SUGGESTIONS ? "scale-75" : "scale-0 hidden"}`}/></span>
                <span onClick={() => changeCategory(SidebarCategories.SUGGESTIONS)} className={`dashboard-sidebar-element ${doc == SidebarCategories.SUGGESTIONS ? "dashboard-sidebar-selected-text" : ""}`}><BsQuestionCircle/> Suggestions</span>
            </li>
            <li className={`pt-3 dashboard-sidebar-wrapper ${doc == SidebarCategories.LEVELS ? "dashboard-sidebar-selected" : ""}`}>
                <span><BsArrowRight className={`${doc == SidebarCategories.LEVELS ? "scale-75" : "scale-0 hidden"}`}/></span>
                <span onClick={() => changeCategory(SidebarCategories.LEVELS)} className={`dashboard-sidebar-element ${doc == SidebarCategories.LEVELS ? "dashboard-sidebar-selected-text" : ""}`}><BsTrophy/> Levels</span>
            </li>
            <li className={`pt-3 dashboard-sidebar-wrapper ${doc == SidebarCategories.ROLES ? "dashboard-sidebar-selected" : ""}`}>
                <span><BsArrowRight className={`${doc == SidebarCategories.ROLES ? "scale-75" : "scale-0 hidden"}`}/></span>
                <span onClick={() => changeCategory(SidebarCategories.ROLES)} className={`dashboard-sidebar-element ${doc == SidebarCategories.ROLES ? "dashboard-sidebar-selected-text" : ""}`}><BsPerson/> Roles</span>
            </li>
            <li className={`pt-3 dashboard-sidebar-wrapper ${doc == SidebarCategories.GREETINGS ? "dashboard-sidebar-selected" : ""}`}>
                <span><BsArrowRight className={`${doc == SidebarCategories.GREETINGS ? "scale-75" : "scale-0 hidden"}`}/></span>
                <span onClick={() => changeCategory(SidebarCategories.GREETINGS)} className={`dashboard-sidebar-element ${doc == SidebarCategories.GREETINGS ? "dashboard-sidebar-selected-text" : ""}`}><PiHandWavingLight/> Greetings</span>
            </li>
        </ul>
        
    </nav></div></>);
}
