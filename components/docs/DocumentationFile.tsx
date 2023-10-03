import fetchDocumentation from "@/lib/fetchDocumentation";
import React from "react";

interface DocumentationFileProps {
    readonly doc: string | string[] | undefined;
}

export function DocumentationFile({
  doc
}: DocumentationFileProps) {
  const docFile = fetchDocumentation((typeof doc == 'object' ? doc.join('/') : doc?.toString()) || 'home');
  return <main className={"bg-gray-700 flex-grow"}>
    <div className={"doc-content"} dangerouslySetInnerHTML={{ __html: docFile || "" }}></div>
    </main>;
}
  