// app/api/paymentstatus/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import axios from "axios";

export async function GET(request: NextRequest) {
  console.log("Payment status request received");
  const { searchParams } = new URL(request.url);
  const transactionId = searchParams.get("transactionId");
  try {
    if (!transactionId) {
      return NextResponse.json(
        { error: "Transaction ID is required" },
        { status: 400 }
      );
    }

    const payload = {
      merchantId: process.env.PHONEPE_MERCHANT_ID!,
      merchantTransactionId: transactionId,
    };

    const base64Payload = Buffer.from(JSON.stringify(payload)).toString(
      "base64"
    );
    const apiEndpoint = "/pg/v1/status";
    const saltKey = process.env.PHONEPE_SALT_KEY!;
    const saltIndex = process.env.PHONEPE_SALT_INDEX!;
    const xVerify =
      crypto
        .createHash("sha256")
        .update(base64Payload + apiEndpoint + saltKey)
        .digest("hex")
        .toLowerCase() + `###${saltIndex}`;

    const apiUrl =
      process.env.PHONEPE_ENV === "PROD"
        ? "https://api.phonepe.com/apis/hermes/pg/v1/status"
        : "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status";

    const response = await axios.post(
      apiUrl,
      { request: base64Payload },
      {
        headers: { "Content-Type": "application/json", "X-VERIFY": xVerify },
      }
    );

    const data = response.data;
    if (data.success) {
      return NextResponse.json({
        success: true,
        transactionId: data.data?.transactionId,
        paymentMethod: data.data?.paymentMethod,
        amountPaid: data.data?.amount / 100,
        paymentDate: new Date(data.data?.paymentDate).toLocaleString(),
        status: data.code,
        message: data.message,
      });
    }

    return NextResponse.json(
      { success: false, status: data.code, message: data.message },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Transaction status error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
