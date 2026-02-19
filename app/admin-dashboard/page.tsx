"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaUsers,
  FaTrash,
  FaPlus,
  FaTasks,
  FaTimes,
} from "react-icons/fa";

interface Task {
  _id: string;
  title: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  tasks?: Task[];
}

export default function AdminDashboard() {
  const API = "https://task-manager-backend-dkdv.onrender.com/api/admin";

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [selectedUser, setSelectedUser] = useState("");
  const [taskTitle, setTaskTitle] = useState("");

  // ---------------- FETCH USERS ----------------
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/users`, {
        withCredentials: true,
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- DELETE ALL ----------------
  const deleteAllUsers = async () => {
    await axios.delete(`${API}/users`, {
      withCredentials: true,
    });
    fetchUsers();
  };

  // ---------------- CREATE USER ----------------
  const createUser = async () => {
    if (!newName || !newEmail) return;

    await axios.post(
      `${API}/register`,
      { name: newName, email: newEmail },
      { withCredentials: true }
    );

    setNewName("");
    setNewEmail("");
    setShowModal(false);
    fetchUsers();
  };

  // ---------------- ASSIGN TASK ----------------
  const assignTask = async () => {
    if (!selectedUser || !taskTitle) return;

    await axios.post(
      `${API}/assign-task`,
      {
        userId: selectedUser,
        title: taskTitle,
      },
      { withCredentials: true }
    );

    setTaskTitle("");
    setSelectedUser("");
    fetchUsers();
  };
  // signout admin
  const router = useRouter();

  const logoutAdmin = async () => {
    await axios.get(
      "https://task-manager-backend-dkdv.onrender.com/api/v1/logout",
     
      { withCredentials: true }
    );

    router.push("/"); // change if your route is different
  };
  useEffect(() => {
    fetchUsers();
  }, []);

 return (
  <div className="min-h-screen bg-gray-100 p-6">

    {/* Header */}
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="flex gap-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700"
        >
          <FaPlus />
          Add New User
        </button>

        <button
          onClick={deleteAllUsers}
          className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700"
        >
          <FaTrash />
          Delete All
        </button>

        <button
          onClick={logoutAdmin}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-black"
        >
          Sign Out
        </button>
      </div>
    </div>

    {/* Stats */}
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8 flex items-center justify-between">
      <div>
        <p className="text-gray-500">Total Users</p>
        <h2 className="text-2xl font-bold">{users.length}</h2>
      </div>
      <FaUsers className="text-indigo-600 text-3xl" />
    </div>

    {/* Assign Task */}
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
      <h2 className="font-bold mb-4 flex items-center gap-2">
        <FaTasks /> Assign Task
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        <select
          className="border p-2 rounded"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Task title"
          className="border p-2 rounded"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />

        <button
          onClick={assignTask}
          className="bg-green-600 text-white rounded hover:bg-green-700"
        >
          Assign
        </button>
      </div>
    </div>

    {/* Task Card View */}
    <h2 className="text-xl font-bold mb-4">Created Tasks</h2>

    {loading ? (
      <p>Loading...</p>
    ) : (
      <div className="grid md:grid-cols-3 gap-6">
        {users.map((user) =>
          user.tasks?.map((task) => (
            <div
              key={task._id}
              className="bg-white shadow-lg rounded-xl p-6"
            >
              <h3 className="font-bold text-lg">{task.title}</h3>
              <p className="text-sm text-gray-500 mt-2">
                Assigned to: {user.name}
              </p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          ))
        )}
      </div>
    )}

    {/* MODAL */}
    {showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
        <div className="bg-white rounded-xl p-8 w-full max-w-md relative">

          <button
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
          >
            <FaTimes />
          </button>

          <h2 className="text-xl font-bold mb-6">Add New User</h2>

          <input
            type="text"
            placeholder="Name"
            className="w-full border p-2 mb-4 rounded"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 mb-6 rounded"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />

          <button
            onClick={createUser}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Add User
          </button>

        </div>
      </div>
    )}
  </div>
);
}