"use client";

import { useState } from "react";
import { IntentInput } from "@/components/intent/intent-input";
import Loading from "@/components/ui/loading";

interface MatchResult {
  agent: {
    name: string;
    description: string;
  };
  confidence: number;
  requiredAuth: string[];
}

export default function IntentPage() {
  const [result, setResult] = useState<MatchResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleIntent = async (input: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input,
          userContext: {
            authorizedServices: ["gmail", "calendar"], // Example context
          },
        }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Intent processing failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Intent Matching</h1>

      <div className="max-w-2xl mx-auto space-y-6">
        <IntentInput onSubmit={handleIntent} />

        {loading && <Loading />}

        {result && !loading && (
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Matched Agent</h3>
                <p className="text-gray-600">{result.agent.name}</p>
              </div>

              <div>
                <h3 className="font-semibold">Confidence</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${result.confidence * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold">Required Authorizations</h3>
                <div className="flex gap-2 mt-1">
                  {result.requiredAuth.map((auth) => (
                    <span
                      key={auth}
                      className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                    >
                      {auth}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
