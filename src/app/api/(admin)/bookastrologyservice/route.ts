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
  
      // Create a new booking in the database
      const newBooking = await prisma.astrologyBooking.create({
        data: {
          language,
          preferredDate: new Date(preferredDate),
          preferredTime: new Date(preferredTime),
          birthPlace,
          birthDate: new Date(birthDate),
          birthTime: new Date(birthTime),
          gender,
          questions,
          createdAt: new Date(),
        },
      });
  
      await sendEmail({
        email: process.env.ownemail, // The email address to receive booking notifications
        emailType: "ASTROLOGY_BOOKING",
        username: "Admin",
        useremail: email, // Assuming this is the email of the user who made the booking
        language,
        preferredDate,
        preferredTime,
        birthPlace,
        birthDate,
        birthTime,
        gender,
        questions
      });
  
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