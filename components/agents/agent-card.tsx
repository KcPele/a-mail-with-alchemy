"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";

interface AgentCardProps {
  name: string;
  description: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export default function AgentCard({
  name,
  description,
  enabled,
  onToggle,
}: AgentCardProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsEnabled(enabled);
  }, [enabled]);

  if (!mounted) {
    return null;
  }

  const handleToggle = async () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    await onToggle(newState);
  };

  return (
    <div className="p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <Switch
          checked={isEnabled}
          onCheckedChange={handleToggle}
          aria-label={`Toggle ${name}`}
        />
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
