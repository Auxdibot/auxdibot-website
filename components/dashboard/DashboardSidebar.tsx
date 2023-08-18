"use client";
import { useState } from "react";
import { BsClock, BsGear, BsHammer, BsJournalBookmark, BsList, BsQuestion, BsQuestionCircle, BsShieldCheck, BsStar, BsTextLeft, BsTrophy } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";

export default function DashboardSidebarContainer() {
    let [expanded, setExpanded] = useState(false);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    return (<>{isMobile ? <div className={"fixed w-64 max-md:w-48"}><div className={`transition-transform ${expanded ? "translate-x-0" : "-translate-x-48"}`}><DashboardSidebar /></div><button className={`fixed text-3xl border-t-2 border-t-gray-700 bg-gray-600 transition-all pr-2 pb-2 rounded-br-full ${expanded ? "ml-48" : ""}`} onClick={() => setExpanded(!expanded)}><BsList/></button></div> : <DashboardSidebar/>}</>)
}
export function DashboardSidebar() {
    return (<><nav className={`fixed h-screen w-64 max-md:w-48 bg-gray-600 border-t-2 border-gray-700`}>
        <ul className={"flex flex-col gap-3 pt-3"}>
            <li className={"py-2 border-b-2 border-opacity-50 border-gray-700"}>
                <span className={"flex flex-row gap-2 font-roboto text-lg items-center ml-2"}><BsGear/> Settings</span>
            </li>
            <li className={"py-2 border-b-2 border-opacity-50 border-gray-700"}>
                <span className={"flex flex-row gap-2 font-roboto text-lg items-center ml-2"}><BsJournalBookmark/> Logging</span>
            </li>
            <li className={"py-2 border-b-2 border-opacity-50 border-gray-700"}>
                <span className={"flex flex-row gap-2 font-roboto text-lg items-center ml-2"}><BsHammer/> Moderation</span>
            </li>
            <li className={"py-2 border-b-2 border-opacity-50 border-gray-700"}>
                <span className={"flex flex-row gap-2 font-roboto text-lg items-center ml-2"}><BsClock/> Schedules</span>
            </li>
            <li className={"py-2 border-b-2 border-opacity-50 border-gray-700"}>
                <span className={"flex flex-row gap-2 font-roboto text-lg items-center ml-2"}><BsShieldCheck/> Permissions</span>
            </li>
            <li className={"py-2 border-b-2 border-opacity-50 border-gray-700"}>
                <span className={"flex flex-row gap-2 font-roboto text-lg items-center ml-2"}><BsTextLeft/> Embeds</span>
            </li>
            <li className={"py-2 border-b-2 border-opacity-50 border-gray-700"}>
                <span className={"flex flex-row gap-2 font-roboto text-lg items-center ml-2"}><BsStar/> Starboard</span>
            </li>
            <li className={"py-2 border-b-2 border-opacity-50 border-gray-700"}>
                <span className={"flex flex-row gap-2 font-roboto text-lg items-center ml-2"}><BsQuestionCircle/> Suggestions</span>
            </li>
            <li className={"py-2 border-b-2 border-opacity-50 border-gray-700"}>
                <span className={"flex flex-row gap-2 font-roboto text-lg items-center ml-2"}><BsTrophy/> Levels</span>
            </li>
        </ul>
        
    </nav><div className={"max-md:hidden w-64 max-md:w-64 h-16"}></div></>);
}
