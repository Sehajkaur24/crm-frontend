"use client";

import { useState } from "react";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import { updateProfile, updatePassword } from "@/api/profile-api";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const userId = 1; 
  const orgId =
    typeof window !== "undefined" ? localStorage.getItem("org_id") : null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    setError("");
    setMessage("");

    if (!formData.name || !formData.email) {
      setError("Full Name and Email are required.");
      return;
    }

    if (!orgId) {
      setError("Organization ID is missing in local storage.");
      return;
    }

    try {
      const payload = {
        full_name: formData.name,
        email: formData.email,
        org_id: Number(orgId),
      };

      const response = await updateProfile(userId, payload);
      setMessage("Profile updated successfully! ✅");
      console.log("Profile saved", response);
    } catch (err) {
      setError("Failed to update profile. Please try again. ❌");
      console.error(err);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      email: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setMessage("Changes cancelled.");
    setError("");
  };

  const handlePasswordSave = async () => {
    setError("");
    setMessage("");

    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      setError("All password fields are required.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match. ⚠️");
      return;
    }

    try {
      const payload = {
        old_password: formData.oldPassword,
        new_password: formData.newPassword,
        confirm_password: formData.confirmPassword,
      };

      const response = await updatePassword(userId, payload);
      setMessage("Password changed successfully! 🔐");
      console.log("Password changed", response);

      setFormData({
        ...formData,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError("Failed to change password. Please check your old password. ❌");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#7F55B1] mb-6">Profile</h1>

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

      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto space-y-6">
        <FormInput
          id="name"
          label="Full Name"
          name="name"
          placeholder="Enter full name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <FormInput
          id="email"
          label="Email"
          name="email"
          placeholder="Enter email address"
          value={formData.email}
          onChange={handleChange}
          required
          type="email"
        />

        <div className="flex space-x-4">
          <Button text="Cancel" variant="secondary" onClick={handleCancel} />
          <Button text="Save" variant="primary" onClick={handleSave} />
        </div>

        <div className="pt-6 border-t border-gray-200 space-y-4">
          <h2 className="text-lg font-semibold text-[#7F55B1]">Change Password</h2>

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
            <Button text="Save Password" variant="primary" onClick={handlePasswordSave} />
          </div>
        </div>
      </div>
    </div>
  );
}
