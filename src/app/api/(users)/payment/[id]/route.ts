import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Delete a payment
export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
    try {
      const { id } = context.params;
  
      if (!id) {
        return NextResponse.json(
          { error: "Payment ID is required" },
          { status: 400 }
        );
      }
  
      const payment = await prisma.payment.findUnique({
        where: { id: parseInt(id) },
      });
  
      if (!payment) {
        return NextResponse.json({ error: "Payment not found" }, { status: 404 });
      }
  
      await prisma.payment.delete({
        where: { id: parseInt(id) },
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
  export async function PUT(request: NextRequest, context: { params: { id: string } }) {
    try {
      const { id } = context.params;
      const reqBody = await request.json();
      const { bookingId, transactionId, amount, method, status } = reqBody;
  
      if (!id) {
        return NextResponse.json(
          { error: "Payment ID is required" },
          { status: 400 }
        );
      }
  
      const updatedPayment = await prisma.payment.update({
        where: { id: parseInt(id) },
        data: {
          bookingId,
          transactionId,
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
  
  // Fetch a single payment by ID
  export async function GET(request: NextRequest, context: { params: { id: string } }) {
    try {
      const { id } = context.params;
  
      if (!id) {
        return NextResponse.json(
          { error: "Payment ID is required" },
          { status: 400 }
        );
      }
  
      const payment = await prisma.payment.findUnique({
        where: { id: parseInt(id) },
      });
  
      if (!payment) {
        return NextResponse.json(
          { error: "Payment not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(payment);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }