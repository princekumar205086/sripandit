import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import moment from "moment-timezone";

interface Params {
  code: string;
}

// Delete a promo code
export async function DELETE(request: NextRequest, context: { params: Params }) {
  try {
    const { code } = context.params;

    if (!code) {
      return NextResponse.json(
        { error: "Promo code is required" },
        { status: 400 }
      );
    }

    const promoCode = await prisma.promoCode.findUnique({
      where: { code },
    });

    if (!promoCode) {
      return NextResponse.json({ error: "Promo code not found" }, { status: 404 });
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
export async function PUT(request: NextRequest, context: { params: Params }) {
  try {
    const { code } = context.params;
    const reqBody = await request.json();
    const { discount, expiryDate } = reqBody;

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

export async function GET(request: NextRequest, context: { params: Params }) {
  try {
    const { code } = context.params;

    if (!code) {
      return NextResponse.json(
        { error: "Promo code is required" },
        { status: 400 }
      );
    }

    const promoCode = await prisma.promoCode.findUnique({
      where: { code },
    });

    if (!promoCode) {
      return NextResponse.json(
        { error: "Promo code not found" },
        { status: 404 }
      );
    }

    

    const isExpired = new Date() > moment.tz(promoCode.expiryDate, "Asia/Kolkata").toDate();

    return NextResponse.json({
      ...promoCode,
      isExpired,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

