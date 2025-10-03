"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import {
  updateAdminDetails,
  updateOrganization,
  changePassword,
} from "../../../api/settings-api";

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    orgName: "Acme Corp",
    adminName: "John Doe",
    adminEmail: "admin@acme.com",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [orgId, setOrgId] = useState<number | null>(null);
  const [adminId, setAdminId] = useState<number | null>(1); 

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedOrgId = localStorage.getItem("org_id");
      const storedAdminId = localStorage.getItem("admin_id");

      if (storedOrgId) setOrgId(Number(storedOrgId));
      if (storedAdminId) setAdminId(Number(storedAdminId));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setError("");
    setMessage("");
  };

  const handleSave = async () => {
    if (!orgId || !adminId) {
      setError("Organization or Admin ID not found in localStorage.");
      return;
    }

    try {
      await Promise.all([
        updateAdminDetails(adminId, formData.adminName, formData.adminEmail),
        updateOrganization(orgId, formData.orgName),
      ]);
      setMessage("Settings saved successfully!");
      setError("");
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setMessage("");
    }
  };

  const handlePasswordSave = async () => {
    if (!adminId) {
      setError("Admin ID not found in localStorage.");
      setMessage("");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setMessage("");
      return;
    }

    try {
      await changePassword(adminId, formData.oldPassword, formData.newPassword);
      setMessage("Password updated successfully!");
      setError("");
      setFormData({
        ...formData,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      setError(err.message || "An error occurred while updating password");
      setMessage("");
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-[#7F55B1] mb-6">Settings</h1>

      {message && (
        <div className="mb-4 p-4 rounded-md text-green-700 bg-green-100">
          {message}
        </div>
      )}
      {error && (
        <div className="mb-4 p-4 rounded-md text-red-700 bg-red-100">
          {error}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto space-y-6">
        {/* Organization Details */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[#7F55B1]">
            Organization Details
          </h2>
          <FormInput
            id="orgName"
            label="Organization Name"
            name="orgName"
            placeholder="Enter organization name"
            value={formData.orgName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Admin Details */}
        <div className="space-y-4 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-[#7F55B1]">Admin Details</h2>
          <FormInput
            id="adminName"
            label="Admin Name"
            name="adminName"
            placeholder="Enter admin name"
            value={formData.adminName}
            onChange={handleChange}
            required
          />
          <FormInput
            id="adminEmail"
            label="Admin Email"
            name="adminEmail"
            type="email"
            placeholder="Enter admin email"
            value={formData.adminEmail}
            onChange={handleChange}
            required
          />
          <div className="flex space-x-4">
            <Button text="Cancel" variant="secondary" onClick={handleCancel} />
            <Button text="Save" variant="primary" onClick={handleSave} />
          </div>
        </div>

        {/* Change Password */}
        <div className="space-y-4 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-[#7F55B1]">
            Change Password
          </h2>
          <FormInput
            id="oldPassword"
            label="Old Password"
            name="oldPassword"
            type="password"
            placeholder="Enter old password"
            value={formData.oldPassword}
            onChange={handleChange}
            required
          />
          <FormInput
            id="newPassword"
            label="New Password"
            name="newPassword"
            type="password"
            placeholder="Enter new password"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
          <FormInput
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <div className="flex justify-end">
            <Button
              text="Save Password"
              variant="primary"
              onClick={handlePasswordSave}
            />
          </div>
        </div>
      </div>
    </>
  );
}
