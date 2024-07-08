import fetchDocumentation from "@/lib/fetchDocumentation";
import React from "react";
import DocumentationSidebarContainer from "./sidebar/DocumentationSidebarContainer";
import DocumentationScrollbar from "./DocumentationScrollbar";
import { fetchDocumentationList } from "@/lib/storage/s3";

interface DocumentationFileProps {
    readonly doc: string | string[] | undefined;
}

export async function DocumentationFile({
  doc
}: DocumentationFileProps) {
  const docFile = await fetchDocumentation((typeof doc == 'object' ? doc.join('/') : doc?.toString()) || 'about');
  const documentation = await fetchDocumentationList();
  
  return <>
  <DocumentationSidebarContainer docList={documentation} doc={doc} />
  <main className={"bg-gray-950 relative flex-grow max-w-full"}>
    {/* For tailwind to include doc-alert instead of treeshaking it */}
    <div className="hidden doc-alert"/>
    <div className={"doc-content mb-5"} dangerouslySetInnerHTML={{ __html: docFile || "" }}></div>
    <DocumentationScrollbar/>
  </main>
  </>;
}
  