import Showdown from "showdown";
import { readFileSync } from 'fs';
import documentation from '@/Documentation/documentation.json';




export function createDocumentationList() {

    try {
        return Object.keys(documentation).map((key) => {
            const markdown = readFileSync(`Documentation/${key}.md`, 'utf8');
            if (typeof markdown != 'string') return;
            const converter = new Showdown.Converter({
                metadata: true
            });
            converter.makeHtml(markdown);
            let metadata = converter.getMetadata();

            return { id: key, name: (typeof metadata != 'string' ? metadata['title'] : metadata) || key };
        });
    } catch (x) {
        console.log(x)
        return undefined;
    }
    

}