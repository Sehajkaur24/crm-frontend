"use client";
import { useState, useEffect } from "react";
import { addUserToOrganization } from "@/api/user-api";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";

export default function AddUserPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orgId, setOrgId] = useState<string | null>(null);

  useEffect(() => {
    const storedOrgId = localStorage.getItem("org_id");
    setOrgId(storedOrgId);
  }, []);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!orgId) {
      alert("Organization ID not found. Please log in again.");
      return;
    }

    try {
      await addUserToOrganization(Number(orgId), {
        full_name: fullName,
        email,
        password,
      });

      alert("User added successfully!");
      setFullName("");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      alert("Failed to add user: " + err.message);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add User</h1>

      <form onSubmit={handleAddUser} className="space-y-4">
        <FormInput
          id="fullName"
          label="Full Name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <FormInput
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <FormInput
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" text="Add User" />
      </form>
    </div>
  );
}
