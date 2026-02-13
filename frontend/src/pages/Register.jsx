import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Create Account
          </h1>
         
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              name="name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Type
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="USER">Job Seeker</option>
              <option value="ADMIN">Recruiter / Admin</option>
            </select>
          </div>

          {/* Error */}
          {error && (
            <div className="text-sm text-red-500 font-medium">
              {error}
            </div>
          )}

          {/* Button */}
          <button
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold transition duration-200
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 shadow-md"
              }`}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}
