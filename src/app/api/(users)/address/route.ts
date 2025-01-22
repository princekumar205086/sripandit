import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Add new address
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { street, city, state, postalCode, country, userId } = reqBody;

    // Insert new address
    const newAddress = await prisma.address.create({
      data: {
        street,
        city,
        state,
        postalCode,
        country,
        userId,
      },
    });

    return NextResponse.json({
      message: "Address created successfully",
      success: true,
      address: newAddress,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Fetch all addresses for a user
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const addresses = await prisma.address.findMany({
      where: { userId: parseInt(userId) },
    });

    return NextResponse.json(addresses);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
