import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Add new booking
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userId, cartId, BookId, selected_date, selected_time, status, cancellationReason, failureReason } = reqBody;

    // Insert new booking
    const newBooking = await prisma.booking.create({
      data: {
        userId,
        cartId,
        BookId,
        selected_date: new Date(selected_date),
        selected_time,
        status,
        cancellationReason,
        failureReason,
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

// Fetch all bookings

/* 
*/
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany();
    return NextResponse.json(bookings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

