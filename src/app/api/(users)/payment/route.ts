import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Add new payment
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { bookingId, amount, method } = reqBody;

    // Insert new payment
    const newPayment = await prisma.payment.create({
      data: {
        bookingId,
        amount,
        method,
      },
    });

    return NextResponse.json({
      message: "Payment created successfully",
      success: true,
      payment: newPayment,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Fetch all payments for a booking
export async function GET(request: NextRequest) {
  try {
    const bookingId = request.nextUrl.searchParams.get('bookingId');

    if (!bookingId) {
      return NextResponse.json({ error: "Booking ID is required" }, { status: 400 });
    }

    const payments = await prisma.payment.findMany({
      where: { bookingId: parseInt(bookingId) },
    });

    return NextResponse.json(payments);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

