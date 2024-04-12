import { createDocumentationList } from "@/lib/createDocumentationList";
import fetchDocumentation from "@/lib/fetchDocumentation";
import React from "react";
import DocumentationSidebarContainer from "./sidebar/DocumentationSidebarContainer";
import DocumentationScrollbar from "./DocumentationScrollbar";

interface DocumentationFileProps {
    readonly doc: string | string[] | undefined;
}

export function DocumentationFile({
  doc
}: DocumentationFileProps) {
  const docFile = fetchDocumentation((typeof doc == 'object' ? doc.join('/') : doc?.toString()) || 'about');
  const docList = createDocumentationList();
  
  return <>
  {docList && <DocumentationSidebarContainer docList={docList.filter((i) => i != undefined)} doc={doc} />}
  <main className={"bg-gray-950 relative flex-grow max-w-full"}>
    {/* For tailwind to include doc-alert instead of treeshaking it */}
    <div className="hidden doc-alert"/>
    <div className={"doc-content mb-5"} dangerouslySetInnerHTML={{ __html: docFile || "" }}></div>
    <DocumentationScrollbar/>
  </main>
  </>;
}
  