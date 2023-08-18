import prisma from "@/lib/prisma";
import DiscordGuild from "@/lib/types/DiscordGuild";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { serverID: string }}) {
    let serverID = params.serverID;
    let { searchParams } = new URL(req.url);
    let session = await getToken({ req });
    if (!session?.guilds || !session.guilds.find((i: DiscordGuild) => i.id)) return NextResponse.json({ "error": "Not Authenticated" }, { status: 401 });
    return await prisma.servers.findFirst({ where: { serverID }, ...(searchParams.get("check") ? { select: { serverID: true }} : {})}).then((i) => 
    i ? NextResponse.json({ data: i }) : NextResponse.json({ data: undefined })).catch((x) => {
        console.error(x);
        return NextResponse.json({ "error": "an error occurred" }, { status: 500 });
    }) 
}