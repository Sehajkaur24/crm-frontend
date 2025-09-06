export async function createTask(taskData: {
  title: string;
  description: string;
  status: string;
  user_id: number;
  organisation_id: number;
}) {
  const response = await fetch('http://localhost:8000/v1/users/create-task', {  
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || 'Failed to create task');
  }
  return data.data; 
}

export async function getTasksByOrgId(orgId: number) {
  const response = await fetch(`http://localhost:8000/v1/organisations/${orgId}/tasks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || 'Failed to fetch tasks');
  }

  return data.data || [];
}



export async function updateTask(taskId: number, taskData: {
  title: string;
  description: string;
  status: string;
  user_id: number;
  organisation_id: number;
}) {
  const response = await fetch(`http://localhost:8000/v1/users/${taskId}/tasks`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || 'Failed to update task');
  }

  return data.data; 
}




