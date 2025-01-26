import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Delete a booking
export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(id) },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    await prisma.booking.delete({
      where: { id: parseInt(id) },
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
export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params;
    const reqBody = await request.json();
    const { userId, cartId, BookId, selected_date, selected_time, status, cancellationReason, failureReason } = reqBody;

    if (!id) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: parseInt(id) },
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
      message: "Booking updated successfully",
      success: true,
      booking: updatedBooking,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Fetch a single booking by ID
export async function GET(request: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(id) },
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(booking);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}