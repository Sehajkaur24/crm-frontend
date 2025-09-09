"use client";

import { useState } from "react";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Profile saved", formData);
  };

  const handleCancel = () => {
    console.log("Changes cancelled");
  };

  const handlePasswordSave = () => {
    console.log("Password changed", {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#7F55B1] mb-6">Profile</h1>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto space-y-6">
        <FormInput
          id="name"
          label="Full Name"
          placeholder="Enter full name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <FormInput
          id="email"
          label="Email"
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
            type="password"
            placeholder="Enter old password"
            value={formData.oldPassword}
            onChange={handleChange}
            required
          />

          <FormInput
            id="newPassword"
            label="New Password"
            type="password"
            placeholder="Enter new password"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />

          <FormInput
            id="confirmPassword"
            label="Confirm Password"
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
