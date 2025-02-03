// want to fetch specific pujaboking details of user(identified by) userid, fetching detail of puja service by pujaservice id with package details by package id and cart details by cart id if there promoCodeId then fetching promo code details by promoCodeId and Address details by address id

/*
cart id is main id from which i am getting all details and address id is for address details of user(of default address)

from users i want to fetch name, email, phone
from pujaservice i want to fetch title, img url
from package i want to fetch location, language, price, type
from cart i want to fetch selected date and time, pujaservice id, package id and promo code id
from promo code i want to fetch code, discount
from address i want to fetch address all details
all from there respective tables
and payment details from payment table

here my model for your reference

model Booking {
  id                 Int           @id @default(autoincrement())
  user               User          @relation(fields: [userId], references: [id])
  userId             Int
  cart               Cart       @relation(fields: [cartId], references: [id])
  cartId             Int
  BookId             String
  selected_date      DateTime
  selected_time      String
  status             BookingStatus @default(PENDING)
  cancellationReason String?
  failureReason      String?
  createdAt          DateTime      @default(now())
  updatedAt          DateTime      @updatedAt
  payments           Payment[]
}

model Payment {
  id                  Int             @id @default(autoincrement())
  booking             Booking         @relation(fields: [bookingId], references: [id])
  bookingId           Int
  trasanctionId       String
  amount              Float
  method              PaymentMethod
  status              PaymentStatus   @default(PENDING)
  createdAt           DateTime        @default(now())
  updatedAt           DateTime        @updatedAt
}

enum BookingStatus {
  PENDING
  CONFIRMED
  CANCELLED
  FAILED
}

enum PaymentMethod {
  CREDIT_CARD
  DEBIT_CARD
  UPI
  WALLET
  BANK_TRANSFER
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
}

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
  cartId        String       @unique
  status        Status       @default(TRUE)
  bookings      Booking[]
}

model PromoCode {
  id          Int      @id @default(autoincrement())
  code        String   @unique
  discount    Float
  expiryDate  DateTime
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  carts       Cart[]
}

enum Role {
  USER
  ADMIN
}

enum Status {
  TRUE
  FALSE
}

enum AccountStatus {
  PENDING
  ACTIVE
  SUSPENDED
  DEACTIVATED
}

model User {
  id                        Int                                 @id @default(autoincrement())
  username                  String
  email                     String                              @unique
  contact                   String?
  password                  String
  date_of_reg               DateTime                            @default(now())
  account_status            AccountStatus  @default(PENDING)
  verifyToken               String?                             @db.VarChar(255)
  verifyTokenExpiry         DateTime?
  forgotPasswordToken       String?                             @db.VarChar(255)
  forgotPasswordTokenExpiry DateTime?
  changePasswordToken       String?                             @db.VarChar(255)
  chagePasswordTokenExpiry  DateTime?
  role                      Role                                @default(USER)
  personalInformation       PersonalInformation?                @relation(fields: [personalInformationId], references: [id])
  personalInformationId     Int? @unique
  addresses                 Address[]
  blogCategories            BlogCategory[]                      @relation("UserBlogCategories")
  blogPosts                 BlogPost[]                          @relation("UserBlogPosts")
  blogComments              BlogComments[]                      @relation("UserBlogComments")
  blogLikes                 BlogLikes[]                         @relation("UserBlogLikes")
  blogViews                 BlogView[]                          @relation("UserBlogViews")
  carts                     Cart[]
  bookings                  Booking[]
  @@unique([id, role], map: "unique_admin")
}

model Address {
  id                    Int      @id @default(autoincrement())
  addressline           String   
  addressline2          String? 
  city                  String   
  state                 String   
  postalCode            String   
  country               String   
  userId                Int      
  user                  User     @relation(fields: [userId], references: [id])
  isDefault             Boolean  @default(false) 
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt 

  @@index([userId, isDefault])
}


*/

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const cartId = searchParams.get("cartId");

    // Check if userId and cartId are provided and valid
    if (!userId || !cartId || isNaN(Number(userId)) || isNaN(Number(cartId))) {
      return NextResponse.json(
        { error: "Valid User ID and Cart ID are required" },
        { status: 400 }
      );
    }

    // Fetch booking details
    const bookingDetails = await prisma.booking.findFirst({
      where: {
        userId: parseInt(userId),
        cart: {
          id: parseInt(cartId),
        },
      },
      include: {
        user: {
          select: {
            username: true,
            email: true,
            contact: true,
            personalInformation: {
              select: {
                firstname: true,
                lastname: true,
              },
            },
          },
        },
        cart: {
          select: {
            selected_date: true,
            selected_time: true,
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
            promoCode: {
              select: {
                code: true,
                discount: true,
              },
            },
          },
        },
        payments: {
          select: {
            transactionId: true,
            amount: true,
            method: true,
            status: true,
            createdAt: true,
          },
        },
        addresses: {
          select: {
            addressline: true,
            addressline2: true,
            city: true,
            state: true,
            postalCode: true,
            country: true,
          },
        },
      },
    });

    if (!bookingDetails) {
      return NextResponse.json(
        { error: "Booking details not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(bookingDetails);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}