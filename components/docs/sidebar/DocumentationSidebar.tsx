import { ScrollArea } from "../../ui/scroll-area";
import Image from "next/image";
import { SidebarCategory } from "./SidebarCategory";


export function DocumentationSidebar({ doc: docPage, docList }: { doc: string | string[] | undefined; docList: { id: string; title: string }[] }) {
    
    return (<div className={"w-80 flex-shrink-0 h-screen"}>
    <nav className={`flex fixed w-80 max-md:w-60 h-full bg-gray-950 border-r-2 border-gray-800`}>
        <ScrollArea className=" overflow-y-auto  overflow-visible border-b-0 pb-20 pr-1">
            <div className="flex flex-col gap-3 py-5">
                <Image src="/logo.png" width={100} height={100} alt="Auxdibot Logo" className="mx-auto" />
                <h1 className="font-montserrat text-3xl text-center">Auxdibot Documentation</h1>
            </div>
            <div className={"flex flex-col w-full pr-1"}>
            {docList?.map((document) => document && <SidebarCategory docID={document.id}  key={document.id} selected={docPage?.toString() ?? "about"} title={document.title} />)}
            </div>
        </ScrollArea>

    </nav></div>);
}


