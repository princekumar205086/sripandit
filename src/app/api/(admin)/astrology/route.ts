// api/astrology/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("service_image");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file found" }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type) || file.size > maxSize) {
      return NextResponse.json(
        { error: "Invalid file type or size" },
        { status: 400 }
      );
    }

    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);

    const uploadsDir = path.join(process.cwd(), "public", "astrology_image");
    await fs.mkdir(uploadsDir, { recursive: true });

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadsDir, fileName);

    await fs.writeFile(filePath, buffer);

    const relativePath = path.join("/astrology_image", fileName).replace(/\\/g, "/");

    const service_title = formData.get("service_title")?.toString() || "";
    const service_type = formData.get("service_type")?.toString() || "";
    const service_price = parseFloat(formData.get("service_price")?.toString() || "0");
    const service_desc = formData.get("service_desc")?.toString() || "";

    const newAstrologyService = await prisma.astrologyService.create({
      data: {
        service_title,
        service_image: relativePath,
        service_type,
        service_price,
        service_desc,
      },
    });

    return NextResponse.json({
      message: "Service created successfully",
      success: true,
      service: newAstrologyService,
    });
  } catch (error: any) {
    console.error("Error details:", error);
    return NextResponse.json(
      {
        error: "An error occurred while creating the AstrologyService",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// GET all astrology services
// GET all astrology services
export async function GET() {
  try {
    const astrologyServices = await prisma.astrologyService.findMany({
      select: {
        id: true, 
        service_image: true, 
        service_title: true,
      },
    });
    return NextResponse.json(astrologyServices);
  } catch (error: any) {
    console.error("Error details:", error);
    return NextResponse.json(
      {
        error: "An error occurred while fetching the AstrologyServices",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
