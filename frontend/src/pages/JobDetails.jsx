import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchJobById } from "../features/auth/jobs/jobSlice";
import { useEffect } from "react";
import { applyJobApi, checkAppliedApi } from "../features/auth/jobs/jobApi";
import { useState } from "react";



export default function JobDetails() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { jobDetails, loading } = useSelector((state) => state.jobs)
  const [applied, setApplied] = useState(false)
  const { user } = useSelector((state) => state.auth);
  const [resume, setResume] = useState(null)


  useEffect(() => {
    const loadJob = async () => {
      dispatch(fetchJobById(id));

      try {
        const data = await checkAppliedApi(id);
        setApplied(data.applied);
      } catch (error) {
        setApplied(false);
      }
    };

    loadJob();
  }, [dispatch, id]);


  if (loading || !jobDetails) return <p className="p-6">loading...</p>
const handelApplyJob = async () => {
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
    <div>
      <h1 className="text-2xl font-bold">{jobDetails.title}</h1>
      <p className="text-gray-600">{jobDetails.company}</p>
      <p>{jobDetails.location}</p>

      <p className="mt-4">{jobDetails.description}</p>

      <h3 className="mt-4 font-semibold">Requirements</h3>
      <ul className="list-disc pl-6">{jobDetails.requirements.map((req, i) => (<li key={i}>{req}</li>))}</ul>

      <input type="file" accept=".pdf" onChange={(e) => setResume(e.target.files[0])} className="mt-4" />

      {user?.role !== "ADMIN" && (
        <button
          disabled={applied}
          onClick={handelApplyJob}
          className={`mt-6 rounded px-4 py-2 text-white 
      ${applied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
            }`}
        >
          {applied ? "Already Applied" : "Apply Job"}
        </button>
      )}

    </div>
  )
}