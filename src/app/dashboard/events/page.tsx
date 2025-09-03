"use client";

import { useState, useEffect } from "react";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import { getEvents, addEvent, updateEvent } from "@/api/event-api"; 

type Event = {
  id: number;
  title: string;
  date: string; 
  location: string;
  status: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    status: "scheduled",
  });

  const orgId =
    typeof window !== "undefined" ? localStorage.getItem("org_id") : null;

  const fetchEvents = async () => {
    if (!orgId) return;
    try {
      const res = await getEvents(Number(orgId));
      setEvents(res || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!orgId) return;

    try {
      if (editingEvent) {
   
        const res = await updateEvent(editingEvent.id, {
          title: formData.title,
          date: formData.date, 
          location: formData.location,
          status: formData.status,
        });

        setEvents((prev) =>
          prev.map((ev) => (ev.id === editingEvent.id ? res : ev))
        );
      } else {
    
        const res = await addEvent({
          title: formData.title,
          event_date: formData.date, 
          location: formData.location,
          status: formData.status,
        });

        setEvents((prev) => [...prev, res]);
      }


      setFormData({ title: "", date: "", location: "", status: "scheduled" });
      setEditingEvent(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleEdit = (event: Event) => {
    setFormData({
      title: event.title,
      date: event.date,
      location: event.location,
      status: event.status,
    });
    setEditingEvent(event);
    setShowForm(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#7F55B1]">Events</h2>
        <div className="w-auto">
          <Button
            text={editingEvent ? "Edit Event" : "Add Event"}
            onClick={() => {
              setEditingEvent(null);
              setFormData({
                title: "",
                date: "",
                location: "",
                status: "scheduled",
              });
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
            {editingEvent ? "Edit Event" : "Add New Event"}
          </h3>

          <FormInput
            id="title"
            label="Title"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />

          <FormInput
            id="date"
            type="date"
            label="Date"
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
            required
          />

          <FormInput
            id="location"
            label="Location"
            placeholder="Location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            required
          />

          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="scheduled">Scheduled</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>

          <div className="flex gap-4">
            <div className="w-32">
              <Button text={editingEvent ? "Update" : "Submit"} type="submit" />
            </div>
            <div className="w-32">
              <Button
                text="Cancel"
                variant="secondary"
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingEvent(null);
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
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Location
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
            {events.map((event) => (
              <tr key={event.id} className="border-t">
                <td className="px-6 py-4 text-sm text-gray-800">
                  {event.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">{event.date}</td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {event.location}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {event.status}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEdit(event)}
                    className="text-[#7F55B1] hover:underline text-sm font-medium"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
