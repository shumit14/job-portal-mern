import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchJobApiById } from "../../features/auth/jobs/jobApi";
import { updateJobApi } from "../../features/auth/jobs/adminJobApi";

export default function EditJobs() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salaryRange: "",
    description: "",
  });

  useEffect(() => {
    const loadJob = async () => {
      try {
        const data = await fetchJobApiById(id);
        setForm(data);
      } catch (error) {
        alert("Failed to load job");
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);

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
      setUpdating(true);
      await updateJobApi(id, form);
      navigate("/admin/jobs");
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <p className="text-gray-500 text-lg">Loading job data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">

      <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Edit Job
          </h1>
          <p className="text-gray-500 mt-2">
            Update job listing details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company
            </label>
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salary Range
            </label>
            <input
              name="salaryRange"
              value={form.salaryRange}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description
            </label>
            <textarea
              name="description"
              rows="5"
              value={form.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            disabled={updating}
            className={`w-full py-3 rounded-xl text-white font-semibold transition duration-200 shadow-md
              ${
                updating
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {updating ? "Updating..." : "Update Job"}
          </button>

        </form>
      </div>
    </div>
  );
}
