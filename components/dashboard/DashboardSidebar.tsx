"use client";
import NotFound from "@/app/not-found";
import DashboardSidebarContext from "@/context/DashboardSidebarContext";
import useSession from "@/lib/hooks/useSession";
import DiscordGuild from "@/lib/types/DiscordGuild";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, createContext, Dispatch, SetStateAction, useContext } from "react";
import { BsArrowRight, BsClock, BsGear, BsHammer, BsJournalBookmark, BsList, BsQuestionCircle, BsShieldCheck, BsStar, BsTextLeft, BsTrophy } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";

const ExpandedContext = createContext<{ expanded: boolean, setExpanded: Dispatch<SetStateAction<boolean>> } | null>(null);
export default function DashboardSidebarContainer({ serverID }: { serverID: string }) {
    let [expanded, setExpanded] = useState(false);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const { user, status } = useSession();
    if (status == "loading") return <></>
    if (status == "unauthenticated") return <></>
    let server = user.guilds.find((i: DiscordGuild) => i.id == serverID);
    return (<ExpandedContext.Provider value={{ expanded, setExpanded }}>{isMobile ? <div className={"fixed w-64 z-50 max-md:w-48"}>
        <div className={`transition-transform ${expanded ? "translate-x-0" : "-translate-x-48"}`}>
            <DashboardSidebar server={server} />
        </div>
        <button className={`fixed text-3xl border-t-2 border-t-gray-700 bg-gray-600 transition-all pr-2 pb-2 rounded-br-full ${expanded ? "ml-48" : ""}`} onClick={() => setExpanded(!expanded)}>
            <BsList/>
        </button>
    </div> : <DashboardSidebar server={server}/>}</ExpandedContext.Provider>)
}
enum SidebarCategories {
    HOME = "home",
    SETTINGS = "settings",
    LOGGING = "logging",
    MODERATION = "moderation",
    SCHEDULES = "schedules",
    PERMISSIONS = "permissions",
    EMBEDS = "embeds",
    STARBOARD = "starboard",
    SUGGESTIONS = "suggestions",
    LEVELS = "levels",
    
}
export function DashboardSidebar({ server }: { server?: DiscordGuild }) {
    const router = useRouter();
    const contextPage = useContext(DashboardSidebarContext)
    const contextExpanded = useContext(ExpandedContext);
    let page = contextPage ? contextPage.page : "home";
    function changeCategory(category: SidebarCategories) {
        if (!server) return;

        if (category != "home") router.push(`/dashboard/${server.id}/${category}`);
        else router.push(`/dashboard/${server.id}/`)
        setTimeout(() => contextExpanded?.setExpanded(false), 50);
    }
    if (!server) return (<NotFound/>);
    return (<><div className={"w-64 flex-shrink-0"}>
    <nav className={`fixed h-screen w-64 max-md:w-48 bg-gray-600 border-t-2 border-gray-700`}>
        <ul className={"flex flex-col"}>
            <li className={`pt-3 dashboard-sidebar-wrapper ${page == SidebarCategories.SETTINGS ? "dashboard-sidebar-selected" : ""}`}>
                <span><BsArrowRight className={`${page == SidebarCategories.SETTINGS ? "scale-75" : "scale-0 hidden"}`}/></span>
                <span onClick={() => changeCategory(SidebarCategories.SETTINGS)} className={`dashboard-sidebar-element ${page == SidebarCategories.SETTINGS ? "dashboard-sidebar-selected-text" : ""}`}><BsGear/> Settings</span>
            </li>
            <li className={`pt-3 dashboard-sidebar-wrapper ${page == SidebarCategories.LOGGING ? "dashboard-sidebar-selected" : ""}`}>
                <span><BsArrowRight className={`${page == SidebarCategories.LOGGING ? "scale-75" : "scale-0 hidden"}`}/></span>
                <span onClick={() => changeCategory(SidebarCategories.LOGGING)} className={`dashboard-sidebar-element ${page == SidebarCategories.LOGGING ? "dashboard-sidebar-selected-text" : ""}`}><BsJournalBookmark/> Logging</span>
            </li>
            <li className={`pt-3 dashboard-sidebar-wrapper ${page == SidebarCategories.MODERATION ? "dashboard-sidebar-selected" : ""}`}>
                <span><BsArrowRight className={`${page == SidebarCategories.MODERATION ? "scale-75" : "scale-0 hidden"}`}/></span>
                <span onClick={() => changeCategory(SidebarCategories.MODERATION)} className={`dashboard-sidebar-element ${page == SidebarCategories.MODERATION ? "dashboard-sidebar-selected-text" : ""}`}><BsHammer/> Moderation</span>
            </li>
            <li className={`pt-3 dashboard-sidebar-wrapper ${page == SidebarCategories.SCHEDULES ? "dashboard-sidebar-selected" : ""}`}>
                <span><BsArrowRight className={`${page == SidebarCategories.SCHEDULES ? "scale-75" : "scale-0 hidden"}`}/></span>
                <span onClick={() => changeCategory(SidebarCategories.SCHEDULES)} className={`dashboard-sidebar-element ${page == SidebarCategories.SCHEDULES ? "dashboard-sidebar-selected-text" : ""}`}><BsClock/> Schedules</span>
            </li>
            <li className={`pt-3 dashboard-sidebar-wrapper ${page == SidebarCategories.PERMISSIONS ? "dashboard-sidebar-selected" : ""}`}>
                <span><BsArrowRight className={`${page == SidebarCategories.PERMISSIONS ? "scale-75" : "scale-0 hidden"}`}/></span>
                <span onClick={() => changeCategory(SidebarCategories.PERMISSIONS)} className={`dashboard-sidebar-element ${page == SidebarCategories.PERMISSIONS ? "dashboard-sidebar-selected-text" : ""}`}><BsShieldCheck/> Permissions</span>
            </li>
            <li className={`pt-3 dashboard-sidebar-wrapper ${page == SidebarCategories.EMBEDS ? "dashboard-sidebar-selected" : ""}`}>
                <span><BsArrowRight className={`${page == SidebarCategories.EMBEDS ? "scale-75" : "scale-0 hidden"}`}/></span>
                <span onClick={() => changeCategory(SidebarCategories.EMBEDS)} className={`dashboard-sidebar-element ${page == SidebarCategories.EMBEDS ? "dashboard-sidebar-selected-text" : ""}`}><BsTextLeft/> Embeds</span>
            </li>
            <li className={`pt-3 dashboard-sidebar-wrapper ${page == SidebarCategories.STARBOARD ? "dashboard-sidebar-selected" : ""}`}>
                <span><BsArrowRight className={`${page == SidebarCategories.STARBOARD ? "scale-75" : "scale-0 hidden"}`}/></span>
                <span onClick={() => changeCategory(SidebarCategories.STARBOARD)} className={`dashboard-sidebar-element ${page == SidebarCategories.STARBOARD ? "dashboard-sidebar-selected-text" : ""}`}><BsStar/> Starboard</span>
            </li>
            <li className={`pt-3 dashboard-sidebar-wrapper ${page == SidebarCategories.SUGGESTIONS ? "dashboard-sidebar-selected" : ""}`}>
                <span><BsArrowRight className={`${page == SidebarCategories.SUGGESTIONS ? "scale-75" : "scale-0 hidden"}`}/></span>
                <span onClick={() => changeCategory(SidebarCategories.SUGGESTIONS)} className={`dashboard-sidebar-element ${page == SidebarCategories.SUGGESTIONS ? "dashboard-sidebar-selected-text" : ""}`}><BsQuestionCircle/> Suggestions</span>
            </li>
            <li className={`pt-3 dashboard-sidebar-wrapper ${page == SidebarCategories.LEVELS ? "dashboard-sidebar-selected" : ""}`}>
                <span><BsArrowRight className={`${page == SidebarCategories.LEVELS ? "scale-75" : "scale-0 hidden"}`}/></span>
                <span onClick={() => changeCategory(SidebarCategories.LEVELS)} className={`dashboard-sidebar-element ${page == SidebarCategories.LEVELS ? "dashboard-sidebar-selected-text" : ""}`}><BsTrophy/> Levels</span>
            </li>
            
        </ul>
        {server ? <span className={"flex gap-3 py-4 items-center flex-col justify-center"}>
        <span className={"cursor-pointer"} onClick={() => changeCategory(SidebarCategories.HOME)}>
        {server.icon ?
        <Image
        src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png?size=64`}
        alt={server.name + " icon"}
        width={64}
        height={64}
        quality="100"
        className={`rounded-[5rem] bg-discord-bg hover:rounded-2xl transition-all duration-300 flex-grow`}
       />
        : <span className={`h-16 font-roboto text-gray-100 w-16 items-center flex justify-center bg-discord-bg rounded-[5rem] text-sm hover:rounded-2xl hover:bg-discord-primary transition-all cursor-pointer duration-300`}>{server.name.split(" ").map((i) => "abcdefghijklmnopqrstuvwxyz".indexOf(i[0]) != -1 ? i[0] : "").join("")}</span>}
        </span>
        <span className={"secondary text-gray-100 text-md text-center"}>{server.name}</span>
        </span> : "T"}
    </nav></div></>);
}
