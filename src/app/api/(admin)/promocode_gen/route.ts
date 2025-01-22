import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Add new promo code
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { code, discount, expiryDate } = reqBody;

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
        expiryDate: new Date(expiryDate),
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

