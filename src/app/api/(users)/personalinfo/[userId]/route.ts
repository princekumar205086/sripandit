import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { create } from "domain";

// Delete a personal information entry
export async function DELETE(request: NextRequest) {
  try {
    const personalInfoId = request.nextUrl.searchParams.get("personalInfoId");

    if (!personalInfoId) {
      return NextResponse.json(
        { error: "Personal Information ID is required" },
        { status: 400 }
      );
    }

    await prisma.personalInformation.delete({
      where: { id: parseInt(personalInfoId) },
    });

    return NextResponse.json({
      message: "Personal information deleted successfully",
      success: true,
    });
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

// fetch personal information by userId

export async function GET(
  request: NextRequest,
  context: { params: { userId: string } }
) {
  try {
    const { userId } = context.params;

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
