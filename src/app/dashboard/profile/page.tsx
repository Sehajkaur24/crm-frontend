"use client";

import { useState } from "react";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    address: "",
    company: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saved profile", formData);
  };

  const handleCancel = () => {
    console.log("Cancelled changes");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-[#7F55B1] mb-6">Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-[#7F55B1]">{formData.name || "John Doe"}</h2>
          <p className="text-gray-600">{formData.role || "Role"}</p>
        </div>

        <form className="space-y-4">
          <FormInput id="name" label="Full Name" value={formData.name} onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} placeholder="Enter full name"/>

          <FormInput id="email" label="Email" type="email" value={formData.email} onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} placeholder="Enter email address"/>

          <FormInput id="role" label="Role" value={formData.role} onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} placeholder="Enter role"/>

          <FormInput id="phone" label="Phone Number" value={formData.phone} onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} placeholder="Enter phone number"/>

   
          <div className="flex flex-col">
            <label htmlFor="address" className="text-[#7F55B1] font-medium mb-1"> Address</label>
            <textarea id="address" name="address" value={formData.address} onChange={handleChange} rows={3} placeholder="Enter address" className="w-full px-4 py-2 border border-[#9B7EBD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F49BAB]"/>
          </div>

          <FormInput id="company" label="Company" value={formData.company} onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} placeholder="Enter company name"/>

          <FormInput id="password" label="Change Password" type="password" value={formData.password} onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} placeholder="Enter new password"/>

          <div className="flex justify-end space-x-4 pt-4">
            <Button text="Cancel" variant="secondary" onClick={handleCancel} />
            <Button text="Save" variant="primary" onClick={handleSave} />
          </div>
        </form>
      </div>
    </div>
  );
}
