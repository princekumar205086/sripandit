import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Add new checkout
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userId, cartId, promoCodeId, totalAmount } = reqBody;

    // Check if cart already has a checkout
    const existingCheckout = await prisma.checkout.findUnique({
      where: { cartId },
    });

    if (existingCheckout) {
      return NextResponse.json(
        { error: "Checkout already exists for this cart" },
        { status: 400 }
      );
    }

    // Insert new checkout
    const newCheckout = await prisma.checkout.create({
      data: {
        userId,
        cartId,
        promoCodeId,
        totalAmount,
      },
    });

    return NextResponse.json({
      message: "Checkout created successfully",
      success: true,
      checkout: newCheckout,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Fetch all checkouts for a user
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const checkouts = await prisma.checkout.findMany({
      where: { userId: parseInt(userId) },
      include: {
        cart: true,
        promoCode: true,
      },
    });

    return NextResponse.json(checkouts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

