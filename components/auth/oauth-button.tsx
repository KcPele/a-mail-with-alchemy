"use client";

import { useState } from "react";
import { Lock, Check, Loader2 } from "lucide-react";

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
      icon: "https://www.google.com/gmail/about/static/images/logo-gmail.png",
    },
    calendar: {
      name: "Google Calendar",
      color: "bg-blue-500 hover:bg-blue-600",
      icon: "https://fonts.gstatic.com/s/i/productlogos/calendar_2020q4/v13/192px.svg",
    },
    uber: {
      name: "Uber",
      color: "bg-black hover:bg-gray-800",
      icon: "https://d1a3f4spazzrp4.cloudfront.net/uber-com/1.3.8/d1a3f4spazzrp4.cloudfront.net/illustrations/logo-black.svg",
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
        <img
          src={serviceConfig[service].icon}
          alt={serviceConfig[service].name}
          className="w-5 h-5"
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
