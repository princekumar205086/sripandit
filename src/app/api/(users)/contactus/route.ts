import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json();

    const newContact = await prisma.contactUs.create({
      data: {
        name,
        email,
        phone,
        message,
      },
    });

    return NextResponse.json(newContact, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create contact message' }, { status: 500 });
  }
}

// fetching all contact messages

export async function GET(request: NextRequest) {
  try {
    const contactMessages = await prisma.contactUs.findMany();

    return NextResponse.json(contactMessages);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch contact messages' }, { status: 500 });
  }
}