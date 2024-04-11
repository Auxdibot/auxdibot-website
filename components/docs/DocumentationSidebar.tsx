"use client";
import { useRouter } from "next/navigation";
import { useState, createContext, Dispatch, SetStateAction, useContext, useEffect } from "react";
import { BsArrowRight, BsGear, BsHouse, BsJournalBookmark, BsLaptop, BsList } from "react-icons/bs";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";

const ExpandedContext = createContext<{ expanded: boolean, setExpanded: Dispatch<SetStateAction<boolean>> } | null>(null);
export default function DocumentationSidebarContainer({ doc }: { doc: string | string[] | undefined }) {
    let [expanded, setExpanded] = useState(false);
    return (<ExpandedContext.Provider value={{ expanded, setExpanded }}><div className={"md:hidden fixed w-64 z-50 max-md:w-48"}>
    <div className={`transition-transform ${expanded ? "translate-x-0" : "-translate-x-64"}`}>
        <DocumentationSidebar doc={doc} />
    </div>
    <button className={`fixed top-16 text-4xl border-t-2 border-t-slate-950 bg-auxdibot-gradient bg-gray-950 transition-all pr-2 pb-2 rounded-br-full ${expanded ? "ml-64" : ""}`} onClick={() => setExpanded(!expanded)}>
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
    const [content, setContent] = useState<{ id: string, name: string, children?: { id: string, name: string }[]}[]>([]);
    useEffect(() => {
        if (!mounted) {
            setMounted(true);
            setDoc(typeof docPage == 'object' ? docPage[0] : docPage?.toString() || "home");
        }
        setContent(Array.from(document.querySelectorAll("h2[id]").entries()).map(([_, el]) => {
            let id = el.id;
            let name = el.textContent || "";
            let children = [];
            let next = el.nextElementSibling;
            while (next && next.tagName != "H2") {
                if (next.tagName == "H3") {
                    children.push({ id: next.id, name: next.textContent || "" });
                }
                next = next.nextElementSibling;
            }
            return { id, name, children };
        }
        ));
    }, [mounted, docPage])
    function changeCategory(category: SidebarCategories) {;

        if (category != "home") router.push(`/docs/${category}`);
        else router.push(`/docs/`)
        setTimeout(() => contextExpanded?.setExpanded(false), 50);
    }
    return (<><div className={"w-80 flex-shrink-0 h-screen"}>
     <nav className={`flex fixed w-80 max-md:w-64 h-full bg-gray-950 border-r-2 border-gray-800`}>
        <ScrollArea  className=" overflow-y-auto  overflow-visible border-b-0 pb-20">
        <div className="flex flex-col gap-3 py-5">
            <Image src="/logo.png" width={100} height={100} alt="Auxdibot Logo" className="mx-auto"/>
            <h1 className="font-montserrat text-3xl text-center">Auxdibot Documentation</h1>
        </div>
        <div className={"flex flex-col w-full"}>
        <section className={`dashboard-sidebar-wrapper ${doc == SidebarCategories.HOME ? "dashboard-sidebar-selected" : ""}`}>
                <span><BsArrowRight className={`${doc == SidebarCategories.HOME ? "scale-75" : "scale-0 hidden"}`}/></span>
                <span onClick={() => changeCategory(SidebarCategories.HOME)} className={`dashboard-sidebar-element ${doc == SidebarCategories.HOME ? "dashboard-sidebar-selected-text" : ""}`}><BsHouse/> Home</span>
        </section>
        {doc == SidebarCategories.HOME && <DocumentationSidebarSections content={content}/>}
        <section className={`dashboard-sidebar-wrapper ${doc == SidebarCategories.DASHBOARD ? "dashboard-sidebar-selected" : ""}`}>
                <span><BsArrowRight className={`${doc == SidebarCategories.DASHBOARD ? "scale-75" : "scale-0 hidden"}`}/></span>
                <span onClick={() => changeCategory(SidebarCategories.DASHBOARD)} className={`dashboard-sidebar-element ${doc == SidebarCategories.DASHBOARD ? "dashboard-sidebar-selected-text" : ""}`}><BsLaptop/> Dashboard</span>
            </section>
        {doc == SidebarCategories.DASHBOARD && <DocumentationSidebarSections content={content}/>}
        <section className={`dashboard-sidebar-wrapper ${doc == SidebarCategories.COMMANDS ? "dashboard-sidebar-selected" : ""}`}>
                <span><BsArrowRight className={`${doc == SidebarCategories.COMMANDS ? "scale-75" : "scale-0 hidden"}`}/></span>
                <span onClick={() => changeCategory(SidebarCategories.COMMANDS)} className={`dashboard-sidebar-element ${doc == SidebarCategories.COMMANDS ? "dashboard-sidebar-selected-text" : ""}`}><BsGear/> Commands</span>
        </section>
        {doc == SidebarCategories.COMMANDS && <DocumentationSidebarSections content={content}/>}
        <section className={`dashboard-sidebar-wrapper ${doc == SidebarCategories.LOGGING ? "dashboard-sidebar-selected" : ""}`}>
                <span><BsArrowRight className={`${doc == SidebarCategories.LOGGING ? "scale-75" : "scale-0 hidden"}`}/></span>
                <span onClick={() => changeCategory(SidebarCategories.LOGGING)} className={`dashboard-sidebar-element ${doc == SidebarCategories.LOGGING ? "dashboard-sidebar-selected-text" : ""}`}><BsJournalBookmark/> Logging</span>
        </section>
        {doc == SidebarCategories.LOGGING && <DocumentationSidebarSections content={content}/>}
        </div>
        </ScrollArea>
        
    </nav></div></>);
}
function DocumentationSidebarSections({ content }: { content: {id: string, name: string, children?: { id: string, name: string }[]}[] }) {

    const contextExpanded = useContext(ExpandedContext);
    const [inView, setInView] = useState<string | null>()
    useEffect(() => {
        let isSet = false;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !isSet) {
                    setInView(entry.target.id);
                    isSet = true;
                } else {
                    
                    if (inView === entry.target.id && isSet) {
                        setInView(null);
                    }
                }
                
            });
            if (!isSet) {
                setInView(entries[entries.length-1].target.id)
            }
        });
        
        content.forEach(({ id, children }) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
            children?.forEach(({ id }) => {
                const childElement = document.getElementById(id);
                if (childElement) {
                    observer.observe(childElement);
                }
            });
        });

        return () => {
            observer.disconnect();
        };
    }, [content, inView]);

    return <ul className={`pl-8 flex flex-col gap-2 mt-2 text-lg`}>
        {content.map(({ id, name, children }, index) => {
                return <li key={index} className={"flex flex-col w-full gap-2"}>
                    <span className={`font-open-sans flex gap-5 r w-fit pr-4`}>

                        <section className="relative group cursor-pointer w-fit before:hover-underline before:hover:scale-100 before:bg-white" onClick={() => { 

                            contextExpanded?.setExpanded(false) 
                            window.scroll({ top: (document.getElementById(id)?.offsetTop || 0) - 100, behavior: "smooth" });
                        }}>{name} </section>
                        <div className={`w-2 rounded-xl self-stretch ${inView == id ? 'bg-orange-500' : ""}`}/>
                    </span>
                    {children && children.length > 0 && <ul className={`pl-4 font-roboto text-sm gap-0.5 flex flex-col`}>
                    {children?.map((child, index) => {
                        return <li className={'cursor-pointer flex gap-5'} key={index} onClick={() => {

                            contextExpanded?.setExpanded(false) 
                            window.scroll({ top: (document.getElementById(child.id)?.offsetTop || 0) - 100, behavior: "smooth" });
                        }}>{child.name} <div className={`w-2 rounded-xl self-stretch ${inView == child.id ? 'bg-orange-500' : ""}`}/></li>
                    })}
                    </ul>}
                </li>
            }
        )}
    </ul>
}