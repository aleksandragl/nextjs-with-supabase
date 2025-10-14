"use client";

import { useState, useEffect } from "react";
import * as tasks from "@/utils/task";

type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
};

export default function TasksClient() {
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingDescription, setEditingDescription] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await tasks.fetchTasks();
        setTasksList(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleAdd = async () => {
    if (!newTitle) return;
    setLoading(true);
    try {
      await tasks.addTask(newTitle, newDescription);
      setNewTitle("");
      setNewDescription("");
      const updatedTasks = await tasks.fetchTasks();
      setTasksList(updatedTasks);
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await tasks.deleteTask(id);
      setTasksList(tasksList.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingId(task.id);
    setEditingTitle(task.title);
    setEditingDescription(task.description || "");
  };

  const handleUpdate = async (id: number) => {
    if (!editingTitle) return;
    setLoading(true);
    try {
      await tasks.updateTask(id, editingTitle, editingDescription);
      const updatedTasks = await tasks.fetchTasks();
      setTasksList(updatedTasks);
      setEditingId(null);
      setEditingTitle("");
      setEditingDescription("");
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingTitle("");
    setEditingDescription("");
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Client-side Tasks</h2>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Title..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <input
          type="text"
          placeholder="Description..."
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={handleAdd}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {tasksList.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            {editingId === task.id ? (
              <div className="flex flex-1 gap-2">
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  className="border p-1 rounded flex-1"
                />
                <input
                  type="text"
                  value={editingDescription}
                  onChange={(e) => setEditingDescription(e.target.value)}
                  className="border p-1 rounded flex-1"
                />
                <button
                  onClick={() => handleUpdate(task.id)}
                  disabled={loading}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <div>
                  <strong>{task.title}</strong>
                  <p>{task.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
