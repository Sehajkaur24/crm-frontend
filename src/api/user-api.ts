export async function registerAdmin(userData: {
  full_name: string;
  email: string;
  password: string;
  org_name: string; 
  industry: string;
}) {
  const response = await fetch('http://localhost:8000/v1/users/create-admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || 'Registration failed');
  }
  return data;
}




export async function loginUser(credentials: {
  email: string;
  password: string;
}) {
  const response = await fetch('http://localhost:8000/v1/auth/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || 'Login failed');
  }

  return data;
}


export async function addUserToOrganization(
  orgId: number,
  userData: {
    full_name: string;
    email: string;
    password: string;
  }
) {
  const response = await fetch(`http://localhost:8000/v1/organisations/${orgId}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Failed to add user to organization');
  }

  return data.user;
}


export async function getUsersByOrganization(orgId: number) {
  const response = await fetch(`http://localhost:8000/v1/organisations/${orgId}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  console.log("Fetched users response:", data); // keep this log

  if (!response.ok) {
    throw new Error(data.detail || 'Failed to fetch users');
  }

  // ✅ Return the actual array of users from backend structure
  return data.data || [];
}
