import { useEffect, useState } from "react";
import { getUserApplicationApi } from "../features/auth/jobs/jobApi";
import { Link } from "react-router-dom";

export default function AppliedJobs() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  const statusColor = {
    Applied: "text-gray-500",
    Reviewed: "text-blue-600",
    Rejected: "text-red-600",
  };

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const data = await getUserApplicationApi();
        setApps(data);
      } catch (error) {
        alert("Failed to load applied jobs");
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <p className="text-gray-500 text-lg">Loading applied jobs...</p>
      </div>
    );
  }

  if (apps.length === 0) {
    return (
      <div className="flex justify-center py-32">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700">
            No Applications Yet
          </h2>
          <p className="text-gray-500 mt-2">
            You haven’t applied to any jobs.
          </p>
          <Link
            to="/jobs"
            className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Browse Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Applied Jobs
        </h1>
        <p className="text-gray-500 mt-2">
          Track the status of your applications
        </p>
      </div>

      <div className="space-y-6">
        {apps.map((app) => (
          <div
            key={app._id}
            className="bg-white shadow-md rounded-2xl p-6 border border-gray-100"
          >
            <div className="flex justify-between items-start flex-wrap gap-4">

              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {app.job.title}
                </h2>
                <p className="text-gray-500">
                  {app.job.company}
                </p>
              </div>

              <span
                className={`font-semibold ${
                  statusColor[app.status]
                }`}
              >
                {app.status}
              </span>
            </div>

            <Link
              to={`/jobs/${app.job._id}`}
              className="inline-block mt-4 text-blue-600 hover:underline"
            >
              View Job Details →
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
}
