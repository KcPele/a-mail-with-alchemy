export interface ConnectorCredentials {
  accessToken: string;
  refreshToken?: string;
  expiryDate?: number;
}

export interface ConnectorConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
}

export interface AgentConfig {
  name: string;
  description: string;
  enabled: boolean;
}

export interface EmailData {
  from: string;
  subject: string;
  snippet: string;
  headers: Array<{ name: string; value: string }>;
}

export interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: { dateTime: string };
  end: { dateTime: string };
  location?: string;
}

export interface RideDetails {
  pickupTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  service: "uber" | "lyft";
}

export interface AgentParams {
  timeframe?: string;
  date?: string;
  endDate?: string;
  query?: string;
  maxResults?: number;
}

export interface AgentResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
