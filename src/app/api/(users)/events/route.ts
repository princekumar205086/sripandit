import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Add new event
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { imagesrc, title, day, number, month, content } = reqBody;

    // Insert new event
    const newEvent = await prisma.event.create({
      data: {
        imagesrc,
        title,
        day,
        number: parseInt(number),
        month,
        content,
      },
    });

    return NextResponse.json({
      message: "Event created successfully",
      success: true,
      event: newEvent,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Fetch all events
export async function GET() {
  try {
    const events = await prisma.event.findMany();
    return NextResponse.json(events);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
