import { DataTable } from "@/components/ui/data-table/data-table";
import { SuggestionsPayloadType } from "@/lib/types/SuggestionsPayloadType";
import { columns } from "./table/column";

export default function Suggestions({ server }: { server: { 
    serverID: string, 
    suggestions: SuggestionsPayloadType[], 
}}) {
    return <div className={"shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Suggestions</h2>
    <div className={"p-2 max-md:max-w-[98vw]"}>
    {server?.suggestions?.length ?
    <DataTable columns={columns(server.serverID)} data={server?.suggestions.map((i, index) => ({...i, index}))} /> : <h2 className={"text-xl text-gray-400 font-open-sans text-center"}>No suggestions found.</h2>}
    </div>
    </div>;
}