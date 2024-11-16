"use client";

import { useState } from "react";
import { Mail, RefreshCw } from "lucide-react";
import Loading from "@/components/ui/loading";

interface EmailSummary {
  summary: string;
  categories: {
    important: string[];
    actionRequired: string[];
    followUp: string[];
  };
  totalEmails: number;
}

export default function EmailSummaryPage() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<EmailSummary | null>(null);

  const generateSummary = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentType: "email-summary",
          params: { timeframe: "today" },
        }),
      });
      const data = await response.json();
      setSummary(data.result);
    } catch (error) {
      console.error("Failed to generate summary:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Mail className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold">Email Summary Assistant</h1>
        </div>
        <button
          onClick={generateSummary}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            "Generate Summary"
          )}
        </button>
      </div>

      {loading && <Loading />}

      {summary && !loading && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Daily Summary</h2>
            <p className="text-gray-700">{summary.summary}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <CategoryCard
              title="Important"
              items={summary.categories.important}
              color="text-red-600"
            />
            <CategoryCard
              title="Action Required"
              items={summary.categories.actionRequired}
              color="text-yellow-600"
            />
            <CategoryCard
              title="Follow Up"
              items={summary.categories.followUp}
              color="text-blue-600"
            />
          </div>

          <div className="text-sm text-gray-500 text-center">
            Total emails processed: {summary.totalEmails}
          </div>
        </div>
      )}
    </div>
  );
}

function CategoryCard({
  title,
  items,
  color,
}: {
  title: string;
  items: string[];
  color: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className={`text-lg font-semibold mb-3 ${color}`}>{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-gray-700">
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
