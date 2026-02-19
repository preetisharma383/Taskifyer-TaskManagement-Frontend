"use client";
import { useState } from "react";
import axios from "axios";
import { FaUserShield } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e:any) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://task-manager-backend-dkdv.onrender.com/api/v1/login", {
        withCredentials: true,
        email:email,
        password:password,
      });

      if (res.data.role === "admin") {
        localStorage.setItem("adminToken", res.data.token);
        router.push("/admin-dashboard");
      } else {
        alert("Not an admin");
      }
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-700">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-[90%] max-w-md">
        <div className="flex flex-col items-center mb-6">
          <FaUserShield size={40} className="text-indigo-600" />
          <h1 className="text-2xl font-bold mt-3">Admin Login</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
