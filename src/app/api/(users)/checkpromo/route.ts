import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Function to apply a promo code
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { code, action } = reqBody; // `action` determines if it's apply or remove action.

    // Handle Apply Promo Code
    if (action === "apply") {
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
          { error: "Promo code does not exist" },
          { status: 404 }
        );
      }

      const isExpired = new Date() > promoCode.expiryDate;

      if (isExpired) {
        return NextResponse.json(
          { error: "Promo code is expired" },
          { status: 400 }
        );
      }
      
      return NextResponse.json({
        message: "Promo code applied successfully",
        discount: promoCode.discount,
        id: promoCode.id,
      });
    }

    // Handle Remove Promo Code
    if (action === "remove") {
      if (!code) {
        return NextResponse.json(
          { error: "Promo code is required to remove" },
          { status: 400 }
        );
      }

      return NextResponse.json({
        message: "Promo code removed successfully",
        discount: 0,
      });
    }

    // If no valid action is provided
    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
