import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs/promises";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const firstname = formData.get("firstname") as string;
    const lastname = formData.get("lastname") as string;
    const dob = formData.get("dob") as string;
    const profile_pic = formData.get("profile_pic") as File;
    const userId = formData.get("userId") as string;

    // Handle file upload
    let imgPath = "";
    if (profile_pic) {
      const buffer = await profile_pic.arrayBuffer();
      const fileName = `${Date.now()}-${profile_pic.name}`;
      const uploadsDir = path.join(process.cwd(), "public/uploads"); // Ensure this path exists
      await fs.mkdir(uploadsDir, { recursive: true }); // Create the directory if it doesn't exist
      const filePath = path.join(uploadsDir, fileName);
      await fs.writeFile(filePath, Buffer.from(buffer));
      imgPath = `/uploads/${fileName}`; // Construct the path to be stored in the database
    }

    // Insert new personal information
    const newPersonalInfo = await prisma.personalInformation.create({
      data: {
        firstname,
        lastname,
        dob: new Date(dob),
        profile_pic: imgPath,
        user: {
          connect: { id: parseInt(userId) },
        },
      },
    });

    return NextResponse.json({
      message: "Personal information created successfully",
      success: true,
      personalInfo: newPersonalInfo,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Fetch all personal information entries for a user
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const personalInfos = await prisma.personalInformation.findMany({
      where: { user: { id: parseInt(userId) } },
    });

    return NextResponse.json(personalInfos);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update a personal information entry
export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    const personalInfoId = formData.get("personalInfoId") as string;
    const firstname = formData.get("firstname") as string;
    const lastname = formData.get("lastname") as string;
    const dob = formData.get("dob") as string;
    const profile_pic = formData.get("profile_pic") as File;

    if (!personalInfoId) {
      return NextResponse.json(
        { error: "Personal Information ID is required" },
        { status: 400 }
      );
    }

    // Handle file upload
    let imgPath = "";
    if (profile_pic) {
      const buffer = await profile_pic.arrayBuffer();
      const fileName = `${Date.now()}-${profile_pic.name}`;
      const uploadsDir = path.join(process.cwd(), "public/uploads"); // Ensure this path exists
      await fs.mkdir(uploadsDir, { recursive: true }); // Create the directory if it doesn't exist
      const filePath = path.join(uploadsDir, fileName);
      await fs.writeFile(filePath, Buffer.from(buffer));
      imgPath = `/uploads/${fileName}`; // Construct the path to be stored in the database
    }

    const updatedPersonalInfo = await prisma.personalInformation.update({
      where: { id: parseInt(personalInfoId) },
      data: {
        firstname,
        lastname,
        dob: new Date(dob),
        profile_pic: imgPath || undefined, // Only update if a new file is uploaded
      },
    });

    return NextResponse.json({
      message: "Personal information updated successfully",
      success: true,
      personalInfo: updatedPersonalInfo,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}