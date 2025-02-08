import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import axios from "axios";
import { sendEmail } from "@/helpers/mailer";

const salt_key = process.env.PHONEPE_SALT_KEY!;
const merchant_id = process.env.PHONEPE_MERCHANT_ID!;
const keyIndex = process.env.PHONEPE_SALT_INDEX!;
const base_url = "https://www.okpuja.com";

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
    const userEmail = searchParams.get("userEmail");
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
      url: `${apiUrl}/${merchant_id}/${merchantTransactionId}`,
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

      const bookingRes = await saveData(`${base_url}/api/booking`, bookingData);
      let bookingId = 0;

      if (bookingRes.success) {
        try {
          const bookingResponse = await axios.get(
            `${base_url}/api/booking?userId=${userId}&cartId=${checkoutId}`
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
          method: data.data?.paymentInstrument?.type,
          bookingId,
        };
        const paymentResponse = await saveData(
          `${base_url}/api/payment`,
          paymentData
        );

        if (paymentResponse.success) {
          // Fire-and-forget email sending
          (async () => {
            try {
              // Fetch booking details for email
              const bookingDetails = await axios.get(
                `${base_url}/api/pujabookingdetails?userId=${userId}&cartId=${checkoutId}`
              );

              // Determine noOfPandits and pujaDuration based on package type
              let noOfPandits: number;
              let pujaDuration: string;
              switch (bookingDetails.data.cart?.package?.type) {
                case "Basic":
                  noOfPandits = 1;
                  pujaDuration = "1.5 hrs";
                  break;
                case "Standard":
                  noOfPandits = 2;
                  pujaDuration = "2 hrs - 2.5 hrs";
                  break;
                case "Premium":
                  noOfPandits = 3 - 5;
                  pujaDuration = "2.5 hrs - 3.5 hrs";
                  break;
                default:
                  noOfPandits = 1;
                  pujaDuration = "1.5 hrs";
              }
              // Get user name
              const user = bookingDetails.data.user;
              const personalInfo = user?.personalInformation;
              const name = personalInfo
                ? `${personalInfo.firstname} ${personalInfo.lastname}`
                : "Unknown";

              // Send email to user and admin
              await sendEmail({
                email: userEmail,
                emailType: "SERVICE_REQUESTED",
                username: name || "Default Name",
                serviceType: bookingDetails.data.cart?.pujaService?.title,
                date: bookingDetails.data.cart?.selected_date,
                time: bookingDetails.data.cart?.selected_time,
                location: bookingDetails.data.cart?.package?.location,
                contactNumber: bookingDetails.data.user?.contact,
                useremail: userEmail,
                bookingDetails: bookingDetails.data,
                noOfPandits,
                pujaDuration,
              });
            } catch (emailError) {
              console.error("Error sending email:", emailError);
            }
          })(); // Immediately invoked async function

          // Redirect immediately without waiting for email
          return NextResponse.redirect(
            `${base_url}/confirmbooking?userId=${userId}&cartId=${checkoutId}`,
            { status: 301 }
          );
        } else if (paymentResponse.error) {
          return NextResponse.redirect(`${base_url}/failedbooking`, {
            status: 301,
          });
        } else {
          return NextResponse.redirect(`${base_url}/failedbooking`, {
            status: 301,
          });
        }
      }
    } else {
      return NextResponse.redirect(`${base_url}/failedbooking`, {
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
