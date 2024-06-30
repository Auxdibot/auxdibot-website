"use client";

import { useQuery } from "react-query";
import SuggestionsSettings from "./SuggestionsSettings";
import { Suspense } from 'react';
import SuggestionsReactions from "./SuggestionsReactions";
import Suggestions from "./Suggestions";

export default function DashboardSuggestionsConfig({ id }: { id: string }) {
    let { data: suggestions } = useQuery(["data_suggestions", id], async () => await fetch(`/bot/v1/servers/${id}/suggestions`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    return (<main className={"bg-gray-950 flex-grow"}>
        <div className={"animate-fadeIn flex max-md:items-center flex-col py-5 md:px-5 gap-5"}>
        <h1 className={"header text-6xl max-md:text-5xl"}>suggestions</h1>
        <span className={"grid grid-cols-2 max-lg:grid-cols-1 gap-10"}>
            <Suspense fallback={null}>
                <SuggestionsSettings server={suggestions}/>
                <SuggestionsReactions server={suggestions}/>
                <Suggestions server={suggestions}/>
            </Suspense>
        </span>
        </div>
        
            
        </main>)
}