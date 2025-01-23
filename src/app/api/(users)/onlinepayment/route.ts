import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import axios from "axios";

const MAX_RETRIES = 5;
const RETRY_DELAY = 2000; // Initial delay in milliseconds

// Helper function to retry requests with exponential backoff
async function makePaymentRequest(apiUrl: string, base64Payload: string, xVerify: string, retries: number = 0): Promise<any> {
  try {
    const response = await axios.post(
      apiUrl,
      { request: base64Payload },
      {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": xVerify,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 429 && retries < MAX_RETRIES) {
      const retryAfter = error.response.headers["retry-after"];
      const delay = retryAfter ? parseInt(retryAfter, 10) * 1000 : RETRY_DELAY * Math.pow(2, retries);
      console.log(`Rate limit exceeded. Retrying in ${delay}ms...`);

      await new Promise(resolve => setTimeout(resolve, delay));
      return makePaymentRequest(apiUrl, base64Payload, xVerify, retries + 1);
    }
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { amount, transactionId, userId, cartId } = reqBody;

    // Validate required parameters
    if (!amount || !transactionId || !userId || !cartId) {
      return NextResponse.json(
        { error: "Amount, transactionId, userId, and cartId are required" },
        { status: 400 }
      );
    }

    // Prepare the payload for PhonePe
    const payload = {
      merchantId: process.env.PHONEPE_MERCHANT_ID!,
      merchantTransactionId: transactionId,
      merchantUserId: userId,
      amount: amount * 100, // Convert to paise
      redirectUrl: process.env.PHONEPE_REDIRECT_URL!,
      redirectMode: "REDIRECT",
      callbackUrl: process.env.PHONEPE_CALLBACK_URL!,
      paymentInstrument: { type: "PAY_PAGE" },
    };

    // Base64 encode the payload
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64");

    // Compute X-VERIFY header
    const apiEndpoint = "/pg/v1/pay";
    const saltKey = process.env.PHONEPE_SALT_KEY!;
    const saltIndex = process.env.PHONEPE_SALT_INDEX!;
    const xVerify = crypto
      .createHash("sha256")
      .update(base64Payload + apiEndpoint + saltKey)
      .digest("hex")
      .toLowerCase() + `###${saltIndex}`;

    // Define API URL
    const apiUrl =
      process.env.PHONEPE_ENV === "PROD"
        ? "https://api.phonepe.com/apis/hermes/pg/v1/pay"
        : "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

    // Make POST request to PhonePe with retry mechanism
    const data = await makePaymentRequest(apiUrl, base64Payload, xVerify);

    // Check for successful payment initiation
    if (data.success && data.data?.instrumentResponse?.redirectInfo?.url) {
      return NextResponse.json({
        success: true,
        paymentUrl: data.data.instrumentResponse.redirectInfo.url,
      });
    }

    return NextResponse.json(
      { error: data.message || "Failed to initiate payment" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Payment initiation error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: error.response?.data || error.message },
      { status: 500 }
    );
  }
}
