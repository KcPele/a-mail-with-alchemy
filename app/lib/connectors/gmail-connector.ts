import { google } from "googleapis";
import { BaseConnector } from "./base-connector";
import {
  GoogleCalendarData,
  GoogleEvent,
  GoogleMessage,
} from "app/types/google-apis";
import { ConnectorConfig, ConnectorCredentials } from "app/types";

export interface GmailData {
  messages: GoogleMessage[];
  nextPageToken?: string;
}

export class GmailConnector extends BaseConnector {
  private oauth2Client: any;
  private gmail: any;
  private calendar: any;

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

      this.gmail = google.gmail({ version: "v1", auth: this.oauth2Client });
      this.calendar = google.calendar({
        version: "v3",
        auth: this.oauth2Client,
      });

      this.credentials = credentials;
      await this.secureStore(credentials);
      return true;
    } catch (error) {
      console.error("Google API connection error:", error);
      return false;
    }
  }

  async getData(params: {
    query?: string;
    maxResults?: number;
  }): Promise<GmailData> {
    try {
      const response = await this.gmail.users.messages.list({
        userId: "me",
        q: params.query || "",
        maxResults: params.maxResults || 10,
      });

      const messages = await Promise.all(
        (response.data.messages || []).map(async (message: { id: string }) => {
          const details = await this.gmail.users.messages.get({
            userId: "me",
            id: message.id,
            format: "full",
          });
          return details.data as GoogleMessage;
        })
      );

      return {
        messages,
        nextPageToken: response.data.nextPageToken,
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

  async getCalendarEvents(params: {
    timeMin?: string;
    timeMax?: string;
    maxResults?: number;
    syncToken?: string;
  }): Promise<GoogleCalendarData> {
    try {
      const response = await this.calendar.events.list({
        calendarId: "primary",
        timeMin: params.timeMin || new Date().toISOString(),
        timeMax: params.timeMax,
        maxResults: params.maxResults || 10,
        singleEvents: true,
        orderBy: "startTime",
        syncToken: params.syncToken,
        fields:
          "items(id,summary,description,location,start,end,attendees,conferenceData),nextPageToken,nextSyncToken",
      });

      return {
        events: response.data.items as GoogleEvent[],
        nextPageToken: response.data.nextPageToken,
      };
    } catch (error: any) {
      if (error.code === 401) {
        await this.refreshAccessToken();
        return this.getCalendarEvents(params);
      }
      throw error;
    }
  }

  async createCalendarEvent(event: Partial<GoogleEvent>): Promise<GoogleEvent> {
    try {
      const response = await this.calendar.events.insert({
        calendarId: "primary",
        requestBody: event,
        conferenceDataVersion: 1,
      });

      return response.data as GoogleEvent;
    } catch (error: any) {
      if (error.code === 401) {
        await this.refreshAccessToken();
        return this.createCalendarEvent(event);
      }
      throw error;
    }
  }
}
