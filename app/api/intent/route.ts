import { IntentMatcher } from "@/app/lib/intent/matcher";
import { TEE } from "@/app/lib/utils/tee";
import { NextResponse } from "next/server";

const intentMatcher = new IntentMatcher();
const tee = TEE.getInstance();

export async function POST(request: Request) {
  return await tee.process(async () => {
    try {
      const { input, userContext } = await request.json();

      // Validate input
      if (!input || typeof input !== "string") {
        return NextResponse.json({ error: "Invalid input" }, { status: 400 });
      }

      // Match intent to agent
      const result = await intentMatcher.matchIntent(input, userContext);

      if (!result) {
        return NextResponse.json(
          { error: "No matching agent found" },
          { status: 404 }
        );
      }

      return NextResponse.json(result);
    } catch (error) {
      console.error("Intent matching error:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  });
}
