import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Fetch all addresses for a user
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const addresses = await prisma.address.findMany({
      where: { userId: parseInt(userId) },
    });

    return NextResponse.json(addresses);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Create a new address for a user
export async function POST(request: NextRequest) {
  try {
    const { addressline, addressline2, city, state, postalCode, country, userId } = await request.json();

    const newAddress = await prisma.address.create({
      data: {
        addressline,
        addressline2,
        city,
        state,
        postalCode,
        country,
        userId: parseInt(userId),
      },
    });

    return NextResponse.json({
      message: "Address created successfully",
      success: true,
      address: newAddress,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Set a specific address as default for a user
export async function PUT(request: NextRequest) {
  try {
    const { addressId, userId } = await request.json();

    if (!addressId || !userId) {
      return NextResponse.json(
        { error: "Address ID and User ID are required" },
        { status: 400 }
      );
    }

    // Unset the previous default address
    await prisma.address.updateMany({
      where: { userId: parseInt(userId), isDefault: true },
      data: { isDefault: false },
    });

    // Set the new default address
    const updatedAddress = await prisma.address.update({
      where: { id: parseInt(addressId) },
      data: { isDefault: true },
    });

    return NextResponse.json({
      message: "Default address updated successfully",
      success: true,
      defaultAddressId: updatedAddress.id,
    });
  } catch (error: any) {
    console.error("Error setting default address:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
