export interface GoogleMessage {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  payload: {
    headers: Array<{
      name: string;
      value: string;
    }>;
    parts?: Array<{
      mimeType: string;
      body: {
        data?: string;
        attachmentId?: string;
      };
    }>;
    body?: {
      data?: string;
    };
  };
}

export interface GoogleEvent {
  id: string;
  summary: string;
  description?: string;
  location?: string;
  start: {
    dateTime: string;
    timeZone?: string;
  };
  end: {
    dateTime: string;
    timeZone?: string;
  };
  attendees?: Array<{
    email: string;
    responseStatus: "needsAction" | "declined" | "tentative" | "accepted";
  }>;
  conferenceData?: {
    conferenceId: string;
    entryPoints: Array<{
      entryPointType: string;
      uri: string;
      label?: string;
    }>;
  };
}

export interface GoogleCalendarData {
  events: GoogleEvent[];
  nextPageToken?: string;
}
