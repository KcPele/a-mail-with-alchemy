import { openai } from "../utils/openai";
import type { AgentConfig, AgentParams, AgentResponse } from "@/types";

export type { AgentConfig };

export abstract class BaseAgent {
  protected config: AgentConfig;

  constructor(config: AgentConfig) {
    this.config = config;
  }

  abstract execute(params: AgentParams): Promise<AgentResponse<unknown>>;
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
