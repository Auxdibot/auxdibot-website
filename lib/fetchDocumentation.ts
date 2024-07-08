import Showdown from 'showdown';
import { getDocumentationContent } from './storage/s3';
require('./extensions/alertsExtension');
const converter = new Showdown.Converter({
    metadata: true,
    ghCodeBlocks: true,
    parseImgDimensions: true,
    tables: true,
    emoji: true,
    customizedHeaderId: true,
    extensions: ['alert']
});
export default async function fetchDocumentation(name: string): Promise<string | undefined> {

    try {
        const content = (await getDocumentationContent(name))?.content || "";
        return converter.makeHtml(content);
    } catch (x) {
        return undefined;
    }
    
}