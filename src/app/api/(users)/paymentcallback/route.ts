import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import axios from "axios";

async function validateXVerify(request: NextRequest, reqBody: any): Promise<boolean> {
  const xVerifyHeader = request.headers.get("x-verify");
  const saltKey = process.env.PHONEPE_SALT_KEY!;
  const saltIndex = process.env.PHONEPE_SALT_INDEX!;

  const computedXVerify =
    crypto.createHash("sha256").update(JSON.stringify(reqBody) + saltKey).digest("hex").toLowerCase() +
    `###${saltIndex}`;

  return xVerifyHeader === computedXVerify;
}

async function saveData(apiEndpoint: string, data: any) {
  try {
    const response = await axios.post(apiEndpoint, data);
    if (!response.data.success) throw new Error(response.data.error || "Unknown error");
    return response.data;
  } catch (error: any) {
    console.error(`Error saving data to ${apiEndpoint}:`, error.message);
    throw new Error(error.message);
  }
}

export async function POST(request: NextRequest) {
  console.log("Payment callback received");

  try {
    const reqBody = await request.json();
    console.log("Received callback:", reqBody);

    if (!(await validateXVerify(request, reqBody))) {
      return NextResponse.json({ error: "Invalid X-VERIFY header" }, { status: 401 });
    }

    const bookingData = {
      userId: reqBody.userId,
      bookId: reqBody.bookId,
      status: "PENDING",
      date: reqBody.date,
      time: reqBody.time,
      addressId: reqBody.addressId,
      checkoutId: reqBody.checkoutId,
    };
    
    const { bookingId } = await saveData("/api/booking", bookingData);

    const paymentData = {
      userId: reqBody.userId,
      transactionId: reqBody.transactionId,
      amount: reqBody.amount,
      status: "DONE",
      method: "ONLINE",
      bookingId,
    };

    await saveData("/api/payment", paymentData);

    console.log("Callback processed successfully");
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Callback handling error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
