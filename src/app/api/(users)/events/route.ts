import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs/promises";

// Add new event
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imagesrc = formData.get("imagesrc") as File;
    const title = formData.get("title") as string;
    const day = formData.get("day") as string;
    const number = formData.get("number") as string;
    const month = formData.get("month") as string;
    const content = formData.get("content") as string;

    // Handle file upload
    let imgPath = "";
    if (imagesrc) {
      const buffer = await imagesrc.arrayBuffer();
      const fileName = `${Date.now()}-${imagesrc.name}`;
      const uploadsDir = path.join(process.cwd(), "public/uploads"); // Ensure this path exists
      await fs.mkdir(uploadsDir, { recursive: true }); // Create the directory if it doesn't exist
      const filePath = path.join(uploadsDir, fileName);
      await fs.writeFile(filePath, Buffer.from(buffer));
      imgPath = `/uploads/${fileName}`; // Construct the path to be stored in the database
    }

    // Insert new event
    const newEvent = await prisma.event.create({
      data: {
        imagesrc: imgPath,
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

// update only profile picture

export async function PUT(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  const formData = await req.formData();
  const imagesrc = formData.get("imagesrc") as File;
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  let imgPath = "";
  if (imagesrc) {
    const buffer = await imagesrc.arrayBuffer();
    const fileName = `${Date.now()}-${imagesrc.name}`;
    const uploadsDir = path.join(process.cwd(), "public/uploads"); // Ensure this path exists
    await fs.mkdir(uploadsDir, { recursive: true }); // Create the directory if it doesn't exist
    const filePath = path.join(uploadsDir, fileName);
    await fs.writeFile(filePath, Buffer.from(buffer));
    imgPath = `/uploads/${fileName}`; // Construct the path to be stored in the database
  }
  const updatedEvent = await prisma.event.update({
    where: { id: parseInt(userId) },
    data: {
      imagesrc: imgPath || undefined, // Only update if a new file is uploaded
    },
  });
  return NextResponse.json({
    message: "Profile pic updated successfully",
    success: true,
    event: updatedEvent,
  });
}
