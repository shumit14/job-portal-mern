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
    try {
      const res = await getMyJobsApi();
      setJobs(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    await deleteJobApi(id);
    setJobs((prev) => prev.filter((job) => job._id !== id));
  };

  if (loading)
    return (
      <div className="flex justify-center py-32">
        <p className="text-gray-500 text-lg">Loading jobs...</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            My Posted Jobs
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your job listings
          </p>
        </div>

        <Link
          to="/admin/create-job"
          className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition"
        >
          + Create Job
        </Link>
      </div>

      {/* Empty State */}
      {jobs.length === 0 ? (
        <div className="text-center py-24">
          <h2 className="text-xl font-semibold text-gray-700">
            No jobs posted yet
          </h2>
          <p className="text-gray-500 mt-2">
            Start by creating your first job listing.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white border border-gray-100 shadow-md rounded-xl p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {job.title}
                  </h2>
                  <p className="text-gray-500 mt-1">
                    {job.company}
                  </p>
                </div>

                <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
                  {job.location}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mt-6 flex-wrap">
                <Link
                  to={`/admin/jobs/${job._id}`}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  View Applications
                </Link>

                <Link
                  to={`/admin/edit-job/${job._id}`}
                  className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(job._id)}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
