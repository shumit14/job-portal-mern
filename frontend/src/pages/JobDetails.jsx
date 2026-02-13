import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchJobById } from "../features/auth/jobs/jobSlice";
import { useEffect, useState } from "react";
import { applyJobApi, checkAppliedApi } from "../features/auth/jobs/jobApi";

export default function JobDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { jobDetails, loading } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);

  const [applied, setApplied] = useState(false);
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const loadJob = async () => {
      dispatch(fetchJobById(id));

      try {
        const data = await checkAppliedApi(id);
        setApplied(data.applied);
      } catch {
        setApplied(false);
      }
    };

    loadJob();
  }, [dispatch, id]);

  if (loading || !jobDetails) {
    return (
      <div className="flex justify-center items-center py-32">
        <p className="text-gray-500 text-lg">Loading job details...</p>
      </div>
    );
  }

  const handleApplyJob = async () => {
    try {
      if (!resume) {
        alert("Upload resume first");
        return;
      }

      const formData = new FormData();
      formData.append("resume", resume);

      await applyJobApi(id, formData);
      setApplied(true);
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-gray-100">

      {/* Title Section */}
      <div className="border-b pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {jobDetails.title}
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          {jobDetails.company}
        </p>
        <span className="inline-block mt-3 bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full">
          {jobDetails.location}
        </span>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">
          Job Description
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {jobDetails.description}
        </p>
      </div>

      {/* Requirements */}
      {jobDetails.requirements?.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            Requirements
          </h3>
          <ul className="space-y-2">
            {jobDetails.requirements.map((req, i) => (
              <li
                key={i}
                className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg text-gray-700"
              >
                {req}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Apply Section */}
      {user?.role === "USER" && (
        <div className="border-t pt-6">

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Resume (PDF only)
          </label>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setResume(e.target.files[0])}
            className="mb-4 block w-full text-sm border border-gray-300 rounded-lg p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            disabled={applied}
            onClick={handleApplyJob}
            className={`w-full py-3 rounded-xl text-white font-semibold transition duration-200 shadow-md
              ${
                applied
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
          >
            {applied ? "Applied Successfully" : "Apply for this Job"}
          </button>
        </div>
      )}
    </div>
  );
}
