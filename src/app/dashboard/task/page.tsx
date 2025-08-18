"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import { createTask, getTasksByOrgId, updateTask } from "@/api/task-api";
import { getUsersByOrganization } from "@/api/user-api";

type User = {
  id: number;
  full_name: string;
  email: string;
};

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  user_id: number;
  organisation_id?: number;
};

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const currentUserId = useRef<number | undefined>(undefined);
  const currentOrgId = useRef<number | undefined>(undefined);

  const fetchTasks = async (orgId: number) => {
    try {
      const taskList = await getTasksByOrgId(orgId);
      setTasks(taskList);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    if (!currentUserId.current || !currentOrgId.current) {
      currentUserId.current = Number(localStorage.getItem("user_id"));
      currentOrgId.current = Number(localStorage.getItem("org_id"));
    }

    fetchTasks(currentOrgId.current);

    getUsersByOrganization(currentOrgId.current)
      .then((list) => {
        setUsers(list);

        const defaultId =
          (list.some((u: User) => u.id === currentUserId.current) &&
            currentUserId.current) ||
          (list.length ? list[0].id : null);

        setSelectedUserId(defaultId);
      })
      .catch((e) => console.error("Failed to fetch org users:", e));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentOrgId.current) {
      console.error("Missing org_id in localStorage");
      return;
    }
    if (!selectedUserId) {
      alert("Please select an assignee");
      return;
    }

    try {
      if (editingTask) {
        await updateTask(editingTask.id, {
          ...formData,
          user_id: selectedUserId,
          organisation_id: currentOrgId.current,
        });
      } else {
        await createTask({
          ...formData,
          user_id: selectedUserId,
          organisation_id: currentOrgId.current,
        });
      }

      setFormData({ title: "", description: "", status: "pending" });
      setEditingTask(null);
      setShowForm(false);

      fetchTasks(selectedUserId);
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  };

  const handleEdit = (task: Task) => {
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
    });
    setSelectedUserId(task.user_id);
    setEditingTask(task);
    setShowForm(true);
  };

  const userLabel = (id: number) => {
    const u = users.find((x) => x.id === id);
    if (!u) return `User #${id}`;
    return `${u.full_name ?? ""}${u.full_name ? " — " : ""}${u.email}`;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#7F55B1]">Tasks</h2>
        <div className="w-auto">
          <Button
            text={editingTask ? "Edit Task" : "Add Task"}
            onClick={() => {
              setEditingTask(null);
              setFormData({ title: "", description: "", status: "pending" });
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
            {editingTask ? "Edit Task" : "Add New Task"}
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
            id="description"
            label="Description"
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />

          <select
            value={selectedUserId ?? ""}
            onChange={(e) => setSelectedUserId(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="" disabled>
              Select assignee
            </option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.full_name} — {u.email}
              </option>
            ))}
          </select>

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
              <Button text={editingTask ? "Update" : "Submit"} type="submit" />
            </div>
            <div className="w-32">
              <Button
                text="Cancel"
                variant="secondary"
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingTask(null);
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
                Description
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Assignee
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
                <td className="px-6 py-4 text-sm text-gray-800">
                  {userLabel(task.user_id)}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEdit(task)}
                    className="text-[#7F55B1] hover:underline text-sm font-medium"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
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
