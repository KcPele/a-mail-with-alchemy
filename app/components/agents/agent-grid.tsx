"use client";

import { useEffect, useState } from "react";
import AgentCard from "./agent-card";
// import Loading from "@/components/ui/loading";

interface Agent {
  name: string;
  description: string;
  enabled: boolean;
}

export default function AgentGrid() {
  const [mounted, setMounted] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([
    {
      name: "Email Summary Assistant",
      description: "Analyzes unread emails and generates daily summaries",
      enabled: true,
    },
    {
      name: "Schedule Assistant",
      description: "Manages meetings and arranges rides automatically",
      enabled: true,
    },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = async (index: number, enabled: boolean) => {
    const updatedAgents = [...agents];
    updatedAgents[index].enabled = enabled;
    setAgents(updatedAgents);

    try {
      await fetch("/api/agents/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentIndex: index, enabled }),
      });
    } catch (error) {
      console.error("Failed to update agent status:", error);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {agents.map((agent, index) => (
        <AgentCard
          key={agent.name}
          name={agent.name}
          description={agent.description}
          enabled={agent.enabled}
          onToggle={(enabled) => handleToggle(index, enabled)}
        />
      ))}
    </div>
  );
}
