import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import moment from "moment-timezone";
import { checkUser } from "@/lib/auth";

interface Params {
  code: string;
}

// Middleware to check if the user is an admin
async function isAdmin(request: NextRequest) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return false;
  }
  const { role } = checkUser(token);
  return role === "admin";
}

// Delete a promo code
export async function DELETE(
  request: NextRequest,
  context: { params: Params }
) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

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
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { code } = context.params;
    const reqBody = await request.json();
    const { discount, expiryDate, userId } = reqBody;

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
        userId,
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

// Get a promo code
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

    const isExpired =
      new Date() > moment.tz(promoCode.expiryDate, "Asia/Kolkata").toDate();

    return NextResponse.json({
      ...promoCode,
      isExpired,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Assign a promo code to a user
export async function POST(request: NextRequest) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const reqBody = await request.json();
    const { code, userId } = reqBody;

    if (!code || !userId) {
      return NextResponse.json(
        { error: "Promo code and user ID are required" },
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

    const updatedPromoCode = await prisma.promoCode.update({
      where: { code },
      data: {
        userId,
      },
    });

    return NextResponse.json({
      message: "Promo code assigned to user successfully",
      success: true,
      promoCode: updatedPromoCode,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
