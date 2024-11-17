import { openai } from "../../lib/utils/openai";
// import { encryptData } from "../utils/encryption";
import { TEE } from "../utils/tee";

export class IntentAnalyzer {
  private tee: TEE;

  constructor() {
    this.tee = TEE.getInstance();
  }

  async analyzeIntent(input: string) {
    // const encryptedInput = await encryptData(input);

    return await this.tee.process(async () => {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are an intent analysis assistant. Classify the following user input into one of these categories: email_summary, schedule_ride, travel_plan",
          },
          {
            role: "user",
            content: input,
          },
        ],
      });

      return {
        intent: completion.choices[0].message.content,
        confidence: 0.95,
      };
    });
  }
}
