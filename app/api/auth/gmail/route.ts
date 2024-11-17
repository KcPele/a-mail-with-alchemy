import { NextResponse } from "next/server";
import { GmailConnector } from "@/app/lib/connectors/gmail-connector";

const gmailConnector = new GmailConnector({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  redirectUri: process.env.GOOGLE_REDIRECT_URI!,
  scopes: [
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/gmail.modify",
    "https://www.googleapis.com/auth/calendar.readonly",
    "https://www.googleapis.com/auth/calendar.events",
  ],
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { credentials } = body;

    const connected = await gmailConnector.connect(credentials);

    if (!connected) {
      return NextResponse.json(
        { error: "Failed to connect to Gmail" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Gmail auth error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
