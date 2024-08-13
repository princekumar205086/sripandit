import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from '@/helpers/mailer';


export async function POST(request: NextRequest) {
  try {
    // Parse the request body to get booking details
    const {
      language,
      preferredDate,
      preferredTime,
      birthPlace,
      birthDate,
      birthTime,
      gender,
      questions,
      email,
    } = await request.json();

    // Validate the input (basic validation)
    if (
      !language ||
      !preferredDate ||
      !preferredTime ||
      !birthPlace ||
      !birthDate ||
      !birthTime ||
      !gender ||
      !email
    ) {
      return new NextResponse(JSON.stringify({ error: "Missing required booking details" }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Combine date and time strings to create valid Date objects
    const preferredDateTime = new Date(`${preferredDate}T${preferredTime}`);
    const birthDateTime = new Date(`${birthDate}T${birthTime}`);

    // Create a new booking in the database
    const newBooking = await prisma.astrologyBooking.create({
      data: {
        language,
        preferredDate: new Date(preferredDate),
        preferredTime: preferredDateTime,
        birthPlace,
        birthDate: new Date(birthDate),
        birthTime: birthDateTime,
        gender,
        questions,
        createdAt: new Date(),
      },
    });

    console.log("Booking created successfully:", newBooking);

    // Log before sending email
    console.log("Sending email to:", process.env.ownemail);

    await sendEmail({
      email: process.env.ownemail, 
      emailType: "ASTROLOGY_BOOKING",
      username: "Admin",
      useremail: email,
      language,
      preferredDate,
      preferredTime,
      birthPlace,
      birthDate,
      birthTime,
      gender,
      questions
    });

    // Log after sending email
    console.log("Email sent successfully");

    // Return the created booking
    return new NextResponse(JSON.stringify(newBooking), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
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
    const bookings = await prisma.astrologyBooking.findMany();

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