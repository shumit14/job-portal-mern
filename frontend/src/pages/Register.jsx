import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance.post("/auth/register", form);
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          className="w-full border p-2"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email"
          type="email"
          className="w-full border p-2"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          placeholder="Password"
          type="password"
          className="w-full border p-2"
          onChange={handleChange}
          required
        />

        <select
          name="role"
          className="w-full border p-2"
          onChange={handleChange}
        >
          <option value="USER">Job Seeker</option>
          <option value="ADMIN">Recruiter / Admin</option>
        </select>

        <button className="w-full bg-green-600 text-white py-2 rounded">
          Register
        </button>
        <Link  to="/login" className="text-blue-600">Sign in</Link>
      </form>
    </div>
  );
}
