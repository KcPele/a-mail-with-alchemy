"use client";

import { useState } from "react";
import { Shield } from "lucide-react";
import { OAuthButton } from "@/components/auth/oauth-button";

interface AuthState {
  gmail: boolean;
  calendar: boolean;
  uber: boolean;
}

export default function AuthPage() {
  const [authState, setAuthState] = useState<AuthState>({
    gmail: false,
    calendar: false,
    uber: false,
  });

  const handleAuth = async (service: keyof AuthState) => {
    try {
      // This would integrate with your actual OAuth flow
      await fetch(`/api/auth/${service}`, {
        method: "POST",
      });
      setAuthState((prev) => ({ ...prev, [service]: true }));
    } catch (error) {
      console.error(`${service} auth failed:`, error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold">Service Connections</h1>
        </div>

        <div className="bg-white rounded-lg border p-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Google Services</h2>
            <div className="space-y-3">
              <OAuthButton
                service="gmail"
                onAuth={() => handleAuth("gmail")}
                isConnected={authState.gmail}
              />
              <OAuthButton
                service="calendar"
                onAuth={() => handleAuth("calendar")}
                isConnected={authState.calendar}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Ride Services</h2>
            <OAuthButton
              service="uber"
              onAuth={() => handleAuth("uber")}
              isConnected={authState.uber}
            />
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 mb-2">
              Why connect these services?
            </h3>
            <p className="text-sm text-blue-600">
              Connecting these services allows our AI agents to help you manage
              your emails, schedule meetings, and arrange transportation
              automatically. Your data is always encrypted and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
