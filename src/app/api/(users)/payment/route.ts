import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Add new payment
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { bookingId, transactionId, amount, method, status } = reqBody;

    // Insert new payment
    const newPayment = await prisma.payment.create({
      data: {
        bookingId,
        transactionId,
        amount,
        method,
        status,
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

// Fetch all payments
export async function GET() {
  try {
    const payments = await prisma.payment.findMany();
    return NextResponse.json(payments);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

