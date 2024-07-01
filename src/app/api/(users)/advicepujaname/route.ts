import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userInput = url.searchParams.get('pujaName');

  // Check if the userInput has at least three letters
  if (!userInput || userInput.trim().length < 3) {
    return NextResponse.json({ error: 'Please enter at least three letters for suggestions.' }, { status: 400 });
  }

  try {
    const suggestedPujas = await prisma.pujaService.findMany({
      where: {
        title: {
          contains: userInput,
          mode: 'insensitive', // Ensure case-insensitive search
        },
      },
      select: {
        title: true,
      },
    });

    // Log the results for debugging purposes
    console.log(suggestedPujas);

    return NextResponse.json(suggestedPujas);
  } catch (error: any) {
    // Log the error for debugging purposes
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
