import { auth } from "@/auth";
import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function GET(request: Request) {
  try {
    const surveyId = request.url.split("/").slice(-2)[0];
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const surveyUrl = `${request.headers.get("origin")}/surveys/${surveyId}`;
    const qrCode = await QRCode.toDataURL(surveyUrl);

    return NextResponse.json({ qrCode });
  } catch (error) {
    console.error("Error generating QR code:", error);
    return NextResponse.json(
      { error: "Failed to generate QR code" },
      { status: 500 }
    );
  }
}
