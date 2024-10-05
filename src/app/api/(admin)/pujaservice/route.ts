import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs/promises';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const categoryId = formData.get("category") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File;
    const packages = JSON.parse(formData.get("packages") as string);

    console.log('Category ID:', categoryId);

    if (!categoryId || isNaN(parseInt(categoryId))) {
      return NextResponse.json({ success: false, error: "Invalid category ID" });
    }

    const categoryExists = await prisma.pujaCategory.findUnique({
      where: { id: parseInt(categoryId) },
    });

    if (!categoryExists) {
      return NextResponse.json({ success: false, error: "Category not found" });
    }

    // Handle file upload
    let imgPath = "";
    if (image) {
      const buffer = await image.arrayBuffer();
      const fileName = `${Date.now()}-${image.name}`;
      const uploadsDir = path.join(process.cwd(), 'public/uploads'); // Ensure this path exists
      await fs.mkdir(uploadsDir, { recursive: true }); // Create the directory if it doesn't exist
      const filePath = path.join(uploadsDir, fileName);
      await fs.writeFile(filePath, Buffer.from(buffer));
      imgPath = `/uploads/${fileName}`; // Construct the path to be stored in the database
    }

    // Validate input data
    if (title.length > 255) {
      throw new Error('Title is too long');
    }
    if (description.length > 2000) {
      throw new Error('Description is too long');
    }

    const pujaService = await prisma.pujaService.create({
      data: {
        title,
        img: imgPath,
        desc: description,
        category: {
          connect: { id: parseInt(categoryId) },
        },
        date_of_create: new Date(),
      },
    });

    await Promise.all(
      packages.map((pkg: any) =>
        prisma.package.create({
          data: {
            location: pkg.location,
            language: pkg.language,
            type: pkg.type,
            price: parseFloat(pkg.price),
            description: pkg.description,
            pujaServiceId: pujaService.id,
          },
        })
      )
    );

    return NextResponse.json({ success: true, data: pujaService });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: (error as Error).message });
  }
}

// fetch all puja 
export async function GET(request: NextRequest) {
  try {
    const pujaServices = await prisma.pujaService.findMany({
      include: {
        category: true,
        packages: true,
      },
    });

    return NextResponse.json(pujaServices);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}