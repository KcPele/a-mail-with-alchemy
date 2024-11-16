import { BaseAgent, AgentConfig } from "./base-agent";
import { GmailConnector } from "../connectors/gmail-connector";
import { google } from "googleapis";

interface RideDetails {
  pickupTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  service: "uber" | "lyft";
}

interface Meeting {
  summary: string;
  start: { dateTime: string };
  location?: string;
}

interface ScheduleResult {
  meetings: Meeting[];
  scheduledRides: RideDetails[];
}

export class ScheduleAssistant extends BaseAgent {
  private gmailConnector: GmailConnector;
  private calendar: any;

  constructor(gmailConnector: GmailConnector, config: AgentConfig) {
    super(config);
    this.gmailConnector = gmailConnector;
    this.calendar = google.calendar({
      version: "v3",
      auth: gmailConnector["oauth2Client"],
    });
  }

  async execute(params: { date: string }): Promise<ScheduleResult> {
    try {
      const meetings = await this.getUpcomingMeetings(params.date);
      const meetingsNeedingRides = await this.analyzeMeetingsForTransport(
        meetings
      );
      const scheduledRides = await this.scheduleRides(meetingsNeedingRides);

      return {
        meetings,
        scheduledRides,
      };
    } catch (error) {
      console.error("Schedule assistant execution failed:", error);
      throw error;
    }
  }

  private async getUpcomingMeetings(date: string) {
    const response = await this.calendar.events.list({
      calendarId: "primary",
      timeMin: new Date(date).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });

    return response.data.items;
  }

  private async analyzeMeetingsForTransport(meetings: any[]) {
    const analysis = await this.generateAIResponse(
      "Analyze these meetings and determine which ones need transportation arranged.",
      JSON.stringify(meetings)
    );

    return JSON.parse(analysis);
  }

  private async scheduleRides(meetings: any[]): Promise<RideDetails[]> {
    return meetings.map((meeting) => ({
      pickupTime: new Date(meeting.start.dateTime).toISOString(),
      pickupLocation: "User's Default Location",
      dropoffLocation: meeting.location || "",
      service: "uber",
    }));
  }

  async getStatus(): Promise<AgentConfig> {
    return this.config;
  }
}
