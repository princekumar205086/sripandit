import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    id: number; 
}

export async function GET(request: NextRequest, context: { params: Params }) {
    try {
      // Extract service id from request query
      const { id } = context.params;
  
      const service = await prisma.pujaService.findUnique({
        where: { id: Number(id) },include: {
          category: true,
        },
      });
  
      if (!service) {
        throw new Error("Service not found");
      }
  
      return NextResponse.json(service);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }