import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";


// get all user detail along with their personal information

export async function GET(request: NextRequest) {
    try {
        const res = await prisma.user.findMany();
        return NextResponse.json(res);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}