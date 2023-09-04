"use client";

import DashboardGreetingsConfig from "@/components/dashboard/greetings/DashboardGreetingsConfig";
import DashboardSidebarContext from "@/context/DashboardSidebarContext";
import { useContext } from 'react';

export default function DashboardGreetings({ params }: { params: { serverID: string } }) {
    const page = useContext(DashboardSidebarContext);
    page?.setCurrentPage("greetings");
    return <><DashboardGreetingsConfig id={params.serverID}/></>
}