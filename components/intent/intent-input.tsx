"use client";

import { useState } from "react";
import { Send, Mic } from "lucide-react";

interface IntentInputProps {
  onSubmit: (input: string) => Promise<void>;
  isListening?: boolean;
}

export function IntentInput({
  onSubmit,
  isListening = false,
}: IntentInputProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setLoading(true);
    try {
      await onSubmit(input);
      setInput("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your request..."
        className="w-full px-4 py-3 pr-24 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="absolute right-2 top-2 flex gap-2">
        <button
          type="button"
          className={`p-2 rounded-full ${
            isListening ? "bg-red-50 text-red-600" : "bg-gray-50 text-gray-600"
          } hover:bg-gray-100`}
        >
          <Mic className="w-5 h-5" />
        </button>
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}
