import documentation from '@/Documentation/documentation.json';
import { readFileSync } from 'fs';
import Showdown from 'showdown';
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
export default function fetchDocumentation(name: string): string | undefined {
    let doc: any = documentation;
    for (let i of name.split('/')) {
        if (typeof doc == 'object' && i in doc) {
            doc = doc[i];
        }
    }
    if (typeof doc != 'string' || !doc.endsWith('.md')) return undefined;
    try {
        const markdown = readFileSync(`Documentation/${doc}`, 'utf8');
        return converter.makeHtml(markdown);
    } catch (x) {
        return undefined;
    }
    
}