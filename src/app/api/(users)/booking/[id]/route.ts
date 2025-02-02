import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Delete a booking
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
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
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const reqBody = await request.json();
    const {
      userId,
      cartId,
      BookId,
      selected_date,
      selected_time,
      status,
      cancellationReason,
      failureReason,
      rejectionReason,
    } = reqBody;

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
        selected_date,
        selected_time,
        status,
        cancellationReason,
        failureReason,
        rejectionReason
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

// fetch all bookings for a user by userId if provided user id role is admin then fetch all bookings

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: { role: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const whereClause = user.role === "ADMIN" ? {} : { userId: parseInt(id) };

    const bookings = await prisma.booking.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            username: true,
            email: true,
            contact: true,
          },
        },
        cart: {
          select: {
            selected_date: true,
            selected_time: true,
            pujaService: {
              select: {
                title: true,
                img: true,
              },
            },
            package: {
              select: {
                location: true,
                language: true,
                price: true,
                type: true,
                description: true,
              },
            },
            promoCode: {
              select: {
                code: true,
                discount: true,
              },
            },
          },
        },
        payments: {
          select: {
            transactionId: true,
            amount: true,
            method: true,
            status: true,
            createdAt: true,
          },
        },
        addresses: {
          select: {
            addressline: true,
            addressline2: true,
            city: true,
            state: true,
            postalCode: true,
            country: true,
          },
        },
      },
    });

    return NextResponse.json(bookings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
