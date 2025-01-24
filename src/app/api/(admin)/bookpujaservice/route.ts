import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from '@/helpers/mailer';


export async function POST(request: NextRequest) {
  try {
    // Parse the request body to get booking details, including email
    const {
      city,
      pujaName,
      language,
      date,
      time,
      location,
      contactNumber,
      email,
    } = await request.json();

    // Validate the input (basic validation), including email
    if (
      !city ||
      !pujaName ||
      !language ||
      !date ||
      !time ||
      !location ||
      !contactNumber ||
      !email
    ) {
      return new NextResponse(JSON.stringify({ error: "Missing required booking details" }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Create a new booking in the database, including email
    const newBooking = await prisma.pujaBooking.create({
      data: {
        city,
        pujaName,
        language,
        date: new Date(date),
        time,
        location,
        contactNumber, 
        email,
      },
    });

    await sendEmail({
      email: process.env.ownemail, 
      emailType: "BOOKING",
      username: "Admin", 
      useremail: email,
      city,
      pujaName,
      date,
      time,
      location,
      contactNumber
    });

    // Return the created booking
    return new NextResponse(JSON.stringify(newBooking), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error:any) {
    console.error("Error creating booking:", error);
    return new NextResponse(JSON.stringify({
      error: "An error occurred while creating the booking",
      details: error.message,
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function GET() {
  try {
    // Fetch all bookings from the database
    const bookings = await prisma.pujaBooking.findMany();

    // Return the bookings
    return NextResponse.json(bookings);
  } catch (error: any) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      {
        error: "An error occurred while fetching the bookings",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
