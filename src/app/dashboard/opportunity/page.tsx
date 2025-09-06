"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import {Opportunity,getOpportunities,createOpportunity,updateOpportunity} from "@/api/opportunity-api";

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState<Opportunity | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    amount: 0,
    stage: "Prospecting",
    close_date: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getOpportunities();
        setOpportunities(data);
      } catch (err) {
        setError("Failed to load opportunities");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        title: formData.title,
        amount: formData.amount.toString(), 
        stage: formData.stage,
        close_date: formData.close_date,
      };

      if (editingOpportunity) {
        const updated = await updateOpportunity(editingOpportunity.id, payload);
        setOpportunities((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      } else {
        const newOpp = await createOpportunity(payload);
        setOpportunities((prev) => [...prev, newOpp]);
      }

      setFormData({ title: "", amount: 0, stage: "Prospecting", close_date: "" });
      setEditingOpportunity(null);
      setShowForm(false);
    } catch (err) {
      setError(editingOpportunity ? "Failed to update opportunity" : "Failed to create opportunity");
      console.error(err);
    }
  };

  const handleEdit = (opp: Opportunity) => {
    setFormData({
      title: opp.title,
      amount: Number(opp.amount),
      stage: opp.stage,
      close_date: opp.close_date,
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
                setFormData({ title: "", amount: 0, stage: "Prospecting", close_date: "" });
                setEditingOpportunity(null);
              }
            }}
          />
        </div>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {showForm ? (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
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
            id="close_date"
            type="date"
            label="Close Date"
            value={formData.close_date}
            onChange={(e) => setFormData({ ...formData, close_date: e.target.value })}
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
      ) : loading ? (
        <p>Loading opportunities...</p>
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
                  <td className="px-6 py-4 text-sm text-gray-800">{opp.close_date}</td>
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
