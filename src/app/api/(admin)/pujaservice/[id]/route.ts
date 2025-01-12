import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";


interface Params {
  id: number;
}

export async function GET(request: NextRequest, context: { params: Params }) {
  try {
    // Extract service id from request query
    const { id } = context.params;

    const service = await prisma.pujaService.findUnique({
      where: { id: Number(id) },
      include: {
        category: true,
        packages: true,
      },
    });

    if (!service) {
      return NextResponse.json({ success: false, error: "Service not found" });
    }

    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: (error as Error).message });
  }
}

// update puja service

export async function PUT(request: NextRequest, context: { params: Params }) {
  try {
    const { id } = context.params;
    const formData = await request.json();

    const title = formData.title as string;
    const categoryId = formData.category as string;
    const description = formData.description as string;
    const packages = formData.packages;

    if (!categoryId || isNaN(parseInt(categoryId))) {
      return NextResponse.json({ success: false, error: "Invalid category ID" });
    }

    const categoryExists = await prisma.pujaCategory.findUnique({
      where: { id: parseInt(categoryId) },
    });

    if (!categoryExists) {
      return NextResponse.json({ success: false, error: "Category not found" });
    }

    const pujaService = await prisma.pujaService.update({
      where: { id: Number(id) },
      data: {
        title,
        desc: description,
        category: {
          connect: { id: parseInt(categoryId) },
        },
      },
    });

    await prisma.package.deleteMany({
      where: { pujaServiceId: pujaService.id },
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

// delete puja service

export async function DELETE(request: NextRequest, context: { params: Params }) {
  try {
    const { id } = context.params;

    await prisma.pujaService.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
    });
  }
}