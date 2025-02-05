import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import axios from "axios";

const salt_key = process.env.PHONEPE_SALT_KEY!;
const merchant_id = process.env.PHONEPE_MERCHANT_ID!;
const keyIndex = process.env.PHONEPE_SALT_INDEX!;
const base_url = "https://www.okpuja.com/";

export async function POST(request: NextRequest) {
  try {
    const reqData = await request.json();
    const {
      amount,
      transactionId,
      userId,
      userEmail,
      checkoutId,
      bookId,
      date,
      time,
      addressId,
    } = reqData;

    if (!amount || !transactionId || !userId || !checkoutId || !addressId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const data = {
      merchantId: merchant_id,
      merchantTransactionId: transactionId,
      merchantUserId: userId,
      amount: amount * 100,
      redirectUrl: `${base_url}/api/paymentstatus?id=${transactionId}&userId=${userId}&userEmail=${userEmail}&checkoutId=${checkoutId}&bookId=${bookId}&date=${date}&time=${time}&addressId=${addressId}`,
      redirectMode: "POST",
      callbackUrl: `${base_url}/api/paymentstatus?id=${transactionId}`,
      paymentInstrument: { type: "PAY_PAGE" },
    };

    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString("base64");

    const string = payloadMain + "/pg/v1/pay" + salt_key;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = `${sha256}###${keyIndex}`;

    const apiUrl =
      process.env.PHONEPE_ENV === "PROD"
        ? "https://api.phonepe.com/apis/hermes/pg/v1/pay"
        : "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

    const options = {
      method: "POST",
      url: apiUrl,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: {
        request: payloadMain,
      },
    };

    const response = await axios(options);

    if (
      response.data.success &&
      response.data.data?.instrumentResponse?.redirectInfo?.url
    ) {
      return NextResponse.json({
        success: true,
        paymentUrl: response.data.data.instrumentResponse.redirectInfo.url,
      });
    } else {
      throw new Error("Payment initiation failed");
    }
  } catch (error: any) {
    console.error("Payment initiation error:", error.message);
    return NextResponse.json(
      { error: "Payment initiation failed", details: error.message },
      { status: 500 }
    );
  }
}
