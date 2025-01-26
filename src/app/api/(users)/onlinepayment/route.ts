import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import axios from "axios";

const MAX_RETRIES = 5;
const RETRY_DELAY = 2000;

async function makePaymentRequest(apiUrl: string, base64Payload: string, xVerify: string, retries: number = 0) {
  try {
    const response = await axios.post(
      apiUrl,
      { request: base64Payload },
      { headers: { "Content-Type": "application/json", "X-VERIFY": xVerify } }
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 429 && retries < MAX_RETRIES) {
      const delay = RETRY_DELAY * Math.pow(2, retries);
      console.log(`Rate limit exceeded. Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return makePaymentRequest(apiUrl, base64Payload, xVerify, retries + 1);
    }
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { amount, transactionId, userId, cartId } = reqBody;

    if (!amount || !transactionId || !userId || !cartId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const payload = {
      merchantId: process.env.PHONEPE_MERCHANT_ID!,
      merchantTransactionId: transactionId,
      merchantUserId: userId,
      amount: amount * 100,
      redirectUrl: process.env.PHONEPE_REDIRECT_URL!,
      redirectMode: "REDIRECT",
      callbackUrl: process.env.PHONEPE_CALLBACK_URL!,
      paymentInstrument: { type: "PAY_PAGE" },
    };

    const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64");
    const apiEndpoint = "/pg/v1/pay";
    const saltKey = process.env.PHONEPE_SALT_KEY!;
    const saltIndex = process.env.PHONEPE_SALT_INDEX!;
    const xVerify = crypto
      .createHash("sha256")
      .update(base64Payload + apiEndpoint + saltKey)
      .digest("hex")
      .toLowerCase() + `###${saltIndex}`;

    const apiUrl =
      process.env.PHONEPE_ENV === "PROD"
        ? "https://api.phonepe.com/apis/hermes/pg/v1/pay"
        : "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

    const data = await makePaymentRequest(apiUrl, base64Payload, xVerify);

    if (data.success && data.data?.instrumentResponse?.redirectInfo?.url) {
      return NextResponse.json({ success: true, paymentUrl: data.data.instrumentResponse.redirectInfo.url });
    }

    return NextResponse.json({ error: data.message || "Failed to initiate payment" }, { status: 400 });
  } catch (error: any) {
    console.error("Payment initiation error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
