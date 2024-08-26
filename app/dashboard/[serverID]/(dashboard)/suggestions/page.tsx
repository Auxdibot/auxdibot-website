'use client';

import DashboardSuggestionsConfig from '@/components/dashboard/suggestions/DashboardSuggestionsConfig';

export default function DashboardSuggestions({
    params,
}: {
    params: { serverID: string };
}) {
    return (
        <>
            <DashboardSuggestionsConfig id={params.serverID} />
        </>
    );
}
