"use client";

import { useState } from "react";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";

type Opportunity = {
  id: number;
  title: string;
  amount: number;
  stage: string;
  closeDate: string;
};

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([
    {
      id: 1,
      title: "Opportunity 1",
      amount: 50000,
      stage: "Prospecting",
      closeDate: "2025-09-10",
    },
    {
      id: 2,
      title: "Opportunity 2",
      amount: 75000,
      stage: "Negotiation",
      closeDate: "2025-09-15",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState<Opportunity | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    amount: 0,
    stage: "Prospecting",
    closeDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingOpportunity) {

      setOpportunities((prev) =>
        prev.map((opp) =>
          opp.id === editingOpportunity.id
            ? { ...editingOpportunity, ...formData }
            : opp
        )
      );
    } else {

      const newOpportunity: Opportunity = {
        id: opportunities.length + 1,
        ...formData,
      };
      setOpportunities((prev) => [...prev, newOpportunity]);
    }

    setFormData({ title: "", amount: 0, stage: "Prospecting", closeDate: "" });
    setEditingOpportunity(null);
    setShowForm(false);
  };

  const handleEdit = (opp: Opportunity) => {
    setFormData({
      title: opp.title,
      amount: opp.amount,
      stage: opp.stage,
      closeDate: opp.closeDate,
    });
    setEditingOpportunity(opp);
    setShowForm(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#7F55B1]">Opportunities</h1>
        <div className="w-auto">
          <Button
            text={showForm ? "Back" : "Add Opportunity"}
            onClick={() => {
              setShowForm(!showForm);
              if (!showForm) {
                setFormData({ title: "", amount: 0, stage: "Prospecting", closeDate: "" });
                setEditingOpportunity(null);
              }
            }}
          />
        </div>
      </div>

      {showForm ? (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded shadow"
        >
          <FormInput
            id="title"
            label="Title"
            placeholder="Opportunity Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <FormInput
            id="amount"
            type="number"
            label="Amount"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: Number(e.target.value) })
            }
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stage
            </label>
            <select
              value={formData.stage}
              onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option>Prospecting</option>
              <option>Qualification</option>
              <option>Proposal</option>
              <option>Negotiation</option>
              <option>Closed Won</option>
              <option>Closed Lost</option>
            </select>
          </div>

          <FormInput
            id="closeDate"
            type="date"
            label="Close Date"
            value={formData.closeDate}
            onChange={(e) =>
              setFormData({ ...formData, closeDate: e.target.value })
            }
            required
          />

          <div className="flex gap-4">
            <div className="w-32">
              <Button text={editingOpportunity ? "Update" : "Submit"} type="submit" />
            </div>
            <div className="w-32">
              <Button
                text="Cancel"
                variant="secondary"
                onClick={() => {
                  setShowForm(false);
                  setEditingOpportunity(null);
                }}
              />
            </div>
          </div>
        </form>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Stage
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Close Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((opp) => (
                <tr key={opp.id} className="border-t">
                  <td className="px-6 py-4 text-sm text-gray-800">{opp.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">${opp.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{opp.stage}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{opp.closeDate}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEdit(opp)}
                      className="text-[#7F55B1] hover:underline text-sm font-medium"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              {opportunities.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    No opportunities found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
