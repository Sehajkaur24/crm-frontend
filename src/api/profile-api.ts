export async function updateProfile(
  userId: number,
  payload: {
    full_name: string;
    email: string;
    org_id: number; 
  }
) {
  try {
    const response = await fetch(`http://localhost:8000/v1/users/${userId}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to update profile");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}

export async function updatePassword(
  userId: number,
  payload: {
    old_password: string;
    new_password: string;
  }
) {
  try {
    const response = await fetch(
      `http://localhost:8000/v1/users/${userId}/change-password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to change password");
    }

    return await response.json();
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
}
