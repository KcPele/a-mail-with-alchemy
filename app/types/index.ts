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

export interface AgentParams {
  date?: string;
  endDate?: string;
  maxResults?: number;
  query?: string;
}

export interface AgentResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
