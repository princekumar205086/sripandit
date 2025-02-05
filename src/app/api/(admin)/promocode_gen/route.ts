import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkUser } from "@/lib/auth";

// Middleware to check if the user is an admin
async function isAdmin(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split(' ')[1];
  if (!token) {
    return false;
  }
  const { role } = checkUser(token);
  return role === "admin";
}

// Add new promo code
export async function POST(request: NextRequest) {
  if (!(await isAdmin(request))) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 403 }
    );
  }

  try {
    const reqBody = await request.json();
    const { code, discount, discountType, expiryDate, usageLimit, isCustomCode, userId } = reqBody;

    // Check if promo code already exists
    const existingPromoCode = await prisma.promoCode.findUnique({
      where: { code },
    });

    if (existingPromoCode) {
      return NextResponse.json(
        { error: "Promo code already exists" },
        { status: 400 }
      );
    }

    // Insert new promo code
    const newPromoCode = await prisma.promoCode.create({
      data: {
        code,
        discount,
        discountType,
        expiryDate: new Date(expiryDate),
        usageLimit,
        isCustomCode,
        userId,
      },
    });

    return NextResponse.json({
      message: "Promo code created successfully",
      success: true,
      promoCode: newPromoCode,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Fetch all promo codes
export async function GET() {
  try {
    const promoCodes = await prisma.promoCode.findMany();
    return NextResponse.json(promoCodes);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}