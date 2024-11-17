import { BaseAgent } from "./base-agent";
import { GmailConnector } from "../connectors/gmail-connector";
import { AgentConfig, AgentParams, AgentResponse } from "app/types";
import { GoogleEvent } from "app/types/google-apis";
interface RideDetails {
  pickupTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  service: "uber" | "lyft";
  eventId: string;
}

interface ScheduleResult {
  meetings: GoogleEvent[];
  scheduledRides: RideDetails[];
}

export class ScheduleAssistant extends BaseAgent {
  private gmailConnector: GmailConnector;

  constructor(gmailConnector: GmailConnector, config: AgentConfig) {
    super(config);
    this.gmailConnector = gmailConnector;
  }

  async execute(params: AgentParams): Promise<AgentResponse<ScheduleResult>> {
    try {
      const { events: meetings } = await this.gmailConnector.getCalendarEvents({
        timeMin: params.date || new Date().toISOString(),
        timeMax: params.endDate,
        maxResults: params.maxResults || 10,
      });

      const meetingsNeedingRides = await this.analyzeMeetingsForTransport(
        meetings
      );
      const scheduledRides = await this.scheduleRides(meetingsNeedingRides);

      return {
        success: true,
        data: {
          meetings,
          scheduledRides,
        },
      };
    } catch (error) {
      console.error("Schedule assistant execution failed:", error);
      return {
        success: false,
        error: "Failed to process schedule",
      };
    }
  }

  private async analyzeMeetingsForTransport(meetings: GoogleEvent[]) {
    return meetings.filter((meeting) => {
      // Only consider meetings with physical locations
      return (
        meeting.location &&
        !meeting.conferenceData && // Exclude virtual meetings
        meeting.attendees?.some(
          (attendee: { responseStatus: string }) =>
            attendee.responseStatus === "accepted"
        )
      ); // Has confirmed attendees
    });
  }

  private async scheduleRides(meetings: GoogleEvent[]): Promise<RideDetails[]> {
    return meetings.map((meeting) => ({
      eventId: meeting.id,
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
