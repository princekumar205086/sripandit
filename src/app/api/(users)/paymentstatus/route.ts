import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import axios from "axios";

const salt_key = process.env.PHONEPE_SALT_KEY!;
const merchant_id = process.env.PHONEPE_MERCHANT_ID!;
const keyIndex = process.env.PHONEPE_SALT_INDEX!;

async function saveData(url: string, data: any) {
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // Ensure this returns the data containing bookingId
  } catch (error: any) {
    console.error(
      `Error saving data to ${url}:`,
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const merchantTransactionId = searchParams.get("id");
    const userId = searchParams.get("userId");
    const checkoutId = searchParams.get("checkoutId");
    const bookId = searchParams.get("bookId");
    const date = searchParams.get("date");
    const time = searchParams.get("time");
    const addressId = searchParams.get("addressId");

    const string =
      `/pg/v1/status/${merchant_id}/${merchantTransactionId}` + salt_key;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;

    const apiUrl =
      process.env.PHONEPE_ENV! === "PROD"
        ? "https://api.phonepe.com/apis/hermes/pg/v1/status"
        : "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status";

    const options = {
      method: "GET",
      url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchant_id}/${merchantTransactionId}`,
      headers: {
        accept: "application/json",

        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": merchant_id,
      },
    };

    const response = await axios(options);

    if (response.data.success === true) {
      const data = response.data;
      // save booking data
      // console.log('====================================');
      // console.log('Payment Data:', data);
      // console.log('====================================');

      const bookingData = {
        cartId: parseInt(checkoutId ?? "0"),
        userId: parseInt(userId ?? "0"),
        BookId: bookId,
        selected_date: date,
        selected_time: time,
        addressId: parseInt(addressId ?? "0"),
        status: "PENDING",
        cancellationReason: "null",
        failureReason: "null",
      };

      const bookingRes = await saveData(
        "http://localhost:3000/api/booking",
        bookingData
      );
      let bookingId = 0;

      if (bookingRes.success) {
        try {
          const bookingResponse = await axios.get(
            `http://localhost:3000/api/booking?userId=${userId}&cartId=${checkoutId}`
          );
          if (bookingResponse.data && bookingResponse.data.id) {
            bookingId = bookingResponse.data.id;
          } else {
            console.error("Booking ID not found in the response");
          }
        } catch (error) {
          console.error("Error fetching booking data:", error);
        }
      }

      if (bookingId) {
        const paymentData = {
          transactionId: data.data?.transactionId,
          amount: data.data?.amount,
          status: data.data?.state,
          method: data.data?.paymentInstrument?.cardType,
          bookingId,
        };
        const paymentResponse = await saveData(
          "http://localhost:3000/api/payment",
          paymentData
        );
        if (paymentResponse.success) {
          return NextResponse.redirect(
            `http://localhost:3000/confirmbooking?userId=${userId}&cartId=${checkoutId}`,
            {
              status: 301,
            }
          );
        } else {
          return NextResponse.redirect("http://localhost:3000/failedbooking", {
            status: 301,
          });
        }
      }
    } else {
      return NextResponse.redirect("http://localhost:3000/failedbooking", {
        status: 301,
      });
    }
  } catch (error: any) {
    console.error(error);
    // Return error response
    return NextResponse.json(
      { error: "Payment check failed", details: error.message },
      { status: 500 }
    );
  }
}
