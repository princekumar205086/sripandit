import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Delete a promo code
export async function DELETE(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { error: "Promo code is required" },
        { status: 400 }
      );
    }

    await prisma.promoCode.delete({
      where: { code },
    });

    return NextResponse.json({
      message: "Promo code deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update a promo code
export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { code, discount, expiryDate } = reqBody;

    if (!code) {
      return NextResponse.json(
        { error: "Promo code is required" },
        { status: 400 }
      );
    }

    const updatedPromoCode = await prisma.promoCode.update({
      where: { code },
      data: {
        discount,
        expiryDate: new Date(expiryDate),
      },
    });

    return NextResponse.json({
      message: "Promo code updated successfully",
      success: true,
      promoCode: updatedPromoCode,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
