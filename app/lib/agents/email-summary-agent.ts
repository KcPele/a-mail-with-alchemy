import { BaseAgent } from "./base-agent";
import { GmailConnector } from "../connectors/gmail-connector";
import { AgentConfig } from "app/types";

interface EmailSummaryResult {
  success: boolean;
  summary: string;
  categories: {
    important: string[];
    actionRequired: string[];
    followUp: string[];
  };
  totalEmails: number;
}

export class EmailSummaryAgent extends BaseAgent {
  private gmailConnector: GmailConnector;

  constructor(gmailConnector: GmailConnector, config: AgentConfig) {
    super(config);
    this.gmailConnector = gmailConnector;
  }

  async execute(params: { timeframe?: string }): Promise<EmailSummaryResult> {
    console.log("Executing Email Summary Agent", params);
    try {
      const emailData = await this.gmailConnector.getData({
        query: "is:unread",
        maxResults: 20,
      });

      const emailTexts = emailData.messages.map((message) => {
        const headers = message.payload.headers;
        return {
          from: headers.find((h: any) => h.name === "From")?.value,
          subject: headers.find((h: any) => h.name === "Subject")?.value,
          snippet: message.snippet,
        };
      });

      const summary = await this.generateAIResponse(
        "You are an email summarization assistant. Analyze these emails and provide a concise summary.",
        JSON.stringify(emailTexts)
      );

      const categories = await this.categorizeEmails(emailTexts);

      return {
        success: true,
        summary,
        categories,
        totalEmails: emailData.messages.length,
      };
    } catch (error) {
      console.error("Email summary generation failed:", error);
      throw error;
    }
  }

  private async categorizeEmails(emails: any[]): Promise<{
    important: string[];
    actionRequired: string[];
    followUp: string[];
  }> {
    const categorization = await this.generateAIResponse(
      "Categorize these emails into: important, action required, and follow-up. Return JSON format.",
      JSON.stringify(emails)
    );

    return JSON.parse(categorization);
  }

  async getStatus(): Promise<AgentConfig> {
    return this.config;
  }
}
