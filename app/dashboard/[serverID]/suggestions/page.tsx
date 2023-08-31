"use client";

import DashboardSuggestionsConfig from "@/components/dashboard/suggestions/DashboardSuggestionsConfig";
import DashboardSidebarContext from "@/context/DashboardSidebarContext";
import { useContext } from 'react';

export default function DashboardSuggestions({ params }: { params: { serverID: string } }) {
    const page = useContext(DashboardSidebarContext);
    page?.setCurrentPage("suggestions");
    return <><DashboardSuggestionsConfig id={params.serverID}/></>
}