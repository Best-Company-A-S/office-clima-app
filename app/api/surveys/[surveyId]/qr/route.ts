import { auth } from "@/auth";
import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function GET(
  request: Request,
  { params }: { params: { surveyId: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const surveyUrl = `${request.headers.get("origin")}/surveys/${
      params.surveyId
    }`;
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
