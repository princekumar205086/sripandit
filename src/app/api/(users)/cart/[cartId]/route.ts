import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


interface Params {
    id: number; 
}


// Update cart item
export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { cartId, selected_date, selected_time } = reqBody;

    if (!cartId) {
      return NextResponse.json({ error: "Cart ID is required" }, { status: 400 });
    }

    const updatedCartItem = await prisma.cart.update({
      where: { id: parseInt(cartId) },
      data: {
        selected_date: new Date(selected_date),
        selected_time,
      },
    });

    return NextResponse.json({
      message: "Cart item updated successfully",
      success: true,
      cartItem: updatedCartItem,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete cart item
export async function DELETE(request: NextRequest) {
  try {
    const cartId = request.nextUrl.searchParams.get('cartId');

    if (!cartId) {
      return NextResponse.json({ error: "Cart ID is required" }, { status: 400 });
    }

    await prisma.cart.delete({
      where: { id: parseInt(cartId) },
    });

    return NextResponse.json({
      message: "Cart item deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
