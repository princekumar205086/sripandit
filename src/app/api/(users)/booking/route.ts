import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Add new booking
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userId, cartId, BookId, selected_date, selected_time, addressId, status, cancellationReason, failureReason } = reqBody;

    // Insert new booking
    const newBooking = await prisma.booking.create({
      data: {
        userId,
        cartId,
        BookId,
        selected_date,
        selected_time,
        addressId,
        status,
        cancellationReason: cancellationReason || '',
        failureReason: failureReason || '',
        rejectionReason: rejectionReason || '',
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

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");
    const cartId = request.nextUrl.searchParams.get("cartId");

    if (!userId || !cartId) {
      return NextResponse.json(
        { error: "User ID and Cart ID are required" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.findFirst({
      where: { userId: parseInt(userId), cartId: parseInt(cartId) },
      select: { id: true },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ id: booking.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
