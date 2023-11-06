import { DocumentationFile } from '@/components/docs/DocumentationFile';

export default function Documentation({ params }: { params: { doc: string[] | string | undefined }}) {
    return (<DocumentationFile doc={params.doc} />)
}