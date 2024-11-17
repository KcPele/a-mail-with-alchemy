"use client";

import { useState } from "react";
import { Settings, AlertCircle } from "lucide-react";
import { Switch } from "components/ui/switch";

interface AgentSettings {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  requiredAuth: string[];
  settings: {
    name: string;
    type: "toggle" | "select";
    value: any;
    options?: string[];
  }[];
}

export default function AgentManagementPage() {
  const [agents, setAgents] = useState<AgentSettings[]>([
    {
      id: "email-summary",
      name: "Email Summary Assistant",
      description: "Analyzes and summarizes your emails daily",
      enabled: true,
      requiredAuth: ["gmail"],
      settings: [
        {
          name: "Daily Summary",
          type: "toggle",
          value: true,
        },
        {
          name: "Summary Frequency",
          type: "select",
          value: "daily",
          options: ["daily", "weekly", "custom"],
        },
      ],
    },
    {
      id: "schedule",
      name: "Schedule Assistant",
      description: "Manages your calendar and arranges rides",
      enabled: true,
      requiredAuth: ["calendar", "uber"],
      settings: [
        {
          name: "Auto-schedule Rides",
          type: "toggle",
          value: true,
        },
        {
          name: "Preferred Service",
          type: "select",
          value: "uber",
          options: ["uber", "lyft"],
        },
      ],
    },
  ]);

  const handleToggle = async (agentId: string, enabled: boolean) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === agentId ? { ...agent, enabled } : agent
      )
    );

    try {
      await fetch("/api/agents/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId, enabled }),
      });
    } catch (error) {
      console.error("Failed to update agent status:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Settings className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold">Agent Management</h1>
        </div>

        <div className="space-y-6">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white rounded-lg border p-6 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{agent.name}</h2>
                  <p className="text-gray-600">{agent.description}</p>
                </div>
                <Switch
                  checked={agent.enabled}
                  onCheckedChange={(enabled) => handleToggle(agent.id, enabled)}
                />
              </div>

              <div className="flex gap-2">
                {agent.requiredAuth.map((auth) => (
                  <span
                    key={auth}
                    className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                  >
                    {auth}
                  </span>
                ))}
              </div>

              {!agent.enabled && (
                <div className="flex items-center gap-2 text-sm text-yellow-600 bg-yellow-50 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  <span>
                    Enable this agent to access its features and settings
                  </span>
                </div>
              )}

              {agent.enabled && (
                <div className="space-y-4 mt-4 pt-4 border-t">
                  <h3 className="text-sm font-medium">Agent Settings</h3>
                  <div className="space-y-3">
                    {agent.settings.map((setting) => (
                      <div
                        key={setting.name}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-gray-600">
                          {setting.name}
                        </span>
                        {setting.type === "toggle" ? (
                          <Switch checked={setting.value} />
                        ) : (
                          <select
                            value={setting.value}
                            className="text-sm border rounded-md px-2 py-1"
                          >
                            {setting.options?.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
