const API_BASE = "http://localhost:8000/v1";
const getOrgId = () => localStorage.getItem("org_id");

export interface Opportunity {
  id: number;
  title: string;
  amount: string;           
  stage: string;
  close_date: string;
  organisation_id: number;
  created_at: string;
  updated_at: string;
}

export const getOpportunities = async (): Promise<Opportunity[]> => {
  const orgId = getOrgId();
  if (!orgId) throw new Error("org_id not found in localStorage");
  const res = await fetch(`${API_BASE}/organisations/${orgId}/opportunities`);
  if (!res.ok) {
    const errText = await res.text();
    console.error("getOpportunities API error:", errText);
    throw new Error("Failed to fetch opportunities");
  }
  const data = await res.json();
  return data.data;
};

export const createOpportunity = async (opportunity: {
  title: string;
  amount: string;
  stage: string;
  close_date: string;
}): Promise<Opportunity> => {
  const orgId = getOrgId();
  if (!orgId) throw new Error("org_id not found in localStorage");
  const body = { ...opportunity, organisation_id: Number(orgId) };
  const res = await fetch(`${API_BASE}/organisations/${orgId}/opportunities`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errText = await res.text();
    console.error("createOpportunity API Error:", errText);
    throw new Error("Failed to create opportunity");
  }
  const data = await res.json();
  return data.data;
};

export const updateOpportunity = async (
  opportunityId: number,
  opportunity: {
    title: string;
    amount: string;
    stage: string;
    close_date: string;
  }
): Promise<Opportunity> => {
  const orgId = getOrgId();
  if (!orgId) throw new Error("org_id not found in localStorage");
  const body = { ...opportunity, organisation_id: Number(orgId) };
  const res = await fetch(`${API_BASE}/opportunities/${opportunityId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errText = await res.text();
    console.error("updateOpportunity API Error:", errText);
    throw new Error("Failed to update opportunity");
  }
  const data = await res.json();
  return data.data;
};
