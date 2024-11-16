import { openai } from "../utils/openai";

export interface AgentConfig {
  name: string;
  description: string;
  enabled: boolean;
}

export abstract class BaseAgent {
  protected config: AgentConfig;

  constructor(config: AgentConfig) {
    this.config = config;
  }

  abstract execute(params: any): Promise<any>;
  abstract getStatus(): Promise<AgentConfig>;

  protected async generateAIResponse(
    systemPrompt: string,
    userPrompt: string
  ): Promise<string> {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    return completion.choices[0].message.content || "";
  }
}
