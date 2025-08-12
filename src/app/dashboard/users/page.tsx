"use client";
import { useState, useEffect } from "react";

import { addUserToOrganization, getUsersByOrganization } from "@/api/user-api";

type User = {
  id: number;
  name: string;
  email: string;
  user_type: string;
};

const handleEdit = (id: number) => {
  alert(`Edit user with ID: ${id}`);
};

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ full_name: '', email: '', password: '' });

const orgId = typeof window !== "undefined" ? localStorage.getItem("org_id") : null;

useEffect(() => {
  if (orgId) {
    fetchUsers();
  } else {
    alert("Organization ID is missing!");
  }
}, [orgId]);

const fetchUsers = async () => {
  if (!orgId) {
    alert("Organization ID is missing!");
    return;
  }
  try {
    const userList = await getUsersByOrganization(Number(orgId));
    console.log("User list in UserPage.tsx:", userList);

    const transformed = userList.map((user: any) => ({
      id: user.id,
      name: user.full_name,
      email: user.email,
      user_type: user.user_type || "User",
    }));
    setUsers(transformed);
  } catch (err: any) {
    alert("Failed to fetch users: " + err.message);
  }
};

const handleAddUser = () => setShowForm(true);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!orgId) {
    alert("Organization ID is missing!");
    return;
  }
  try {
    await addUserToOrganization(Number(orgId), formData);
    await fetchUsers();
    setShowForm(false);
    setFormData({ full_name: "", email: "", password: "" });
  } catch (err: any) {
    alert("Failed to add user: " + err.message);
  }
};


  return (

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#7F55B1]">Users</h2>
          <button onClick={handleAddUser} className="bg-[#7F55B1] text-white px-4 py-2 rounded-lg hover:bg-[#6e49a0]">Add User</button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6 space-y-4">
            <h3 className="text-lg font-bold text-[#7F55B1]">Add New User</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="bg-[#7F55B1] text-white px-4 py-2 rounded hover:bg-[#6e49a0]"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-gray-600 hover:underline"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">User Type</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="px-6 py-4 text-sm text-gray-800">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{user.user_type}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="text-[#7F55B1] hover:underline text-sm font-medium"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

  );
}
