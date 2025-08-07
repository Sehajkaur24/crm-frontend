"use client";
import { useState } from "react";

export default function AddUserPage() {
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const orgId = 1; 

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:8000/v1/organisations/${orgId}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: fullName,
        email,
        password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      alert("Failed to add user: " + error.detail);
      return;
    }

    const data = await response.json();
    alert("User added successfully!");
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add User</h1>

      <form onSubmit={handleAddUser} className="space-y-4">
        <div>
          <label className="block font-medium">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-[#7F55B1] text-white px-4 py-2 rounded hover:bg-[#6e49a0]"
        >
          Add User
        </button>
      </form>
    </div>
  );
}
