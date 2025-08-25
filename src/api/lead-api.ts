// src/api/lead-api.ts
export type Lead = {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  organisation_id?: number;
};

const API_BASE = "http://localhost:8000/v1";

// Fetch all leads of an organisation
export async function getLeads(orgId: number): Promise<Lead[]> {
  const response = await fetch(`${API_BASE}/organisations/${orgId}/leads`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch leads");
  }

  return data.data;
}

// Add new lead
export async function addLead(orgId: number, leadData: Omit<Lead, "id">): Promise<Lead> {
  const response = await fetch(`${API_BASE}/organisations/${orgId}/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(leadData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to add lead");
  }

  return data.data;
}
