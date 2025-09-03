const API_BASE = "http://localhost:8000/v1";

const getOrgId = () => localStorage.getItem("org_id");

export interface Event {
  id: number;
  title: string;
  location: string;
  status: string;
  organisation_id: number;
  date: string;
  created_at: string;
  updated_at: string;
}

export const getEvents = async (org_id: number): Promise<Event[]> => {
  const res = await fetch(`${API_BASE}/organisations/${org_id}/events`);
  if (!res.ok) throw new Error("Failed to fetch events");
  const data = await res.json();
  return data.data;
};

export const addEvent = async (event: {
  title: string;
  event_date: string;
  location: string;
  status: string;
}): Promise<Event> => {
  const orgId = getOrgId();
  if (!orgId) throw new Error("org_id not found in localStorage");

  const res = await fetch(`${API_BASE}/organisations/${orgId}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  if (!res.ok) throw new Error("Failed to add event");
  const data = await res.json();
  return data.data;
};


export const updateEvent = async (
  eventId: number,
  event: {
    title: string;
    date: string;
    location: string;
    status: string;
  }
): Promise<Event> => {
  const orgId = getOrgId();
  if (!orgId) throw new Error("org_id not found in localStorage");

  const res = await fetch(`${API_BASE}/events/${eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...event,
      organisation_id: Number(orgId),
    }),
  });

  if (!res.ok) throw new Error("Failed to update event");
  const data = await res.json();
  return data.data;
};

