"use client";

import { useState } from "react";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";

type Lead = {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "new",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingLead) {
    
      setLeads((prev) =>
        prev.map((l) =>
          l.id === editingLead.id ? { ...formData, id: editingLead.id } : l
        )
      );
    } else {

      const newLead: Lead = {
        id: Date.now(),
        ...formData,
      };
      setLeads((prev) => [...prev, newLead]);
    }

    setFormData({ name: "", email: "", phone: "", status: "new" });
    setEditingLead(null);
    setShowForm(false);
  };

  const handleEdit = (lead: Lead) => {
    setFormData({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      status: lead.status,
    });
    setEditingLead(lead);
    setShowForm(true);
  };

  return (
    <div className="p-6">
   
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#7F55B1]">Leads</h2>
        <div className="w-auto">
          <Button
            text={editingLead ? "Edit Lead" : "Add Lead"}
            onClick={() => {
              setEditingLead(null);
              setFormData({ name: "", email: "", phone: "", status: "new" });
              setShowForm(true);
            }}
          />
        </div>
      </div>

     
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow mb-6 space-y-4"
        >
          <h3 className="text-lg font-bold text-[#7F55B1]">
            {editingLead ? "Edit Lead" : "Add New Lead"}
          </h3>

          <FormInput
            id="name"
            label="Name"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <FormInput
            id="email"
            label="Email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <FormInput
            id="phone"
            label="Phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="lost">Lost</option>
          </select>

          <div className="flex gap-4">
            <div className="w-32">
              <Button text={editingLead ? "Update" : "Submit"} type="submit" />
            </div>
            <div className="w-32">
              <Button
                text="Cancel"
                variant="secondary"
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingLead(null);
                }}
              />
            </div>
          </div>
        </form>
      )}


      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-t">
                <td className="px-6 py-4 text-sm text-gray-800">{lead.name}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{lead.email}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{lead.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {lead.status}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEdit(lead)}
                    className="text-[#7F55B1] hover:underline text-sm font-medium"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
