import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  addressId: number;
}

// Delete an address
export async function DELETE(
  request: NextRequest,
  context: { params: Params }
) {
  const addressId = context.params.addressId.toString();
  try {
    if (!addressId) {
      return NextResponse.json(
        { error: "Address ID is required" },
        { status: 400 }
      );
    }

    await prisma.address.delete({
      where: { id: parseInt(addressId) },
    });

    return NextResponse.json({
      message: "Address deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update an address
export async function PUT(request: NextRequest, context: { params: Params }) {
  const addressId = context.params.addressId.toString();
  try {
    const reqBody = await request.json();
    const { addressline, addressline2, city, state, postalCode, country } =
      reqBody;

    if (!addressId) {
      return NextResponse.json(
        { error: "Address ID is required" },
        { status: 400 }
      );
    }

    const updatedAddress = await prisma.address.update({
      where: { id: parseInt(addressId) },
      data: {
        addressline,
        addressline2,
        city,
        state,
        postalCode,
        country,
      },
    });

    return NextResponse.json({
      message: "Address updated successfully",
      success: true,
      address: updatedAddress,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
