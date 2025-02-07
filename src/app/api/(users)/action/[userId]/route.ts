import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Manage user account status (deactivate or suspend)
export async function PATCH(
  req: NextRequest,
  context: { params: { userId: string } }
) {
  const { userId } = context.params;
  const action = req.nextUrl.searchParams.get("action");

  if (!userId) {
    return NextResponse.json(
      {
        error: "User ID is required",
      },
      { status: 400 }
    );
  }

  if (!action || (action !== "deactivate" && action !== "suspend")) {
    return NextResponse.json(
      {
        error: "Valid action (deactivate or suspend) is required",
      },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
  });

  if (!user) {
    return NextResponse.json({
      status: 404,
      body: "User not found",
    });
  }

  if (action === "deactivate" && user.account_status === "DEACTIVATED") {
    return NextResponse.json({
      status: 400,
      body: "Account already deactivated",
    });
  }

  if (action === "suspend" && user.account_status === "SUSPENDED") {
    return NextResponse.json({
      status: 400,
      body: "User account is already suspended",
    });
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      account_status: action === "deactivate" ? "DEACTIVATED" : "SUSPENDED",
    },
  });

  return NextResponse.json({
    message: `Account ${action}d successfully`,
    status: 200,
    body: updatedUser,
  });
}