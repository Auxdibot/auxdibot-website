import DisableableModules from "@/lib/constants/DisableableModules";
import prisma from "@/lib/prisma";
import DiscordGuild from "@/lib/types/DiscordGuild";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import qs from 'querystring';
export async function GET(req: NextRequest, { params }: { params: { serverID: string }}) {
    let serverID = params.serverID;
    let session = await getToken({ req });
    if (!session?.guilds || !session.guilds.find((i: DiscordGuild) => i.id)) return NextResponse.json({ "error": "Not Authenticated" }, { status: 401 });
    return await prisma.servers.findFirst({ where: { serverID }, select: {
        serverID: true,
        disabled_modules: true,
    }}).then((i) => 
    i ? NextResponse.json({ data: i }) : NextResponse.json({ data: undefined })).catch((x) => {
        console.error(x);
        return NextResponse.json({ "error": "an error occurred" }, { status: 500 });
    }) 
}
export async function PATCH(req: NextRequest, { params }: { params: { serverID: string }}) {
    let serverID = params.serverID;
    let session = await getToken({ req });
    if (!session?.guilds || !session.guilds.find((i: DiscordGuild) => i.id)) return NextResponse.json({ "error": "Not Authenticated" }, { status: 401 });
    const { disabled_module } = qs.parse(await req.text());
    if (!disabled_module || typeof disabled_module != "string" || DisableableModules.indexOf(disabled_module) == -1) return NextResponse.json({ "error": "This is not a valid module!" }, { status: 400 });

    return await prisma.servers.findFirst({ where: { serverID: serverID }, select: { disabled_modules: true }}).then(async (data) => {
        if (!data) return NextResponse.json({ "error": "couldn't find that server" });
        let modules = data.disabled_modules.filter((i) => i != disabled_module);
        if (modules.length == data.disabled_modules.length) modules.push(disabled_module);
        return await prisma.servers.update({ where: { serverID }, data: { disabled_modules: modules } }).then((i) => 
        i ? NextResponse.json({ data: i }) 
        : NextResponse.json({ "error": "couldn't update that server"}));
    } 
    ).catch((x) => {
        console.error(x);
        return NextResponse.json({ "error": "an error occurred" }, { status: 500 });
    }) 
}