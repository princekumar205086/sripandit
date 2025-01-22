import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Delete a payment
export async function DELETE(request: NextRequest) {
    try {
      const paymentId = request.nextUrl.searchParams.get('paymentId');
  
      if (!paymentId) {
        return NextResponse.json({ error: "Payment ID is required" }, { status: 400 });
      }
  
      await prisma.payment.delete({
        where: { id: parseInt(paymentId) },
      });
  
      return NextResponse.json({
        message: "Payment deleted successfully",
        success: true,
      });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  
  // Update a payment
  export async function PUT(request: NextRequest) {
    try {
      const reqBody = await request.json();
      const { paymentId, amount, method, status } = reqBody;
  
      if (!paymentId) {
        return NextResponse.json({ error: "Payment ID is required" }, { status: 400 });
      }
  
      const updatedPayment = await prisma.payment.update({
        where: { id: parseInt(paymentId) },
        data: {
          amount,
          method,
          status,
        },
      });
  
      return NextResponse.json({
        message: "Payment updated successfully",
        success: true,
        payment: updatedPayment,
      });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }