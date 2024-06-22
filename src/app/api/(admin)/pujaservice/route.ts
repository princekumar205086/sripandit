import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { promises as fs } from "fs";
import path from "path";
import os from "os";

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

    // Before processing the file, validate its type and size
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type) || file.size > maxSize) {
      return NextResponse.json({ error: "Invalid file type or size" }, { status: 400 });
    }

    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);

    // Define the uploads directory path (assuming the public directory is at the root of your project)
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    console.log(`Uploads directory: ${uploadsDir}`);

    // Ensure the uploads directory exists
    await fs.mkdir(uploadsDir, { recursive: true });

    // Create the file path in the uploads directory
    const filePath = path.join(uploadsDir, file.name);
    console.log(`File path: ${filePath}`);

    // Write the file the uploads directory
    await fs.writeFile(filePath, buffer);
    console.log(`File written: ${filePath}`);

    // Prepare the relative path for storage (if needed for your DB entry)
    const relativePath = path.join("/uploads", file.name).replace(/\\/g, '/');
    console.log(`Relative path: ${relativePath}`);

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
  } catch (error: any) {
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
