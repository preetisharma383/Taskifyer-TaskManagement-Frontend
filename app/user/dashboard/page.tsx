"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Task {
  _id: string;
  title: string;
}

export default function UserDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  const fetchTasks = async () => {
    const res = await axios.get(
      "http://localhost:8000/api/users/my-tasks",
      { withCredentials: true }
    );
    setTasks(res.data);
  };

  const logoutUser = async () => {
    await axios.post(
      "http://localhost:8000/api/auth/logout",
      {},
      { withCredentials: true }
    );

    router.push("/login"); // change if needed
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Tasks</h1>

        <button
          onClick={logoutUser}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black"
        >
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white shadow-lg rounded-xl p-6"
          >
            <h2 className="font-bold text-lg">{task.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
