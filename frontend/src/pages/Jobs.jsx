import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchJob } from "../features/auth/jobs/jobSlice";
import JobCard from "../components/JobCard";

export default function Jobs() {
  const dispatch = useDispatch();
  const { list, page, totalPages, loading } = useSelector(
    (state) => state.jobs
  );

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    dispatch(fetchJob({ page: 1, keyword }));
  }, [dispatch, keyword]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Explore Jobs</h1>
        <p className="text-gray-500 mt-2">
          Find opportunities that match your skills
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search jobs by title or company..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">Loading jobs...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && list.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold text-gray-700">
            No jobs found
          </h2>
          <p className="text-gray-500 mt-2">
            Try adjusting your search keyword.
          </p>
        </div>
      )}

      {/* Job Grid */}
      {!loading && list.length > 0 && (
          console.log("Jobs in state:", list.length),
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="mt-12 flex justify-center gap-3 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() =>
                dispatch(fetchJob({ page: i + 1, keyword }))
              }
              className={`px-4 py-2 rounded-lg border transition
                ${
                  page === i + 1
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
            >
              {i + 1}
            </button>
            
          ))}
        </div>
      )}
    </div>
  );
}

