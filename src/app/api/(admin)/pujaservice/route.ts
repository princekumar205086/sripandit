import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { promises as fs } from "fs";
import path from "path";

type Params = {
  id: string;
};

export async function POST(request: NextRequest, context: { params: Params }) {
  try {
    // Parse the form data
    const formData = await request.formData();

    // Handle file upload
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file found" }, { status: 400 });
    }
    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);

    // Use /tmp directory for Vercel compatibility
    const filePath = path.join('/tmp', file.name);
    await fs.writeFile(filePath, buffer);

    // Prepare the relative path for storage (if needed for your DB entry)
    const relativePath = `/tmp/${file.name}`;

    // Parse the data
    const data = formData.get("data");
    if (typeof data !== "string") {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }
    const reqBody = JSON.parse(data);
    const { title, desc, category } = reqBody;

    // Check if category exists
    const existingCategory = await prisma.pujaCategory.findUnique({
      where: { id: parseInt(category) },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { error: "Category does not exist" },
        { status: 400 }
      );
    }

    // Create a new PujaService and connect it to the existing category
    const newPujaService = await prisma.pujaService.create({
      data: {
        title,
        desc,
        img: relativePath, // store the relative path
        category: {
          connect: {
            id: parseInt(category),
          },
        },
      },
    });

    return NextResponse.json(newPujaService);
  } catch (error:any) {
    console.error('Error details:', error);
    return NextResponse.json(
      { error: "An error occurred while creating the PujaService", details: error.message },
      { status: 500 }
    );
  }
}


// Function to handle GET request for all services
// Function to handle GET request for all services
export async function GET() {
  try {
    const services = await prisma.pujaService.findMany({
      include: {
        category: true,
      },
    });
    return NextResponse.json(services);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
