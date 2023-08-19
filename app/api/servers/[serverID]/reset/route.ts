import prisma from "@/lib/prisma";
import DiscordGuild from "@/lib/types/DiscordGuild";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { serverID: string }}) {
    let serverID = params.serverID;
    let session = await getToken({ req });
    if (!session?.guilds || !session.guilds.find((i: DiscordGuild) => i.id)) return NextResponse.json({ "error": "Not Authenticated" }, { status: 401 });
    return await prisma.servers.delete({ where: { serverID } }).then((i) => i ? 
    prisma.servers.create({ data: { serverID: i.serverID }})
    .then((i) => i ? NextResponse.json({ data: i }) 
    : NextResponse.json({ "error": "error creating server data"})) 
    : NextResponse.json({ "error": "no server found"})).catch((x) => {
        console.error(x);
        return NextResponse.json({ "error": "an error occurred" }, { status: 500 });
    }) 
}