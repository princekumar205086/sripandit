import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Delete a booking
export async function DELETE(request: NextRequest) {
  try {
    const bookingId = request.nextUrl.searchParams.get("bookingId");

    if (!bookingId) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );
    }

    await prisma.booking.delete({
      where: { id: parseInt(bookingId) },
    });

    return NextResponse.json({
      message: "Booking deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update a booking
export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      bookingId,
      selected_date,
      selected_time,
      status,
      cancellationReason,
      failureReason,
    } = reqBody;

    if (!bookingId) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: parseInt(bookingId) },
      data: {
        selected_date: new Date(selected_date),
        selected_time,
        status,
        cancellationReason,
        failureReason,
      },
    });

    return NextResponse.json({
      message: "Booking updated successfully",
      success: true,
      booking: updatedBooking,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
