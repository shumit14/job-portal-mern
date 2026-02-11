import { Link } from "react-router-dom";
import { deleteJobApi, getMyJobsApi } from "../../features/auth/jobs/adminJobApi";
import { useEffect, useState } from "react";

export default function Adminjobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminJobs();
  }, []);

  const fetchAdminJobs = async () => {
    const res = await getMyJobsApi();
    setJobs(res);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    await deleteJobApi(id);

    // ✅ UI update AFTER delete
    setJobs((prev) => prev.filter((job) => job._id !== id));
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (jobs.length === 0) return <p className="p-6">No Jobs Posted Yet.</p>;

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Posted Jobs</h1>

        <Link
          to="/admin/create-job"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Create Job
        </Link>
      </div>

      {jobs.map((job) => (
        <div key={job._id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold">{job.title}</h2>
          <p>{job.company}</p>

          <div className="flex gap-4 mt-2">
            <Link
              to={`/admin/jobs/${job._id}`}
              className="text-blue-600 underline"
            >
              View Applications
            </Link>

            <Link
              to={`/admin/edit-job/${job._id}`}
              className="text-green-600 underline"
            >
              Edit
            </Link>

            <button
              onClick={() => handleDelete(job._id)}
              className="text-red-600 underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
