import { google } from "googleapis";
import { BaseConnector } from "./base-connector";
import type { ConnectorCredentials, ConnectorConfig } from "@/types";

export interface GmailData {
  messages: any[];
  nextPageToken?: string;
}

export class GmailConnector extends BaseConnector {
  private oauth2Client: any;

  constructor(config: ConnectorConfig) {
    super(config);
    this.oauth2Client = new google.auth.OAuth2(
      config.clientId,
      config.clientSecret,
      config.redirectUri
    );
  }

  async connect(credentials: ConnectorCredentials): Promise<boolean> {
    try {
      this.oauth2Client.setCredentials({
        access_token: credentials.accessToken,
        refresh_token: credentials.refreshToken,
        expiry_date: credentials.expiryDate,
      });

      this.credentials = credentials;
      await this.secureStore(credentials);
      return true;
    } catch (error) {
      console.error("Gmail connection error:", error);
      return false;
    }
  }

  async getData(params: {
    query?: string;
    maxResults?: number;
  }): Promise<GmailData> {
    try {
      const gmail = google.gmail({ version: "v1", auth: this.oauth2Client });

      const response = await gmail.users.messages.list({
        userId: "me",
        q: params.query || "",
        maxResults: params.maxResults || 10,
      });

      const messages = await Promise.all(
        (response.data.messages || []).map(async (message) => {
          const details = await gmail.users.messages.get({
            userId: "me",
            id: message.id!,
          });
          return details.data;
        })
      );

      return {
        messages,
        nextPageToken: response.data.nextPageToken || undefined,
      };
    } catch (error: any) {
      if (error.code === 401) {
        await this.refreshAccessToken();
        return this.getData(params);
      }
      throw error;
    }
  }

  async refreshAccessToken(): Promise<boolean> {
    try {
      const { credentials } = await this.oauth2Client.refreshAccessToken();
      await this.connect({
        accessToken: credentials.access_token,
        refreshToken: credentials.refresh_token,
        expiryDate: credentials.expiry_date,
      });
      return true;
    } catch (error) {
      console.error("Token refresh failed:", error);
      return false;
    }
  }

  async disconnect(): Promise<boolean> {
    try {
      await this.oauth2Client.revokeCredentials();
      this.credentials = null;
      return true;
    } catch (error) {
      console.error("Disconnect failed:", error);
      return false;
    }
  }
}
