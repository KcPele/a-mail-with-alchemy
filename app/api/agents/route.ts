import { NextResponse } from "next/server";
import { GmailConnector } from "@/app/lib/connectors/gmail-connector";
import { EmailSummaryAgent } from "@/app/lib/agents/email-summary-agent";
import { ScheduleAssistant } from "@/app/lib/agents/schedule-assistant";
import type { AgentConfig } from "@/types";

const gmailConnector = new GmailConnector({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  redirectUri: process.env.GOOGLE_REDIRECT_URI!,
  scopes: ["https://www.googleapis.com/auth/gmail.readonly"],
});

export async function POST(request: Request) {
  try {
    const { agentType, params } = await request.json();

    let result;
    switch (agentType) {
      case "email-summary": {
        const config: AgentConfig = {
          name: "Email Summary Assistant",
          description: "Analyzes and summarizes your emails",
          enabled: true,
        };
        const emailAgent = new EmailSummaryAgent(gmailConnector, config);
        result = await emailAgent.execute(params);
        break;
      }

      case "schedule": {
        const config: AgentConfig = {
          name: "Schedule Assistant",
          description: "Manages your calendar and schedules",
          enabled: true,
        };
        const scheduleAgent = new ScheduleAssistant(gmailConnector, config);
        result = await scheduleAgent.execute(params);
        break;
      }

      default:
        return NextResponse.json(
          { error: "Invalid agent type" },
          { status: 400 }
        );
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Agent execution failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
