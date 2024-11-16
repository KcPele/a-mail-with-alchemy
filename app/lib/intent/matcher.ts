import { IntentAnalyzer } from "./analyzer";
import { TEE } from "../utils/tee";
import { BaseAgent, AgentConfig } from "../agents/base-agent";
import { EmailSummaryAgent } from "../agents/email-summary-agent";
import { ScheduleAssistant } from "../agents/schedule-assistant";
import { GmailConnector } from "../connectors/gmail-connector";

export interface IntentMatchResult {
  agent: BaseAgent;
  confidence: number;
  requiredAuth: string[];
}

type AgentConstructor = new (config: AgentConfig) => BaseAgent;

export class IntentMatcher {
  private analyzer: IntentAnalyzer;
  private tee: TEE;
  private availableAgents: Map<string, AgentConstructor>;
  private gmailConnector: GmailConnector;

  constructor() {
    this.analyzer = new IntentAnalyzer();
    this.tee = TEE.getInstance();
    this.gmailConnector = new GmailConnector({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      redirectUri: process.env.GOOGLE_REDIRECT_URI!,
      scopes: ["https://www.googleapis.com/auth/gmail.readonly"],
    });

    this.availableAgents = new Map([
      ["email_summary", EmailSummaryAgent as unknown as AgentConstructor],
      ["schedule_ride", ScheduleAssistant as unknown as AgentConstructor],
    ]);
  }

  async matchIntent(
    input: string,
    userContext: { authorizedServices: string[] }
  ): Promise<IntentMatchResult | null> {
    return await this.tee.process(async () => {
      const { intent, confidence } = await this.analyzer.analyzeIntent(input);

      if (!intent) return null;

      const createAgent = this.availableAgents.get(intent);
      if (!createAgent) return null;

      const requiredAuth = this.getRequiredAuth(intent);
      const hasRequiredAuth = requiredAuth.every((auth) =>
        userContext.authorizedServices.includes(auth)
      );

      const config: AgentConfig = {
        name: intent,
        description: "",
        enabled: hasRequiredAuth,
      };

      return {
        agent: new createAgent(config),
        confidence,
        requiredAuth,
      };
    });
  }

  private getRequiredAuth(intent: string): string[] {
    const authMap: Record<string, string[]> = {
      email_summary: ["gmail"],
      schedule_ride: ["calendar", "uber"],
    };
    return authMap[intent] || [];
  }
}
