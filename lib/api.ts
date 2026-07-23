const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export interface EventData {
  id?: string;
  title: string;
  eventType: string;
  description?: string;
  location: string;
  startDate: string;
  endDate?: string;
  registrationLink?: string;
  accentColor?: string;
  isArchived?: boolean;
}

export async function fetchEvents(archived?: boolean) {
  const url = new URL(`${API_BASE_URL}/events`);
  if (typeof archived === "boolean") {
    url.searchParams.set("archived", String(archived));
  }

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch events: ${res.statusText}`);
  }
  return res.json();
}

export async function createEvent(data: EventData) {
  const res = await fetch(`${API_BASE_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await res.json();
  if (!res.ok) {
    throw new Error(responseData.message || "Failed to create event");
  }
  return responseData;
}

export function formatEventForDisplay(dbEvent: any) {
  const startDate = new Date(dbEvent.start_date);
  const endDate = dbEvent.end_date ? new Date(dbEvent.end_date) : null;

  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const startDay = startDate.getDate();
  const year = startDate.getFullYear();
  const monthStr = monthNames[startDate.getMonth()];

  let dayStr = String(startDay);
  if (endDate) {
    const endDay = endDate.getDate();
    if (endDay !== startDay) {
      dayStr = `${startDay}–${endDay}`;
    }
  }

  return {
    id: dbEvent.id,
    day: dayStr,
    month: `${monthStr} ${year}`,
    title: dbEvent.title,
    type: dbEvent.event_type,
    place: dbEvent.location,
    accent: dbEvent.accent_color || "#0068b5",
  };
}

export interface ApplicationData {
  fullName: string;
  email: string;
  enrollmentNumber?: string;
  yearOfStudy: number;
  department: string;
  interests: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  statementOfPurpose?: string;
}

export async function submitApplication(data: ApplicationData) {
  const res = await fetch(`${API_BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await res.json();
  if (!res.ok) {
    throw new Error(responseData.message || "Failed to submit application");
  }
  return responseData;
}

