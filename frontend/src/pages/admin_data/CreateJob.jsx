import { useState } from "react";
import { createJobApi } from "../../features/auth/jobs/adminJobApi.js";
import { useNavigate } from "react-router-dom";

export default function CreateJob() {
  const navigate = useNavigate();
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
    await createJobApi(form);
    navigate("/admin/jobs");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Job</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="title" placeholder="Job Title" onChange={handleChange} className="border p-2 w-full" />
        <input name="company" placeholder="Company" onChange={handleChange} className="border p-2 w-full" />
        <input name="location" placeholder="Location" onChange={handleChange} className="border p-2 w-full" />
        <input name="salaryRange" placeholder="Salary Range" onChange={handleChange} className="border p-2 w-full" />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="border p-2 w-full" />
        

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Create Job
        </button>
      </form>
    </div>
  );
}
