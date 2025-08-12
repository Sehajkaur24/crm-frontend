"use client";
import { useEffect, useState } from "react";
import Button from "@/components/Button";

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
};

const handleEditTask = (id: number) => {
  alert(`Edit task with ID: ${id}`);
};

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  // Dummy fetch - replace with real API
  const fetchTasks = async () => {
    // Replace this with your actual API call
    const dummyTasks = [
      { id: 1, title: "Task One", description: "First task", status: "pending" },
      { id: 2, title: "Task Two", description: "Second task", status: "completed" },
    ];
    setTasks(dummyTasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      ...formData,
    };
    setTasks((prev) => [...prev, newTask]);
    setFormData({ title: "", description: "", status: "pending" });
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#7F55B1]">Tasks</h2>
        <div className="w-auto">
          <Button text="Add Task" onClick={() => setShowForm(true)} />
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow mb-6 space-y-4"
        >
          <h3 className="text-lg font-bold text-[#7F55B1]">Add New Task</h3>

          <input
            type="text"
            placeholder="Title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
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
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <div className="flex gap-4">
            <div className="w-32">
              <Button text="Submit" type="submit" />
            </div>
            <div className="w-32">
              <Button
                text="Cancel"
                variant="secondary"
                type="button"
                onClick={() => setShowForm(false)}
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
                Description
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
            {tasks.map((task) => (
              <tr key={task.id} className="border-t">
                <td className="px-6 py-4 text-sm text-gray-800">
                  {task.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {task.description}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {task.status}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEditTask(task.id)}
                    className="text-[#7F55B1] hover:underline text-sm font-medium"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-6 text-gray-500"
                >
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
