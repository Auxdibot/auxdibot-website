import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    let clientID = searchParams.get("clientID");
    return prisma.analytics.findMany({ ...(clientID ? { where: { clientID } } : {} ), 
    select: { clientID: true, commands: true, members: true, servers: true } })
            .then((data) => NextResponse.json(data, { status: 200 }))
            .catch((x) => {
                console.log(x);
                return NextResponse.json({ "error": "an error occurred" }, { status: 500 });
            })
}