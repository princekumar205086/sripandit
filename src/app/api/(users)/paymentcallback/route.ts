import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const xVerifyHeader = request.headers.get("x-verify");

    const saltKey = process.env.PHONEPE_SALT_KEY!;
    const saltIndex = process.env.PHONEPE_SALT_INDEX!;
    const recomputedXVerify =
      crypto
        .createHash("sha256")
        .update(JSON.stringify(reqBody) + saltKey)
        .digest("hex")
        .toLowerCase() + `###${saltIndex}`;

    if (xVerifyHeader !== recomputedXVerify) {
      return NextResponse.json(
        { error: "Invalid X-VERIFY header" },
        { status: 401 }
      );
    }

    console.log("Payment callback received:", reqBody);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Callback handling error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
