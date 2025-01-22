import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


// Add new item to cart

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userId, pujaServiceId, packageId, selected_date, selected_time } = reqBody;

    // Insert new cart item
    const newCartItem = await prisma.cart.create({
      data: {
        userId,
        pujaServiceId,
        packageId,
        selected_date: new Date(selected_date),
        selected_time,
      },
    });

    return NextResponse.json({
      message: "Cart item created successfully",
      success: true,
      cartItem: newCartItem,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// fetching all cart items

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const cartItems = await prisma.cart.findMany({
      where: { userId: parseInt(userId) },
      include: {
        pujaService: true,
        package: true,
      },
    });

    return NextResponse.json(cartItems);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}