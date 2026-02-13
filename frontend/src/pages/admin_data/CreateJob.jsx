import { useState } from "react";
import { createJobApi } from "../../features/auth/jobs/adminJobApi.js";
import { useNavigate } from "react-router-dom";

export default function CreateJob() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salaryRange: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.company || !form.location) {
      alert("Title, Company and Location are required");
      return;
    }

    try {
      setLoading(true);
      await createJobApi(form);
      navigate("/admin/jobs");
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">

      <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Create New Job
          </h1>
          <p className="text-gray-500 mt-2">
            Fill in the details to publish a new job listing
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title
            </label>
            <input
              name="title"
              placeholder="Frontend Developer"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company
            </label>
            <input
              name="company"
              placeholder="Google"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              name="location"
              placeholder="Bangalore, India"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salary Range
            </label>
            <input
              name="salaryRange"
              placeholder="8-12 LPA"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description
            </label>
            <textarea
              name="description"
              rows="5"
              placeholder="Enter detailed job description..."
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold transition duration-200 shadow-md
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
          >
            {loading ? "Creating..." : "Create Job"}
          </button>

        </form>
      </div>
    </div>
  );
}
