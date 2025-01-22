import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Add new booking
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userId, pujaServiceId, packageId, selected_date, selected_time } = reqBody;

    // Insert new booking
    const newBooking = await prisma.booking.create({
      data: {
        userId,
        pujaServiceId,
        packageId,
        selected_date: new Date(selected_date),
        selected_time,
      },
    });

    return NextResponse.json({
      message: "Booking created successfully",
      success: true,
      booking: newBooking,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Fetch all bookings for a user
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const bookings = await prisma.booking.findMany({
      where: { userId: parseInt(userId) },
      include: {
        pujaService: true,
        package: true,
        payments: true,
      },
    });

    return NextResponse.json(bookings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

