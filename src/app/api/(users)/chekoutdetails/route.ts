import { prisma } from "@/lib/prisma";
import { lang } from "moment-timezone";
import { NextRequest, NextResponse } from "next/server";

// want to fetch specific checkout details of user(identified by) userid, fetching detail of puja service by pujaservice id with package details by package id and cart details by cart id if there promoCodeId then fetching promo code details by promoCodeId

/*
from pujaservice i want to fetch title, img url
from package i want to fetch location, language, price, type
from cart i want to fetch selected date and time
from promo code i want to fetch code, discount

all from there respective tables
*/

/* cart model from which i am getting all parameter 
    model Cart {
  id            Int          @id @default(autoincrement())
  user          User         @relation(fields: [userId], references: [id])
  userId        Int
  pujaService   PujaService  @relation(fields: [pujaServiceId], references: [id])
  pujaServiceId Int
  package       Package      @relation(fields: [packageId], references: [id])
  packageId     Int
  selected_date DateTime
  selected_time String
  createdAt     DateTime     @default(now())
  promoCode     PromoCode?   @relation(fields: [promoCodeId], references: [id])
  promoCodeId   Int?
  checkout      Checkout?
}
*/

export async function GET(request: NextRequest) {
  try {
    const cartId = request.nextUrl.searchParams.get("cartId");

    if (!cartId) {
      return NextResponse.json(
        { error: "Cart ID is required" },
        { status: 400 }
      );
    }

    const cart = await prisma.cart.findUnique({
      where: { cartId: String(cartId) },
      select: {
        pujaService: {
          select: {
            title: true,
            img: true,
          },
        },
        package: {
          select: {
            location: true,
            language: true,
            price: true,
            type: true,
            description: true,
          },
        },
        id: true,
        selected_date: true,
        selected_time: true,
        promoCode: {
          select: {
            code: true,
            discount: true,
          },
        },
      },
    });

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    return NextResponse.json(cart);
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
