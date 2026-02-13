import { useParams } from "react-router-dom";
import {
  getApplicationsByJobApi,
  updateApplicationStatusApi,
} from "../../features/auth/jobs/adminJobApi";
import { useEffect, useState } from "react";

export default function JobApplications() {
  const { jobId } = useParams();

  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const statusColor = {
    Applied: "text-gray-500",
    Reviewed: "text-blue-600",
    Rejected: "text-red-600",
  };

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const data = await getApplicationsByJobApi(jobId);
        setApps(data);
      } catch (error) {
        alert("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    if (jobId) loadApplications();
  }, [jobId]);

  const handleStatusChange = async (id, status) => {
    if (status === "Rejected") {
      const confirmReject = window.confirm(
        "Are you sure you want to reject this application?"
      );
      if (!confirmReject) return;
    }

    try {
      setUpdatingId(id);
      await updateApplicationStatusApi(id, status);

      setApps((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status } : app
        )
      );
    } catch (error) {
      alert("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <p className="text-gray-500 text-lg">
          Loading applications...
        </p>
      </div>
    );
  }

  if (apps.length === 0) {
    return (
      <div className="flex justify-center py-32">
        <p className="text-gray-500 text-lg">
          No applications yet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Job Applications
        </h1>
        <p className="text-gray-500 mt-2">
          Review and manage candidate submissions
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
                <p className="text-lg font-semibold text-gray-800">
                  {app.applicant.name}
                </p>
                <p className="text-gray-500 text-sm">
                  {app.applicant.email}
                </p>
              </div>

              <p
                className={`font-semibold ${
                  statusColor[app.status]
                }`}
              >
                {app.status}
              </p>
            </div>

            {app.resumeUrl && (
              <a
                href={app.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline block mt-4"
              >
                View Resume
              </a>
            )}

            <div className="mt-4">
              <select
                value={app.status}
                onChange={(e) =>
                  handleStatusChange(app._id, e.target.value)
                }
                disabled={
                  app.status === "Rejected" ||
                  updatingId === app._id
                }
                className="border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="Applied" disabled>
                  Applied
                </option>

                <option value="Reviewed">
                  Reviewed
                </option>

                <option value="Rejected">
                  Rejected
                </option>
              </select>

              {updatingId === app._id && (
                <span className="ml-3 text-sm text-gray-500">
                  Updating...
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
