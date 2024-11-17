"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import Image from "next/image";

interface OAuthButtonProps {
  service: "gmail" | "calendar" | "uber";
  onAuth: () => Promise<void>;
  isConnected?: boolean;
}

export function OAuthButton({
  service,
  onAuth,
  isConnected = false,
}: OAuthButtonProps) {
  const [loading, setLoading] = useState(false);

  const serviceConfig = {
    gmail: {
      name: "Gmail",
      color: "bg-red-500 hover:bg-red-600",
      icon: "/images/gmail-logo.png",
    },
    calendar: {
      name: "Google Calendar",
      color: "bg-blue-500 hover:bg-blue-600",
      icon: "/images/calendar-logo.png",
    },
    uber: {
      name: "Uber",
      color: "bg-black hover:bg-gray-800",
      icon: "/images/uber-logo.png",
    },
  };

  const handleAuth = async () => {
    setLoading(true);
    try {
      await onAuth();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAuth}
      disabled={loading || isConnected}
      className={`
        relative w-full flex items-center justify-center gap-3 px-4 py-3 
        rounded-lg text-white transition-all
        ${isConnected ? "bg-green-500" : serviceConfig[service].color}
        disabled:opacity-50
      `}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : isConnected ? (
        <Check className="w-5 h-5" />
      ) : (
        <Image
          src={serviceConfig[service].icon}
          alt={serviceConfig[service].name}
          width={20}
          height={20}
        />
      )}
      <span className="font-medium">
        {isConnected
          ? `Connected to ${serviceConfig[service].name}`
          : `Connect ${serviceConfig[service].name}`}
      </span>
    </button>
  );
}
