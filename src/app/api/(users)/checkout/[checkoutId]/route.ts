import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// fetch by checkout id

export async function GET(request: NextRequest) {
  try {
    const checkoutId = request.nextUrl.searchParams.get("checkoutId");

    if (!checkoutId) {
      return NextResponse.json(
        { error: "Checkout ID is required" },
        { status: 400 }
      );
    }

    const checkout = await prisma.checkout.findUnique({
      where: { id: parseInt(checkoutId) },
      include: {
        cart: true,
        promoCode: true,
      },
    });

    return NextResponse.json(checkout);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete a checkout
export async function DELETE(request: NextRequest) {
  try {
    const checkoutId = request.nextUrl.searchParams.get("checkoutId");

    if (!checkoutId) {
      return NextResponse.json(
        { error: "Checkout ID is required" },
        { status: 400 }
      );
    }

    await prisma.checkout.delete({
      where: { id: parseInt(checkoutId) },
    });

    return NextResponse.json({
      message: "Checkout deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update a checkout
export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { checkoutId, promoCodeId, totalAmount } = reqBody;

    if (!checkoutId) {
      return NextResponse.json(
        { error: "Checkout ID is required" },
        { status: 400 }
      );
    }

    const updatedCheckout = await prisma.checkout.update({
      where: { id: parseInt(checkoutId) },
      data: {
        promoCodeId,
        totalAmount,
      },
    });

    return NextResponse.json({
      message: "Checkout updated successfully",
      success: true,
      checkout: updatedCheckout,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
