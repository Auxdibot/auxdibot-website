import { GetObjectCommand, ListObjectsCommand, S3Client } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { cache } from "react";
import { streamToString } from "../streamToString";

const s3Client = new S3Client({ region: process.env.S3_REGION, credentials: { accessKeyId: process.env.AWS_ACCESS_KEY_NAME ?? "", secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "" }});

export const getDocumentationContent = cache<(id: string) => Promise<{ content: string }>>(async (id: string) => {
    const get = new GetObjectCommand({ Bucket: process.env.S3_BUCKET, Key: `${id}.md` });
    
    const object = await s3Client.send(get);
    const { Body, Metadata  } = object;
    return {
        title: Metadata?.title || "Untitled",
        id: id,
        content: Body ? await streamToString(Body as Readable) : "No content.",
    };
})


export const fetchDocumentationList = cache<() => Promise<{ title: string, id: string }[]>>(async () => {
    
    try {
        const objects = new ListObjectsCommand({ Bucket: process.env.S3_BUCKET });
        const response = await s3Client.send(objects);
        const { Contents } = response;

        const docs = [];
        if (!Contents) return [];
        for (const i of Contents.filter(i => i.Key?.endsWith('.md') ?? false)) {
            const get = new GetObjectCommand({ Bucket: process.env.S3_BUCKET, Key: i.Key });
            const object = await s3Client.send(get);
            const id = i.Key?.replace('.md', '');
            if (!id) continue;

            docs.push({
                title: object.Metadata?.title || id.split('-').map((i) => i.charAt(0).toUpperCase() + i.slice(1)).join(' ') || "Untitled",
                id: i.Key?.replace('.md', '') || "unknown",
                index: Number(object.Metadata?.index ?? 999) || undefined
            })
        }
        return docs.sort((a,b) => (a.index || 999) - (b.index || 999));
         
    } catch (x) {
        console.error(x);
        return [];
    }
});