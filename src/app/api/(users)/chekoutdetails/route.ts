import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// want to fetch specific checkout details of user(identified by) userid, fetching detail of puja service by pujaservice id with package details by package id and cart details by cart id

/*
from pujaservice i want to fetch title, img url
from package i want to fetch location, language, price, type
from cart i want to fetch selected date and time
*/

