"use client";

import { useState } from "react";
import { Calendar, Clock, MapPin, RefreshCw } from "lucide-react";
import Loading from "components/ui/loading";

interface Meeting {
  summary: string;
  start: { dateTime: string };
  location?: string;
}

interface RideDetails {
  pickupTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  service: "uber" | "lyft";
}

interface ScheduleResult {
  meetings: Meeting[];
  scheduledRides: RideDetails[];
}

export default function SchedulePage() {
  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState<ScheduleResult | null>(null);

  const checkSchedule = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentType: "schedule",
          params: { date: new Date().toISOString() },
        }),
      });
      const data = await response.json();
      setSchedule(data.result);
    } catch (error) {
      console.error("Failed to check schedule:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Calendar className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold">Schedule Assistant</h1>
        </div>
        <button
          onClick={checkSchedule}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            "Check Schedule"
          )}
        </button>
      </div>

      {loading && <Loading />}

      {schedule && !loading && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Today's Meetings</h2>
            <div className="space-y-4">
              {schedule.meetings.map((meeting, index) => (
                <MeetingCard
                  key={index}
                  meeting={meeting}
                  ride={schedule.scheduledRides[index]}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MeetingCard({
  meeting,
  ride,
}: {
  meeting: Meeting;
  ride?: RideDetails;
}) {
  return (
    <div className="border-l-4 border-blue-600 pl-4 py-2">
      <h3 className="font-semibold">{meeting.summary}</h3>
      <div className="mt-2 space-y-1 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {new Date(meeting.start.dateTime).toLocaleTimeString()}
        </div>
        {meeting.location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {meeting.location}
          </div>
        )}
        {ride && (
          <div className="mt-3 p-2 bg-gray-50 rounded-md">
            <p className="text-xs font-medium text-gray-500">
              Ride scheduled with {ride.service}
            </p>
            <p className="text-xs text-gray-500">
              Pickup: {new Date(ride.pickupTime).toLocaleTimeString()} at{" "}
              {ride.pickupLocation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
