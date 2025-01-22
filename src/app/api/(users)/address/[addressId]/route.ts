import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Delete an address
export async function DELETE(request: NextRequest) {
    try {
      const addressId = request.nextUrl.searchParams.get('addressId');
  
      if (!addressId) {
        return NextResponse.json({ error: "Address ID is required" }, { status: 400 });
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
  export async function PUT(request: NextRequest) {
    try {
      const reqBody = await request.json();
      const { addressId, street, city, state, postalCode, country } = reqBody;
  
      if (!addressId) {
        return NextResponse.json({ error: "Address ID is required" }, { status: 400 });
      }
  
      const updatedAddress = await prisma.address.update({
        where: { id: parseInt(addressId) },
        data: {
          street,
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