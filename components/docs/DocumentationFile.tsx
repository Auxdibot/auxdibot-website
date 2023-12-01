import fetchDocumentation from "@/lib/fetchDocumentation";
import React from "react";

interface DocumentationFileProps {
    readonly doc: string | string[] | undefined;
}

export function DocumentationFile({
  doc
}: DocumentationFileProps) {
  const docFile = fetchDocumentation((typeof doc == 'object' ? doc.join('/') : doc?.toString()) || 'home');
  return <main className={"bg-gray-950 flex-grow max-w-full"}>
    <div className={"doc-content"} dangerouslySetInnerHTML={{ __html: docFile || "" }}></div>
    </main>;
}
  