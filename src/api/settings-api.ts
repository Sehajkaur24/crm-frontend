const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

function extractErrorMessage(errorBody: any): string {
  if (typeof errorBody?.detail === "string") {
    return errorBody.detail;
  }

  if (Array.isArray(errorBody?.detail)) {
    return errorBody.detail.map((e: any) => e.msg).join(", ");
  }

  return "Something went wrong.";
}

export async function updateAdminDetails(adminId: number, name: string, email: string) {
  const response = await fetch(`${BASE_URL}/v1/users/${adminId}/update-admin`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      full_name: name,
      email: email,
    }),
  });

  const contentType = response.headers.get("Content-Type");

  if (!response.ok) {
    if (contentType?.includes("application/json")) {
      const error = await response.json();
      throw new Error(extractErrorMessage(error));
    } else {
      const text = await response.text();
      throw new Error(`Unexpected response: ${text}`);
    }
  }

  return await response.json();
}

export async function updateOrganization(orgId: number, name: string) {
  const response = await fetch(`${BASE_URL}/v1/organisations/${orgId}/update-organisation`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  });

  const contentType = response.headers.get("Content-Type");

  if (!response.ok) {
    if (contentType?.includes("application/json")) {
      const error = await response.json();
      throw new Error(extractErrorMessage(error));
    } else {
      const text = await response.text();
      throw new Error(`Unexpected response: ${text}`);
    }
  }

  return await response.json();
}

export async function changePassword(userId: number, oldPassword: string, newPassword: string) {
  const response = await fetch(`${BASE_URL}/v1/users/${userId}/change-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      old_password: oldPassword,
      new_password: newPassword,
    }),
  });

  const contentType = response.headers.get("Content-Type");

  if (!response.ok) {
    if (contentType?.includes("application/json")) {
      const error = await response.json();
      throw new Error(extractErrorMessage(error));
    } else {
      const text = await response.text();
      throw new Error(`Unexpected response: ${text}`);
    }
  }

  return await response.json();
}
