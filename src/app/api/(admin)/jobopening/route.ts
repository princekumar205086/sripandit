
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Add new job opening
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { title, description, deadline } = reqBody;

    // Insert new job opening
    const newJobOpening = await prisma.jobOpening.create({
      data: {
        title,
        description,
        deadline: new Date(deadline),
      },
    });

    return NextResponse.json({
      message: "Job opening created successfully",
      success: true,
      jobOpening: newJobOpening,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Fetch all job openings
export async function GET() {
  try {
    const jobOpenings = await prisma.jobOpening.findMany();
    return NextResponse.json(jobOpenings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

